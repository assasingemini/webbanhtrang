import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';


const API_VERSION = 'v3.0'; // Tăng version mỗi lần deploy để kiểm tra

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseTags(rawTags: unknown): string[] {
  if (rawTags === null || rawTags === undefined) return [];

  if (Array.isArray(rawTags)) {
    return rawTags
      .map((t: unknown) => {
        if (typeof t === 'object' && t !== null) {
          const obj = t as Record<string, unknown>;
          return String(obj.value || obj.name || obj.label || Object.values(obj)[0] || '').trim();
        }
        return String(t).trim();
      })
      .filter(Boolean);
  }

  if (typeof rawTags === 'object') {
    return Object.values(rawTags as Record<string, unknown>)
      .map((t) => String(t).trim())
      .filter(Boolean);
  }

  if (typeof rawTags === 'string') {
    const trimmed = rawTags.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith('[')) {
      try {
        const parsed: unknown = JSON.parse(trimmed);
        return parseTags(parsed);
      } catch {
        return trimmed.replace(/[\[\]"']/g, '').split(',').map((t) => t.trim()).filter(Boolean);
      }
    }
    return trimmed.split(',').map((t) => t.trim()).filter(Boolean);
  }

  return [];
}

export async function POST(request: Request) {
  let rawText = '';
  let body: Record<string, unknown> = {};

  try {
    rawText = await request.text();
    const parsed = JSON.parse(rawText) as Record<string, unknown>;
    // Fix: n8n "Using Fields Below" gửi tên trường có trailing space ("tags ", "seoKeyword ")
    // Normalize tất cả keys bằng cách trim whitespace
    for (const [key, value] of Object.entries(parsed)) {
      body[key.trim()] = value;
    }
  } catch {
    return NextResponse.json(
      { error: 'Body không phải JSON hợp lệ.', version: API_VERSION },
      { status: 400 }
    );
  }

  try {
    const title = body.title as string | undefined;
    const content = body.content as string | undefined;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Thiếu title hoặc content.', version: API_VERSION },
        { status: 400 }
      );
    }

    const excerpt = String(body.excerpt || '');
    const coverImage = String(body.coverImage || body.coverimage || '');
    const providedSlug = body.slug as string | undefined;
    const seoTitle = (body.seoTitle || body.seotitle) as string | undefined;
    const seoDescription = (body.seoDescription || body.seodescription) as string | undefined;
    const seoKeyword = (body.seoKeyword || body.seokeyword) as string | undefined;
    const slug = providedSlug || generateSlug(title);
    const tags = parseTags(body.tags);

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeyword: seoKeyword || null,
      },
    });

    // Làm mới cache của trang tin-tức và trang chủ
    revalidatePath('/tin-tuc');
    revalidatePath('/');

    return NextResponse.json({
      message: 'Tạo bài viết thành công.',
      version: API_VERSION,
      post: newPost,
      _debug: {
        tagsRawType: typeof body.tags,
        tagsIsArray: Array.isArray(body.tags),
        tagsRaw: body.tags,
        processedTags: tags,
        seoKeywordRaw: body.seoKeyword,
        seoKeywordLower: body.seokeyword,
        bodyKeys: Object.keys(body),
      },
    }, { status: 201 });

  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err.code === 'P2002') {
      return NextResponse.json(
        { error: 'Slug đã tồn tại.', version: API_VERSION },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Lỗi Server.', details: err.message, version: API_VERSION },
      { status: 500 }
    );
  }
}