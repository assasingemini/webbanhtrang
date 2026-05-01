'use client';

import { useState, useTransition } from 'react';
import { ArrowLeft, Upload, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { updateLandingPage } from './actions';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type LandingPageData = {
  heroTitle: string;
  heroSubtitle: string;
  heroBgImage: string;
  aboutTitle: string;
  aboutDescription1: string;
  aboutDescription2: string;
  aboutImage: string;
  statsRating: string;
  statsDailyCustomers: string;
  statsExperience: string;
  heroPhone: string;
  contactAddress: string;
  contactEmail: string;
  contactHours: string;
  contactDays: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
};

export default function LandingPageForm({ initialData }: { initialData: LandingPageData }) {
  const [isPending, startTransition] = useTransition();
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'heroBgImage' | 'aboutImage') => {
    // ... logic upload không đổi
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ảnh quá lớn. Vui lòng chọn ảnh dưới 5MB.');
      return;
    }

    setUploadingField(fieldName);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = 'ml_default';

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', uploadPreset);
    uploadData.append('folder', 'landing_page');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: uploadData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setFormData(prev => ({ ...prev, [fieldName]: data.secure_url }));
      } else {
        alert('Lỗi khi tải ảnh lên Cloudinary.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Đã xảy ra lỗi kết nối khi tải ảnh.');
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    startTransition(async () => {
      const submissionData = new FormData(target);
      // Đảm bảo lấy đúng URL ảnh từ state (nếu người dùng vừa upload xong)
      submissionData.set('heroBgImage', formData.heroBgImage);
      submissionData.set('aboutImage', formData.aboutImage);

      await updateLandingPage(submissionData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isPending && <LoadingSpinner text="Đang lưu cài đặt..." />}
      {/* Hidden inputs to make sure the Server Action gets the updated state (especially image URLs) */}
      <input type="hidden" name="heroBgImage" value={formData.heroBgImage} />
      <input type="hidden" name="aboutImage" value={formData.aboutImage} />

      {/* === HERO SECTION === */}
      <div className="bg-white shadow sm:rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-red-50">
          <h2 className="text-base font-semibold text-[#A60817]">🏠 Hero Banner (Màn hình chào)</h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tiêu đề chính <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả ngắn</label>
            <textarea
              name="heroSubtitle"
              value={formData.heroSubtitle}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại Hotline <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="heroPhone"
              value={formData.heroPhone}
              onChange={handleInputChange}
              required
              placeholder="0123.456.789"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ảnh nền Hero</label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Dán URL ảnh hoặc tải lên..."
                  value={formData.heroBgImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, heroBgImage: e.target.value }))}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition font-mono"
                />
                <label className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg text-sm transition ${uploadingField === 'heroBgImage' ? 'opacity-50 pointer-events-none' : ''}`}>
                  {uploadingField === 'heroBgImage' ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  <span>{uploadingField === 'heroBgImage' ? 'Đang tải...' : 'Tải lên'}</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'heroBgImage')} />
                </label>
              </div>
              {formData.heroBgImage && (
                <div className="rounded-lg overflow-hidden h-32 bg-gray-100 border border-gray-200">
                  <img src={formData.heroBgImage} alt="Preview Hero" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 font-be-vietnam-pro">Thông tin Liên hệ</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5 font-be-vietnam-pro">Địa chỉ cửa hàng <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="contactAddress"
              value={formData.contactAddress}
              onChange={handleInputChange}
              required
              placeholder="123 Đường 30/4, Quận Ninh Kiều, Cần Thơ"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 font-be-vietnam-pro">Email liên hệ <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              required
              placeholder="contact@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 font-be-vietnam-pro">Ngày hoạt động <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="contactDays"
              value={formData.contactDays}
              onChange={handleInputChange}
              required
              placeholder="Thứ 2 - Chủ Nhật"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 font-be-vietnam-pro">Giờ hoạt động <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="contactHours"
              value={formData.contactHours}
              onChange={handleInputChange}
              required
              placeholder="09:00 - 22:00"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-blue-700 font-be-vietnam-pro">🔗 Liên kết Mạng xã hội</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 font-be-vietnam-pro">Facebook URL</label>
            <input
              type="text"
              name="facebookUrl"
              value={formData.facebookUrl}
              onChange={handleInputChange}
              placeholder="https://facebook.com/..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 font-be-vietnam-pro">Instagram URL</label>
            <input
              type="text"
              name="instagramUrl"
              value={formData.instagramUrl}
              onChange={handleInputChange}
              placeholder="https://instagram.com/..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 font-be-vietnam-pro">YouTube URL</label>
            <input
              type="text"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleInputChange}
              placeholder="https://youtube.com/..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
        </div>
      </div>

      {/* === STATS === */}
      <div className="bg-white shadow sm:rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-amber-50">
          <h2 className="text-base font-semibold text-amber-700">📊 Thống kê (Stats)</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Đánh giá</label>
            <input
              type="text"
              name="statsRating"
              value={formData.statsRating}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Khách/ngày</label>
            <input
              type="text"
              name="statsDailyCustomers"
              value={formData.statsDailyCustomers}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kinh nghiệm</label>
            <input
              type="text"
              name="statsExperience"
              value={formData.statsExperience}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
        </div>
      </div>

      {/* === ABOUT SECTION === */}
      <div className="bg-white shadow sm:rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-orange-50">
          <h2 className="text-base font-semibold text-orange-700">🏆 Về Chúng Tôi (About)</h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tiêu đề</label>
            <input
              type="text"
              name="aboutTitle"
              value={formData.aboutTitle}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Đoạn mô tả 1</label>
            <textarea
              name="aboutDescription1"
              value={formData.aboutDescription1}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Đoạn mô tả 2</label>
            <textarea
              name="aboutDescription2"
              value={formData.aboutDescription2}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ảnh minh hoạ</label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Dán URL ảnh hoặc tải lên..."
                  value={formData.aboutImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, aboutImage: e.target.value }))}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A60817] transition font-mono"
                />
                <label className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg text-sm transition ${uploadingField === 'aboutImage' ? 'opacity-50 pointer-events-none' : ''}`}>
                  {uploadingField === 'aboutImage' ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  <span>{uploadingField === 'aboutImage' ? 'Đang tải...' : 'Tải lên'}</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'aboutImage')} />
                </label>
              </div>
              {formData.aboutImage && (
                <div className="rounded-lg overflow-hidden h-32 bg-gray-100 border border-gray-200">
                  <img src={formData.aboutImage} alt="Preview About" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pb-8">
        <Link
          href="/admin"
          className="px-6 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          Hủy
        </Link>
        <button
          type="submit"
          disabled={isPending || !!uploadingField}
          className="px-8 py-2.5 rounded-lg text-sm font-semibold text-white transition hover:opacity-90 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #A60817, #FE5200)' }}
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          <span>{isPending ? 'Đang lưu...' : '💾 Lưu thay đổi'}</span>
        </button>
      </div>
    </form>
  );
}
