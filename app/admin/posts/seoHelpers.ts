export type SeoStatus = 'good' | 'warning' | 'error';

export interface SeoCheck {
  id: string;
  category: 'basic' | 'additional' | 'title' | 'content';
  text: string;
  status: SeoStatus;
}

export interface SeoData {
  title: string;
  content: string; 
  slug: string;
  seoTitle: string;
  seoDescription: string;
  seoKeyword: string;
}

function stripHtml(html: string): string {
  if (!html) return '';
  // Basic HTML tag removal
  let text = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                 .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                 .replace(/<[^>]+>/g, ' ');
  // Decode HTML entities roughly
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>');
  // Remove multiple spaces
  return text.replace(/\s+/g, ' ').trim();
}

export function countWords(text: string): number {
  if (!text) return 0;
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

export function analyzeSeo(data: SeoData): SeoCheck[] {
  const checks: SeoCheck[] = [];
  const keyword = data.seoKeyword ? data.seoKeyword.toLowerCase().trim() : '';
  const plainText = stripHtml(data.content);
  const words = plainText.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const contentLower = plainText.toLowerCase();

  // Helper to safely format keyword
  const slugify = (str: string) => {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  };

  const keywordSlug = keyword ? slugify(keyword) : '';

  // 1. BASIC SEO
  if (!keyword) {
    checks.push({
      id: 'no-keyword',
      category: 'basic',
      text: 'Vui lòng nhập Từ khóa chính (Focus Keyword) để bắt đầu phân tích SEO.',
      status: 'error'
    });
    // Return early if no keyword, as other checks depend on it heavily
    return checks;
  }

  // Focus Keyword in SEO Title
  const actualTitle = (data.seoTitle || data.title).toLowerCase();
  if (actualTitle.includes(keyword)) {
    checks.push({ id: 'keyword-in-title', category: 'basic', text: 'Tuyệt vời: Từ khóa chính xuất hiện trong Tiêu đề SEO.', status: 'good' });
  } else {
    checks.push({ id: 'keyword-in-title', category: 'basic', text: 'Từ khóa chính chưa xuất hiện trong Tiêu đề SEO.', status: 'error' });
  }

  // Focus Keyword inside SEO Meta Description
  if (data.seoDescription && data.seoDescription.toLowerCase().includes(keyword)) {
    checks.push({ id: 'keyword-in-meta', category: 'basic', text: 'Từ khóa chính xuất hiện trong Mô tả Meta.', status: 'good' });
  } else if (!data.seoDescription) {
    checks.push({ id: 'keyword-in-meta', category: 'basic', text: 'Bạn chưa nhập Mô tả Meta.', status: 'error' });
  } else {
    checks.push({ id: 'keyword-in-meta', category: 'basic', text: 'Mô tả Meta không chứa từ khóa chính.', status: 'warning' });
  }

  // Focus Keyword used in URL
  if (data.slug && data.slug.includes(keywordSlug) && keywordSlug !== '') {
    checks.push({ id: 'keyword-in-url', category: 'basic', text: 'Từ khóa chính có mặt trong URL / Đường dẫn.', status: 'good' });
  } else {
    checks.push({ id: 'keyword-in-url', category: 'basic', text: 'Từ khóa chính không có trong URL.', status: 'warning' });
  }

  // Focus Keyword appears in first 10% of content
  const first10PercentWordCount = Math.max(10, Math.floor(wordCount * 0.1));
  const first10PercentText = words.slice(0, first10PercentWordCount).join(' ').toLowerCase();
  if (first10PercentText.includes(keyword)) {
    checks.push({ id: 'keyword-first-10', category: 'basic', text: 'Từ khóa chính xuất hiện ngay ở phần đầu bài viết (10% đầu tiên).', status: 'good' });
  } else {
    checks.push({ id: 'keyword-first-10', category: 'basic', text: 'Bạn nên đưa từ khóa chính vào đầu bài mở đầu (chậm nhất là ở 10% văn bản đầu).', status: 'warning' });
  }

  // Focus Keyword found in content
  const keywordRegex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const keywordMatches = contentLower.match(keywordRegex);
  const keywordCountInContent = keywordMatches ? keywordMatches.length : 0;
  
  if (keywordCountInContent > 0) {
    checks.push({ id: 'keyword-in-content', category: 'basic', text: 'Từ khóa chính được tìm thấy trong nội dung bài viết.', status: 'good' });
  } else {
    checks.push({ id: 'keyword-in-content', category: 'basic', text: 'Nội dung bài viết không chứa từ khóa chính.', status: 'error' });
  }

  // Content Length
  if (wordCount > 600) {
    checks.push({ id: 'content-length', category: 'basic', text: `Bài viết chứa ${wordCount} từ. Đạt chuẩn bài viết SEO dài!`, status: 'good' });
  } else if (wordCount > 300) {
    checks.push({ id: 'content-length', category: 'basic', text: `Bài viết chứa ${wordCount} từ. Hơi ngắn, nên viết hơn 600 từ.`, status: 'warning' });
  } else {
    checks.push({ id: 'content-length', category: 'basic', text: `Bài viết chỉ chứa ${wordCount} từ. Quá ngắn để SEO tốt (cần >300 từ).`, status: 'error' });
  }


  // 2. ADDITIONAL SEO
  // Keyword Density
  if (wordCount > 0) {
    // estimate keyword word count (e.g. "bánh tráng" is 2 words)
    const keywordWordCount = keyword.split(' ').length;
    // density = (occurrences * words_per_keyword) / total_words * 100
    const density = ((keywordCountInContent * keywordWordCount) / wordCount) * 100;
    
    if (density >= 1 && density <= 2.5) {
      checks.push({ id: 'keyword-density', category: 'additional', text: `Mật độ từ khóa là ${density.toFixed(2)}%, rất tuyệt vời.`, status: 'good' });
    } else if (density > 2.5) {
      checks.push({ id: 'keyword-density', category: 'additional', text: `Mật độ từ khóa quá cao (${density.toFixed(2)}%). Google có thể coi là Spam/Nhồi nhét từ khóa.`, status: 'error' });
    } else if (density > 0) {
       checks.push({ id: 'keyword-density', category: 'additional', text: `Mật độ từ khóa là ${density.toFixed(2)}%, khá thấp. Cố gắng sử dụng từ khóa thêm vài lần nữa.`, status: 'warning' });
    }
  }

  // URL Length
  if (data.slug.length < 75) {
    checks.push({ id: 'url-length', category: 'additional', text: 'Đường dẫn URL có độ dài hoàn hảo.', status: 'good' });
  } else {
    checks.push({ id: 'url-length', category: 'additional', text: 'Đường dẫn URL quá dài (vượt quá 75 ký tự).', status: 'warning' });
  }

  // Links
  if (data.content.includes('<a href=')) {
    checks.push({ id: 'has-links', category: 'additional', text: 'Bài viết có chứa liên kết (Link). Tốt cho SEO.', status: 'good' });
  } else {
    checks.push({ id: 'has-links', category: 'additional', text: 'Bạn nên chèn thêm liên kết (nội bộ hoặc trỏ ra ngoài) vào bài viết.', status: 'warning' });
  }


  // 3. TITLE READABILITY
  const titleToCheck = data.seoTitle || data.title;
  if (titleToCheck.length >= 40 && titleToCheck.length <= 65) {
    checks.push({ id: 'title-length', category: 'title', text: 'Độ dài tiêu đề SEO rất đẹp.', status: 'good' });
  } else {
    checks.push({ id: 'title-length', category: 'title', text: 'Độ dài tiêu đề SEO chưa tốt (Nên từ 40 - 65 ký tự).', status: 'warning' });
  }

  if (/\\d/.test(titleToCheck)) {
    checks.push({ id: 'title-number', category: 'title', text: 'Tiêu đề có chứa con số, giúp tăng tỷ lệ nhấp chuột (CTR).', status: 'good' });
  } else {
    checks.push({ id: 'title-number', category: 'title', text: 'Thêm con số vào tiêu đề SEO nếu có thể để tăng độ thu hút.', status: 'warning' });
  }


  // 4. CONTENT READABILITY
  if (data.content.includes('<img ') && data.content.includes('src=')) {
    checks.push({ id: 'content-media', category: 'content', text: 'Bạn có sử dụng hình ảnh trong bài viết. Rất tốt!', status: 'good' });
  } else {
    checks.push({ id: 'content-media', category: 'content', text: 'Bạn chưa sử dụng hình ảnh nào trong nội dung.', status: 'warning' });
  }

  // Check long paragraphs
  const paragraphs = data.content.split(/<\/?p[^>]*>/).map(p => stripHtml(p)).filter(p => p.length > 0);
  let hasLongParagraph = false;
  for (const p of paragraphs) {
    if (countWords(p) > 150) {
      hasLongParagraph = true;
      break;
    }
  }

  if (hasLongParagraph) {
    checks.push({ id: 'short-paragraphs', category: 'content', text: 'Có đoạn văn bản quá dài (hơn 150 từ). Hãy ngắt dòng thường xuyên để dễ đọc.', status: 'warning' });
  } else {
    checks.push({ id: 'short-paragraphs', category: 'content', text: 'Các đoạn văn đều chia độ dài hợp lý, dễ đọc.', status: 'good' });
  }

  return checks;
}
