import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { requireAdmin } from '../middleware/auth';

const router = Router();

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

// GET /api/posts – public
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit } = req.query;
    const posts = await prisma.post.findMany({
      take: limit ? parseInt(limit as string) : undefined,
      orderBy: { publishedAt: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách bài viết.' });
  }
});

// GET /api/posts/:slug – public
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    // Skip reserved route names
    if (req.params.slug === 'n8n') { return; }

    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
    });
    if (!post) {
      res.status(404).json({ error: 'Không tìm thấy bài viết.' });
      return;
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Lỗi khi lấy bài viết.' });
  }
});

// POST /api/posts – admin
router.post('/', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, excerpt, content, coverImage, tags, slug, seoTitle, seoDescription, seoKeyword } = req.body;
    const finalSlug = slug || generateSlug(title);
    const finalTags = typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : Array.isArray(tags) ? tags : [];

    const post = await prisma.post.create({
      data: {
        title, slug: finalSlug, excerpt, content, coverImage,
        tags: finalTags,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeyword: seoKeyword || null,
      },
    });
    res.status(201).json(post);
  } catch (error: any) {
    console.error('Error creating post:', error);
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Slug đã tồn tại.' });
      return;
    }
    res.status(500).json({ error: 'Không thể tạo bài viết.' });
  }
});

// POST /api/posts/n8n – n8n automation (no auth required)
router.post('/n8n', async (req: Request, res: Response): Promise<void> => {
  try {
    // Normalize keys (n8n may send keys with trailing spaces)
    const body: Record<string, any> = {};
    for (const [key, value] of Object.entries(req.body)) {
      body[key.trim()] = value;
    }

    const title = body.title as string | undefined;
    const content = body.content as string | undefined;

    if (!title || !content) {
      res.status(400).json({ error: 'Thiếu title hoặc content.' });
      return;
    }

    const excerpt = String(body.excerpt || '');
    const coverImage = String(body.coverImage || body.coverimage || '');
    const slug = (body.slug as string) || generateSlug(title);
    const seoTitle = (body.seoTitle || body.seotitle) as string | undefined;
    const seoDescription = (body.seoDescription || body.seodescription) as string | undefined;
    const seoKeyword = (body.seoKeyword || body.seokeyword) as string | undefined;

    // Parse tags
    let tags: string[] = [];
    const rawTags = body.tags;
    if (Array.isArray(rawTags)) {
      tags = rawTags.map((t: any) => String(t).trim()).filter(Boolean);
    } else if (typeof rawTags === 'string') {
      tags = rawTags.split(',').map((t: string) => t.trim()).filter(Boolean);
    }

    const newPost = await prisma.post.create({
      data: {
        title, slug, excerpt, content, coverImage, tags,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeyword: seoKeyword || null,
      },
    });

    res.status(201).json({ message: 'Tạo bài viết thành công.', post: newPost });
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Slug đã tồn tại.' });
      return;
    }
    console.error('n8n post error:', error);
    res.status(500).json({ error: 'Lỗi Server.', details: error.message });
  }
});

// PUT /api/posts/:id – admin
router.put('/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { title, excerpt, content, coverImage, tags, slug, seoTitle, seoDescription, seoKeyword } = req.body;
    const finalTags = typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : Array.isArray(tags) ? tags : [];

    const post = await prisma.post.update({
      where: { id },
      data: {
        title, slug, excerpt, content, coverImage,
        tags: finalTags,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeyword: seoKeyword || null,
      },
    });
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Không thể cập nhật bài viết.' });
  }
});

// DELETE /api/posts/:id – admin
router.delete('/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await prisma.post.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Không thể xoá bài viết.' });
  }
});

export default router;
