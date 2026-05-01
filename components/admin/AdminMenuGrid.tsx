import Link from 'next/link';
import { Package, ShoppingCart, FileText, Settings, ChevronRight, LayoutTemplate } from 'lucide-react';

export default function AdminMenuGrid() {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
        Các Chức Năng Quản Trị
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Link href="/admin/products" className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="text-gray-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#A60817] transition-all duration-300">
            <Package className="h-7 w-7 text-[#A60817] group-hover:text-white transition-colors" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>Sản phẩm (Menu)</h4>
          <p className="text-sm text-gray-500">Quản lý danh sách thực đơn, giá cả và phân loại món ăn.</p>
        </Link>

        <Link href="/admin/posts" className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="text-gray-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
            <FileText className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>Tin tức (Blog)</h4>
          <p className="text-sm text-gray-500">Viết bài chia sẻ, đánh giá, kiến thức ẩm thực Cần Thơ.</p>
        </Link>

        <Link href="/admin/orders" className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="text-gray-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
            <ShoppingCart className="h-7 w-7 text-green-600 group-hover:text-white transition-colors" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>Đơn hàng</h4>
          <p className="text-sm text-gray-500">Quản lý đơn hàng, trạng thái thanh toán và giao hàng.</p>
        </Link>

        <Link href="/admin/langding-page" className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="text-gray-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-300">
            <LayoutTemplate className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>LangdingPage</h4>
          <p className="text-sm text-gray-500">Chỉnh sửa nội dung trang chủ: Hero banner, thống kê, giới thiệu.</p>
        </Link>

        <Link href="/admin/settings" className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="text-gray-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gray-800 transition-all duration-300">
            <Settings className="h-7 w-7 text-gray-700 group-hover:text-white transition-colors" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>Cài đặt (Settings)</h4>
          <p className="text-sm text-gray-500">Cấu hình thông tin liên hệ, SEO và hoạt động của web.</p>
        </Link>

      </div>
    </div>
  );
}
