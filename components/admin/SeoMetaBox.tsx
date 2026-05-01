'use client';

import { useState, useMemo } from 'react';

interface SeoMetaBoxProps {
  seoTitle: string;
  setSeoTitle: (v: string) => void;
  seoDescription: string;
  setSeoDescription: (v: string) => void;
  seoKeyword: string;
  setSeoKeyword: (v: string) => void;
  slug: string;
  setSlug: (v: string) => void;

  defaultTitle: string;
  defaultExcerpt: string;
  content: string; // To analyze keyword density
  siteName?: string;
  baseUrl?: string;
}

export default function SeoMetaBox({
  seoTitle,
  setSeoTitle,
  seoDescription,
  setSeoDescription,
  seoKeyword,
  setSeoKeyword,
  slug,
  setSlug,
  defaultTitle,
  defaultExcerpt,
  content,
  siteName = 'Bánh Tráng Trộn Ngon Cần Thơ',
  baseUrl = 'https://banhtrangtron.vercel.app'
}: SeoMetaBoxProps) {

  // Process variables for preview
  const parseVariables = (text: string) => {
    return text
      .replace(/%title%/g, defaultTitle || 'Tiêu đề bài viết')
      .replace(/%sitename%/g, siteName)
      .replace(/%sep%/g, '-');
  };

  const finalTitle = seoTitle ? parseVariables(seoTitle) : parseVariables('%title% %sep% %sitename%');
  const finalDescription = seoDescription || defaultExcerpt || 'Vui lòng cung cấp một meta description bằng cách chỉnh sửa đoạn trích dẫn (excerpt) bên trên hoặc điền vào ô Meta Description bên dưới để cải thiện SEO.';

  // SEO Analysis Logic
  const analysis = useMemo(() => {
    if (!seoKeyword) return null;

    const kw = seoKeyword.toLowerCase().trim();
    const titleLower = defaultTitle.toLowerCase();
    const seoTitleLower = finalTitle.toLowerCase();
    const descLower = finalDescription.toLowerCase();
    const slugLower = slug.toLowerCase();

    // Strip HTML for content analysis
    const cleanContent = content.replace(/<[^>]*>?/gm, '').toLowerCase();
    const words = cleanContent.split(/\s+/).filter(w => w.length > 0);
    const kwCount = (cleanContent.match(new RegExp(kw, 'gi')) || []).length;
    const density = words.length > 0 ? (kwCount / words.length) * 100 : 0;

    const checks = [
      {
        id: 'title_kw',
        label: 'Từ khóa trong Tiêu đề chính',
        pass: titleLower.includes(kw),
        score: 20
      },
      {
        id: 'seo_title_kw',
        label: 'Từ khóa trong SEO Title',
        pass: seoTitleLower.includes(kw),
        score: 15
      },
      {
        id: 'desc_kw',
        label: 'Từ khóa trong Meta Description',
        pass: descLower.includes(kw),
        score: 15
      },
      {
        id: 'slug_kw',
        label: 'Từ khóa trong URL (Slug)',
        pass: slugLower.includes(kw.replace(/\s+/g, '-')),
        score: 10
      },
      {
        id: 'content_start',
        label: 'Từ khóa xuất hiện ở đầu nội dung',
        pass: cleanContent.slice(0, 500).includes(kw),
        score: 15
      },
      {
        id: 'density',
        label: `Mật độ từ khóa (${density.toFixed(2)}%)`,
        pass: density >= 0.5 && density <= 2.5,
        score: 15
      },
      {
        id: 'length',
        label: 'Độ dài nội dung (> 300 chữ)',
        pass: words.length >= 300,
        score: 10
      }
    ];

    const currentScore = checks.reduce((acc, curr) => acc + (curr.pass ? curr.score : 0), 0);

    return {
      score: currentScore,
      checks
    };
  }, [seoKeyword, defaultTitle, finalTitle, finalDescription, slug, content]);

  // UI Helpers
  const getProgressColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio === 0) return 'bg-gray-200';
    if (ratio < 0.5) return 'bg-orange-400';
    if (ratio <= 1.0) return 'bg-green-500';
    return 'bg-red-500';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 border-green-200 bg-green-50';
    if (score >= 50) return 'text-orange-600 border-orange-200 bg-orange-50';
    return 'text-red-600 border-red-200 bg-red-50';
  };

  return (
    <div className="bg-white border text-gray-800 border-gray-200 rounded-lg shadow-sm mt-8 overflow-hidden">
      <div className="border-b border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h2 className="font-semibold text-gray-700">SEO Cấu Hình & Phân Tích</h2>
        </div>

        {analysis && (
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border font-bold text-sm ${getScoreColor(analysis.score)}`}>
            <span>SEO Score:</span>
            <span>{analysis.score} / 100</span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-8">
        {/* Focus Keyword */}
        <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-blue-900 uppercase tracking-tight">Focus Keyword (Từ khóa chính)</label>
            <span className="text-xs text-blue-600 font-medium">Giúp chấm điểm SEO bài viết</span>
          </div>
          <input
            type="text"
            value={seoKeyword}
            onChange={(e) => setSeoKeyword(e.target.value)}
            placeholder="Ví dụ: bánh tráng trộn ngon..."
            className="w-full px-4 py-2 border-2 border-blue-200 rounded-md focus:outline-none focus:border-blue-500 text-sm shadow-inner"
          />
          <p className="mt-2 text-xs text-gray-500">Đặt từ khóa mà bạn muốn lên Top để xem gợi ý tối ưu bên dưới.</p>
        </div>

        {/* Google Preview */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Xem trước kết quả tìm kiếm (Google Preview)</h3>
          <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm max-w-2xl font-sans">
            <div className="flex items-center text-sm text-[#202124] mb-1 overflow-hidden">
              <span className="truncate">{baseUrl}</span>
              <span className="text-gray-500 mx-1">›</span>
              <span className="truncate">tin-tuc</span>
              <span className="text-gray-500 mx-1">›</span>
              <span className="truncate">{slug || 'duong-dan-bai-viet'}</span>
            </div>
            <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 w-full truncate leading-tight">
              {finalTitle}
            </div>
            <div className="text-sm text-[#4d5156] line-clamp-2 leading-snug">
              {finalDescription}
            </div>
          </div>
        </div>

        {/* SEO Checklist Analysis */}
        {analysis && seoKeyword && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <polyline points="22 11.08 22 12 11 23 1 13 4 10 11 17 21 7"></polyline>
              </svg>
              Phân tích nội dung (SEO Checklist)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.checks.map((check) => (
                <div key={check.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md border border-gray-100">
                  {check.pass ? (
                    <div className="mt-0.5 bg-green-100 p-0.5 rounded-full text-green-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  ) : (
                    <div className="mt-0.5 bg-red-100 p-0.5 rounded-full text-red-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                  )}
                  <span className={`text-xs ${check.pass ? 'text-gray-700' : 'text-gray-500 italic'}`}>{check.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Inputs */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          {/* SEO Title */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-gray-700">SEO Title</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">{finalTitle.length} / 60</span>
                <div className="flex h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${getProgressColor(finalTitle.length, 60)} transition-all`} style={{ width: `${Math.min((finalTitle.length / 60) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="%title% %sep% %sitename%"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Permalink / Slug */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-gray-700">Permalink (Đường dẫn riêng)</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">{slug.length} / 75</span>
                <div className="flex h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${getProgressColor(slug.length, 75)} transition-all`} style={{ width: `${Math.min((slug.length / 75) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-gray-700">Meta Description</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">{finalDescription.length} / 160</span>
                <div className="flex h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${getProgressColor(finalDescription.length, 160)} transition-all`} style={{ width: `${Math.min((finalDescription.length / 160) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              rows={3}
              placeholder="Nhập mô tả cho bài viết. Thông thường rơi vào khoảng 120-160 ký tự."
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm resize-y shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
