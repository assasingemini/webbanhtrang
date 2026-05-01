import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminCustomersPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans pt-16">
      <div className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center">
            <Link href="/admin" className="mr-4 text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
              Quản lý Khách hàng
            </h1>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg border border-gray-100">
            <div className="px-4 py-12 sm:p-6 text-center text-gray-500">
              Tính năng Quản lý Khách hàng đang được phát triển.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
