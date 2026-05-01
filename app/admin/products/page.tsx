import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, ArrowLeft } from 'lucide-react';
import DeleteButton from './DeleteButton';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.menuItem.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="pt-24 pb-10">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center px-4 sm:px-0 mb-6">
          <div className="flex items-center">
            <Link href="/admin" className="mr-4 text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
              Quản lý Sản phẩm
            </h1>
          </div>
          <Link
            href="/admin/products/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#A60817] hover:bg-[#8A0613] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A60817] transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm sản phẩm
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Danh mục
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giá
                      </th>
                      <th scope="col" className="relative px-6 py-3 flex justify-end">
                        <span className="sr-only">Hành động</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                          Chưa có sản phẩm nào. Hãy thêm sản phẩm mới.
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 relative rounded-md overflow-hidden bg-gray-100">
                                {product.imageUrl ? (
                                  <Image 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    fill 
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center p-1">No Image</div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500 truncate max-w-[200px]" title={product.slug}>{product.slug}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.price.toLocaleString('vi-VN')}₫
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {product.isAvailable ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Đang bán
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                                Tạm ẩn
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end items-center space-x-4">
                              <Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                                <Edit size={20} />
                              </Link>
                              <DeleteButton id={product.id} />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
