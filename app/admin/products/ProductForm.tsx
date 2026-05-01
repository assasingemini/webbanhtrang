'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { createProduct, updateProduct } from './actions';
import Image from 'next/image';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type MenuItem = {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  slug: string;
  isAvailable?: boolean;
};

export default function ProductForm({ initialData }: { initialData?: MenuItem }) {
  const isEditing = !!initialData;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!imageUrl) {
      setError('Vui lòng tải lên hình ảnh sản phẩm.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set('imageUrl', imageUrl);
    formData.set('isAvailable', (e.currentTarget.elements.namedItem('isAvailable') as HTMLInputElement).checked ? 'true' : 'false');

    try {
      let res;
      if (isEditing && initialData?.id) {
        res = await updateProduct(initialData.id, formData);
      } else {
        res = await createProduct(formData);
      }

      if (res?.error) {
        setError(res.error);
        setIsLoading(false);
      }
    } catch (err) {
      setError('Đã xảy ra lỗi không xác định.');
      setIsLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Ảnh quá lớn. Vui lòng chọn ảnh dưới 5MB.');
      return;
    }

    setIsUploading(true);
    setError('');

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = 'ml_default';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'products');

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
        setImageUrl(data.secure_url);
      } else if (data.error) {
        setError(`Lỗi Cloudinary: ${data.error.message}`);
        console.error('Cloudinary Error:', data.error);
      }
    } catch (err) {
      setError('Đã xảy ra lỗi kết nối khi tải ảnh lên.');
      console.error('Upload Fetch Error:', err);
    } finally {
      setIsUploading(false);
    }
  }

  // Auto-generate slug from name
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isEditing) {
      const name = e.target.value;
      const generatedSlug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      const slugInput = document.getElementById('slug') as HTMLInputElement;
      if (slugInput) slugInput.value = generatedSlug;
    }
  }

  return (
    <div className="pt-24 pb-10">
      {isLoading && <LoadingSpinner text="Đang lưu sản phẩm..." />}
      <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center">
          <Link href="/admin/products" className="mr-4 text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
            {isEditing ? 'Sửa Sản phẩm' : 'Thêm Sản phẩm Mới'}
          </h1>
        </div>

        <div className="bg-white overflow-hidden shadow sm:rounded-lg border border-gray-100">
          <div className="px-4 py-5 sm:p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                
                <div className="sm:col-span-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Tên sản phẩm
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      defaultValue={initialData?.name}
                      onChange={handleNameChange}
                      className="shadow-sm focus:ring-[#FE5200] focus:border-[#FE5200] block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Giá (VNĐ)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      required
                      min="0"
                      step="1000"
                      defaultValue={initialData?.price}
                      className="shadow-sm focus:ring-[#FE5200] focus:border-[#FE5200] block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Danh mục
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="category"
                      id="category"
                      required
                      defaultValue={initialData?.category ?? 'Bánh Tráng'}
                      className="shadow-sm focus:ring-[#FE5200] focus:border-[#FE5200] block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                    URL Slug (duy nhất)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      required
                      defaultValue={initialData?.slug}
                      readOnly={isEditing}
                      className={`shadow-sm focus:ring-[#FE5200] focus:border-[#FE5200] block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border ${isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Đường dẫn thân thiện (vd: banh-trang-tron).</p>
                </div>

                {/* Cover Image Upload (Product) */}
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hình ảnh sản phẩm <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-full sm:w-48 h-32 relative rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden group">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt="Product Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <ImageIcon className="text-gray-300 w-12 h-12" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={isUploading}
                          className="hidden"
                          id="product-upload"
                        />
                        <label
                          htmlFor="product-upload"
                          className={`inline-flex items-center px-4 py-2 border border-[#FE5200] rounded-md shadow-sm text-sm font-medium text-[#FE5200] bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE5200] transition-colors cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Đang tải...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              {imageUrl ? 'Thay đổi ảnh' : 'Tải ảnh lên'}
                            </>
                          )}
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        Khuyên dùng ảnh hình vuông (1:1), dung lượng tối đa 5MB.
                      </p>
                      <input type="hidden" name="imageUrl" value={imageUrl} />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Mô tả
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      defaultValue={initialData?.description}
                      className="shadow-sm focus:ring-[#FE5200] focus:border-[#FE5200] block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6 flex items-center bg-gray-50 p-3 rounded-md border border-gray-200">
                  <input
                    id="isAvailable"
                    name="isAvailable"
                    type="checkbox"
                    defaultChecked={initialData ? initialData.isAvailable : true}
                    className="h-5 w-5 text-[#A60817] focus:ring-[#A60817] border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="isAvailable" className="ml-3 block text-sm text-gray-900 font-semibold cursor-pointer">
                    Sản phẩm đang kinh doanh (Hiển thị trên thực đơn)
                  </label>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-200 flex justify-end">
                <Link
                  href="/admin/products"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE5200] mr-3"
                >
                  Huỷ
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#A60817] hover:bg-[#8A0613] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A60817] disabled:opacity-50"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Đang lưu...' : 'Lưu Sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
