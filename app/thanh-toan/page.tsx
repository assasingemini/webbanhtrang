'use client';

import { useState } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { ShoppingCart, MapPin, Phone, User, FileText, CheckCircle, ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const priceFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: cart.map((item) => ({
            id: item.id,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOrderSuccess(true);
        setOrderId(data.orderId);
        clearCart();
      } else {
        setError(data.error || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } catch {
      setError('Không thể kết nối đến server. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
              Đặt hàng thành công!
            </h1>
            <p className="text-gray-500 mb-2 text-lg">
              Mã đơn hàng: <span className="font-bold text-[#A60817]">#{orderId}</span>
            </p>
            <p className="text-gray-500 mb-8">
              Nhân viên sẽ gọi điện xác nhận đơn hàng của bạn trong thời gian sớm nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/menu"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-[#A60817] to-[#FE5200] text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Package size={18} />
                Tiếp tục mua sắm
              </Link>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6 opacity-50">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
              Giỏ hàng trống
            </h1>
            <p className="text-gray-500 mb-8">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 py-3 px-6 bg-[#A60817] text-white rounded-2xl font-bold hover:bg-[#8A2F2C] transition-all"
            >
              <ArrowLeft size={18} />
              Xem thực đơn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      {/* Branded spinner overlay khi đang đặt hàng */}
      {isSubmitting && <LoadingSpinner text="Đang đặt hàng..." />}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="mb-8">
          <Link href="/menu" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#A60817] transition-colors mb-4 font-medium">
            <ArrowLeft size={16} /> Quay lại thực đơn
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
            Thông tin đặt hàng
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                <User size={20} className="text-[#FE5200]" />
                Thông tin người nhận
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Tên người nhận <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="customerName"
                      name="customerName"
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FE5200] focus:border-transparent outline-none text-gray-900 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={handleChange}
                      placeholder="0912 345 678"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FE5200] focus:border-transparent outline-none text-gray-900 transition-all"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="customerAddress" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Địa chỉ nhận hàng <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      id="customerAddress"
                      name="customerAddress"
                      type="text"
                      required
                      value={formData.customerAddress}
                      onChange={handleChange}
                      placeholder="Số 123, Đường 30/4, Q. Ninh Kiều, TP. Cần Thơ"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FE5200] focus:border-transparent outline-none text-gray-900 transition-all"
                    />
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label htmlFor="note" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1.5"><FileText size={14} /> Ghi chú</span>
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    rows={3}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Ví dụ: Giao buổi tối, gọi trước khi giao..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FE5200] focus:border-transparent outline-none text-gray-900 transition-all resize-none"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#A60817] to-[#FE5200] text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-900/15 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang đặt hàng...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Xác nhận đặt hàng
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                <ShoppingCart size={20} className="text-[#A60817]" />
                Đơn hàng ({totalItems} sản phẩm)
              </h2>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500">SL: {item.quantity}</p>
                      <p className="text-sm font-bold text-[#A60817]">
                        {priceFormatter.format(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Tổng cộng:</span>
                  <span className="text-2xl font-black text-[#A60817]">{priceFormatter.format(totalPrice)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Thanh toán khi nhận hàng (COD)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
