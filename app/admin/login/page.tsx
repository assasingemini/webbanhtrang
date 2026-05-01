'use client';

import { useState } from 'react';
import { loginAdmin } from '../actions';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    try {
      const res = await loginAdmin(formData);
      if (res.success) {
        // Redirect to admin dashboard
        router.push('/admin');
        router.refresh();
      } else {
        setError(res.error || 'Đăng nhập thất bại.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLoading && <LoadingSpinner fullScreen={true} text="Đang xác thực..." />}
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFB200]/10">
            <LogIn className="h-8 w-8 text-[#A60817]" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
            Đăng nhập Quản trị
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Dành cho ban quản trị Bánh Tráng Trộn Ngon Cần Thơ
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FE5200] sm:text-sm sm:leading-6"
                  placeholder="admin@banhtrang.vn"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Mật khẩu
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FE5200] sm:text-sm sm:leading-6"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-opacity-70 transition-colors"
              style={{ background: '#A60817' }}
            >
              {isLoading ? 'Đang xác thực...' : 'Đăng nhập'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
