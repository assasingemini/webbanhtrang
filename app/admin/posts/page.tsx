import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, ArrowLeft, Tag } from 'lucide-react';
import DeletePostButton from './DeletePostButton';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' },
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
              Quản lý Tin tức / Blog
            </h1>
          </div>
          <Link
            href="/admin/posts/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm bài viết
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
                        Bài viết
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tags
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày đăng
                      </th>
                      <th scope="col" className="relative px-6 py-3 text-right">
                        <span className="sr-only">Hành động</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                          Chưa có bài viết nào. Hãy thêm bài viết mới.
                        </td>
                      </tr>
                    ) : (
                      posts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-14 w-20 relative rounded-md overflow-hidden bg-gray-100">
                                {post.coverImage ? (
                                  <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center p-1">No Image</div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900 line-clamp-1 max-w-xs">{post.title}</div>
                                <div className="text-xs text-gray-400 mt-0.5 truncate max-w-xs" title={post.slug}>/{post.slug}</div>
                                <div className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-xs">{post.excerpt}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {post.tags.length > 0 ? (
                                post.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    <Tag size={10} className="mr-1" />
                                    {tag}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-gray-400">—</span>
                              )}
                              {post.tags.length > 3 && (
                                <span className="text-xs text-gray-400">+{post.tags.length - 3}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end items-center space-x-4">
                              <Link
                                href={`/admin/posts/${post.id}/edit`}
                                className="text-indigo-600 hover:text-indigo-900 transition-colors"
                              >
                                <Edit size={20} />
                              </Link>
                              <DeletePostButton id={post.id} />
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

        <p className="mt-4 text-sm text-gray-500 px-4 sm:px-0">
          Tổng cộng: <span className="font-semibold">{posts.length}</span> bài viết
        </p>
      </div>
    </div>
  );
}
