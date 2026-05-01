import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAdmin } from './actions';
import { LayoutDashboard, Users, ShoppingCart, LogOut } from 'lucide-react';
import AdminMenuGrid from '@/components/admin/AdminMenuGrid';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FileText } from 'lucide-react';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session || session.value !== 'authenticated') {
    redirect('/admin/login');
  }

  const [postCount, orderCount, customerCount] = await Promise.all([
    prisma.post.count(),
    prisma.order.count(),
    prisma.order.groupBy({
      by: ['customerPhone'],
    }).then(groups => groups.length),
  ]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans pt-16">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="font-bold text-xl text-[#A60817]" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                  Admin Panel
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4 text-sm font-medium">admin@banhtrang.vn</span>
              <form action={logoutAdmin}>
                <button
                  type="submit"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                Tổng quan Dashboard
              </h1>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                        <ShoppingCart className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Tổng đơn hàng
                          </dt>
                          <dd className="text-3xl font-semibold text-gray-900">
                            {orderCount}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Khách hàng
                          </dt>
                          <dd className="text-3xl font-semibold text-gray-900">
                            {customerCount}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Bài viết (Blog)
                          </dt>
                          <dd className="text-3xl font-semibold text-gray-900">
                            {postCount}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <AdminMenuGrid />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
