'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: 'max-width: 100%; height: auto; display: block; margin-left: auto; margin-right: auto;',
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          return { style: attributes.style };
        },
      },
    };
  },
});

import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { useCallback, useState } from 'react';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link2, Link2Off, ImageIcon, Undo2, Redo2,
  Heading1, Heading2, Heading3, ChevronDown,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function EditorDropdown({ 
  value, 
  options, 
  onChange, 
  defaultLabel, 
  style 
}: { 
  value: string; 
  options: { label: string; value: string }[]; 
  onChange: (val: string) => void; 
  defaultLabel: string;
  style?: React.CSSProperties;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        type="button"
        title={defaultLabel}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        style={style}
      >
        <span className="truncate mr-2">{options.find(o => o.value === value)?.label || defaultLabel}</span>
        <ChevronDown size={12} className="text-gray-400 shrink-0" />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 max-h-60 overflow-y-auto min-w-full flex flex-col">
            {options.map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 whitespace-nowrap ${value === opt.value ? 'bg-blue-50 text-blue-700 font-medium' : ''}`}
                style={{ fontFamily: opt.value.includes('sans-serif') || opt.value.includes('serif') || opt.value.includes('monospace') ? opt.value : 'inherit' }}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const FONTS = [
  { label: 'Mặc định', value: '' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier New', value: '"Courier New", monospace' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Tahoma', value: 'Tahoma, sans-serif' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
  { label: 'Impact', value: 'Impact, sans-serif' },
];

const FONT_SIZES = [
  { label: 'Cỡ chữ', value: '' },
  { label: '80%', value: '80%' },
  { label: '90%', value: '90%' },
  { label: '100%', value: '100%' },
  { label: '110%', value: '110%' },
  { label: '120%', value: '120%' },
  { label: '130%', value: '130%' },
  { label: '140%', value: '140%' },
  { label: '150%', value: '150%' },
  { label: '200%', value: '200%' },
];

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
});


export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        // StarterKit v3 includes link and underline, disable them here
        link: false,
        underline: false,
      }),
      Underline,
      TextStyle,
      FontFamily.configure({ types: ['textStyle'] }),
      FontSize,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800 cursor-pointer',
          rel: 'noopener noreferrer',
        },
      }),
      CustomImage.configure({
        HTMLAttributes: { class: 'rounded-lg my-4 outline-blue-400' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: placeholder || 'Viết nội dung bài viết tại đây...',
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const url = linkUrl.trim();
    if (!url) {
      editor.chain().focus().unsetLink().run();
      setShowLinkInput(false);
      return;
    }
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    editor.chain().focus().setLink({ href: fullUrl, target: '_blank' }).run();
    setLinkUrl('');
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = imageUrl.trim();
    if (!url) return;
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    editor.chain().focus().setImage({ src: fullUrl }).run();
    setImageUrl('');
    setShowImageInput(false);
  }, [editor, imageUrl]);

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ảnh quá lớn. Vui lòng chọn ảnh dưới 5MB.');
      return;
    }

    setIsUploadingImage(true);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = 'ml_default';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'blog_posts');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        editor.chain().focus().setImage({ src: data.secure_url }).run();
        setShowImageInput(false);
      } else {
        alert('Lỗi khi tải ảnh: ' + (data.error?.message || 'Unknown'));
      }
    } catch (err) {
      alert('Đã xảy ra lỗi kết nối khi tải ảnh lên.');
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  if (!editor) return null;

  const btnBase = 'p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed';
  const btnActive = 'bg-blue-100 text-blue-700 hover:bg-blue-200';

  // Get current font family and size
  const currentFont = editor.getAttributes('textStyle').fontFamily || '';
  const currentFontSize = editor.getAttributes('textStyle').fontSize || '';

  return (
    <div className="border border-gray-300 rounded-md shadow-sm relative z-0">
      {/* === TOOLBAR === */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center rounded-t-md relative z-10">

        {/* Undo / Redo */}
        <button type="button" title="Hoàn tác" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={btnBase}>
          <Undo2 size={16} />
        </button>
        <button type="button" title="Làm lại" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={btnBase}>
          <Redo2 size={16} />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Font Family Dropdown */}
        <EditorDropdown
          value={currentFont}
          options={FONTS}
          defaultLabel="Phông chữ"
          style={{ fontFamily: currentFont || 'inherit', minWidth: '130px' }}
          onChange={(val) => {
            if (val === '') {
              editor.chain().focus().unsetFontFamily().run();
            } else {
              editor.chain().focus().setFontFamily(val).run();
            }
          }}
        />

        {/* Font Size Dropdown */}
        <EditorDropdown
          value={currentFontSize}
          options={FONT_SIZES}
          defaultLabel="Cỡ chữ"
          style={{ minWidth: '85px' }}
          onChange={(val) => {
            if (val === '') {
              editor.chain().focus().setMark('textStyle', { fontSize: null }).run();
            } else {
              editor.chain().focus().setMark('textStyle', { fontSize: val }).run();
            }
          }}
        />

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Headings */}
        <button type="button" title="Tiêu đề H1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${btnBase} ${editor.isActive('heading', { level: 1 }) ? btnActive : ''}`}>
          <Heading1 size={16} />
        </button>
        <button type="button" title="Tiêu đề H2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${btnBase} ${editor.isActive('heading', { level: 2 }) ? btnActive : ''}`}>
          <Heading2 size={16} />
        </button>
        <button type="button" title="Tiêu đề H3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${btnBase} ${editor.isActive('heading', { level: 3 }) ? btnActive : ''}`}>
          <Heading3 size={16} />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Text formatting */}
        <button type="button" title="In đậm (Ctrl+B)"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btnBase} font-bold ${editor.isActive('bold') ? btnActive : ''}`}>
          <Bold size={16} />
        </button>
        <button type="button" title="In nghiêng (Ctrl+I)"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btnBase} ${editor.isActive('italic') ? btnActive : ''}`}>
          <Italic size={16} />
        </button>
        <button type="button" title="Gạch chân (Ctrl+U)"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${btnBase} ${editor.isActive('underline') ? btnActive : ''}`}>
          <UnderlineIcon size={16} />
        </button>
        <button type="button" title="Gạch ngang"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${btnBase} ${editor.isActive('strike') ? btnActive : ''}`}>
          <Strikethrough size={16} />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Lists */}
        <button type="button" title="Danh sách không thứ tự"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btnBase} ${editor.isActive('bulletList') ? btnActive : ''}`}>
          <List size={16} />
        </button>
        <button type="button" title="Danh sách có thứ tự"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btnBase} ${editor.isActive('orderedList') ? btnActive : ''}`}>
          <ListOrdered size={16} />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Text align */}
        <button type="button" title="Căn trái"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${btnBase} ${editor.isActive({ textAlign: 'left' }) ? btnActive : ''}`}>
          <AlignLeft size={16} />
        </button>
        <button type="button" title="Căn giữa"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${btnBase} ${editor.isActive({ textAlign: 'center' }) ? btnActive : ''}`}>
          <AlignCenter size={16} />
        </button>
        <button type="button" title="Căn phải"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${btnBase} ${editor.isActive({ textAlign: 'right' }) ? btnActive : ''}`}>
          <AlignRight size={16} />
        </button>
        <button type="button" title="Justify"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`${btnBase} ${editor.isActive({ textAlign: 'justify' }) ? btnActive : ''}`}>
          <AlignJustify size={16} />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Link */}
        <button type="button" title="Chèn link"
          onClick={() => {
            const prevUrl = editor.getAttributes('link').href || '';
            setLinkUrl(prevUrl);
            setShowLinkInput(!showLinkInput);
            setShowImageInput(false);
          }}
          className={`${btnBase} ${editor.isActive('link') ? btnActive : ''}`}>
          <Link2 size={16} />
        </button>
        {editor.isActive('link') && (
          <button type="button" title="Xoá link"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={`${btnBase} text-red-500 hover:bg-red-50`}>
            <Link2Off size={16} />
          </button>
        )}

        {/* Image */}
        <button type="button" title="Chèn ảnh"
          onClick={() => {
            setShowImageInput(!showImageInput);
            setShowLinkInput(false);
          }}
          className={`${btnBase} ${editor.isActive('image') ? btnActive : ''}`}>
          <ImageIcon size={16} />
        </button>

        {/* Image Resizing */}
        {editor.isActive('image') && (
          <>
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <span className="text-xs text-gray-500 font-medium ml-1">Kích thước ảnh:</span>
            <button type="button" title="Thu nhỏ 25%" onClick={() => editor.chain().focus().updateAttributes('image', { style: 'width: 25%; height: auto; display: block; margin-left: auto; margin-right: auto;' }).run()} className={`${btnBase} text-xs font-medium px-2`}>25%</button>
            <button type="button" title="Thu nhỏ 50%" onClick={() => editor.chain().focus().updateAttributes('image', { style: 'width: 50%; height: auto; display: block; margin-left: auto; margin-right: auto;' }).run()} className={`${btnBase} text-xs font-medium px-2`}>50%</button>
            <button type="button" title="Thu nhỏ 75%" onClick={() => editor.chain().focus().updateAttributes('image', { style: 'width: 75%; height: auto; display: block; margin-left: auto; margin-right: auto;' }).run()} className={`${btnBase} text-xs font-medium px-2`}>75%</button>
            <button type="button" title="Viền đầy đủ 100%" onClick={() => editor.chain().focus().updateAttributes('image', { style: 'max-width: 100%; width: 100%; height: auto; display: block; margin-left: auto; margin-right: auto;' }).run()} className={`${btnBase} text-xs font-medium px-2`}>100%</button>
          </>
        )}
      </div>

      {/* === LINK INPUT BAR === */}
      {showLinkInput && (
        <div className="bg-blue-50 border-b border-blue-200 px-3 py-2 flex items-center gap-2">
          <Link2 size={14} className="text-blue-500 shrink-0" />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setLink()}
            placeholder="Nhập URL (vd: https://example.com)"
            className="flex-1 text-sm border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
            autoFocus
          />
          <button type="button" onClick={setLink}
            className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors font-medium">
            Áp dụng
          </button>
          <button type="button" onClick={() => setShowLinkInput(false)}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1">
            Huỷ
          </button>
        </div>
      )}

      {/* === IMAGE INPUT BAR === */}
      {showImageInput && (
        <div className="bg-green-50 border-b border-green-200 px-3 py-2 flex items-center gap-2 flex-wrap">
          <ImageIcon size={14} className="text-green-500 shrink-0" />
          
          <div className="flex-1 flex items-center gap-2 min-w-[200px]">
             <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addImage()}
                placeholder="Nhập URL ảnh..."
                className="flex-1 text-sm border border-green-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-400"
                autoFocus
              />
              <button type="button" onClick={addImage}
                className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors font-medium whitespace-nowrap">
                Chèn URL
              </button>
          </div>

          <div className="text-xs text-green-700 font-medium px-1">HOẶC</div>

          <div className="relative flex items-center">
             <input
               type="file"
               accept="image/*"
               onChange={handleFileUpload}
               id="richtext-image-upload"
               className="hidden"
               disabled={isUploadingImage}
             />
             <label
               htmlFor="richtext-image-upload"
               className={`text-xs px-3 py-1.5 rounded transition-colors font-medium border flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-sm ${
                 isUploadingImage 
                   ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                   : 'bg-white text-green-700 border-green-600 hover:bg-green-50'
               }`}
             >
               {isUploadingImage ? 'Đang tải lên...' : 'Tải lên từ máy tính'}
             </label>
          </div>

          <button type="button" onClick={() => setShowImageInput(false)}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 ml-auto">
            Huỷ
          </button>
        </div>
      )}

      {/* === EDITOR CONTENT === */}
      <EditorContent
        editor={editor}
        className="min-h-[400px] [&_.ProseMirror]:min-h-[400px] [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none [&_.ProseMirror]:prose [&_.ProseMirror]:prose-sm [&_.ProseMirror]:max-w-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
      />
    </div>
  );
}
