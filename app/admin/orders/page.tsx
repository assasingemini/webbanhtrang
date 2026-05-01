import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import OrderStatusDropdown from '@/components/admin/OrderStatusDropdown';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      OrderItem: {
        include: {
          MenuItem: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 font-sans pt-16">
      <div className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin" className="mr-4 text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                Quản lý Đơn hàng
              </h1>
            </div>
            <span className="text-sm text-gray-500 font-medium">
              Tổng: {orders.length} đơn
            </span>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
            {orders.length === 0 ? (
              <div className="px-4 py-12 text-center text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                Chưa có đơn hàng nào được tạo.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã đơn / Ngày đặt
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Khách hàng
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tổng tiền
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">#{order.id}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(order.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                          <div className="text-xs text-gray-500">{order.customerPhone}</div>
                          {order.customerAddress && (
                            <div className="text-xs text-gray-400 max-w-[200px] truncate" title={order.customerAddress}>
                              {order.customerAddress}
                            </div>
                          )}
                          {order.note && (
                            <div className="text-xs text-orange-500 mt-0.5 italic max-w-[200px] truncate" title={order.note}>
                              📝 {order.note}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-gray-900 max-w-xs">
                            {order.OrderItem.map((item, idx) => (
                              <div key={idx} className="truncate">
                                {item.MenuItem.name} <span className="text-gray-500">(x{item.quantity})</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#A60817]">
                            {order.totalAmount.toLocaleString('vi-VN')}đ
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
