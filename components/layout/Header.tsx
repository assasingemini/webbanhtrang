'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Flame, Menu, X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';

const links = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/menu', label: 'Thực Đơn' },
  { href: '/tin-tuc', label: 'Tin Tức' },
  { href: '/lien-he', label: 'Liên Hệ' },
];

export default function Header({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const priceFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 shadow-md"
        style={{ background: '#A60817' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#FFB200' }}
              >
                <Flame size={22} color="#A60817" />
              </div>
              <div className="leading-tight">
                <div
                  className="text-white font-bold text-sm"
                  style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}
                >
                  Bánh Tránh Trộn
                </div>
                <div className="text-xs" style={{ color: '#FFB200', fontFamily: 'Inter, sans-serif' }}>
                  Ngon Cần Thơ
                </div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all text-white hover:bg-white/10"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative ml-2 p-2 rounded-full text-white hover:bg-white/10 transition-all"
                aria-label="Giỏ hàng"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-[#FFB200] text-[#A60817] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#A60817]">
                    {totalItems}
                  </span>
                )}
              </button>

              <a
                href="tel:0123456789"
                className="ml-4 px-4 py-2 rounded-full text-sm font-bold transition-all"
                style={{
                  background: '#FFB200',
                  color: '#A60817',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Gọi Đặt Hàng
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-full text-white hover:bg-white/10 transition-all"
                aria-label="Giỏ hàng"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-[#FFB200] text-[#A60817] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#A60817]">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                className="text-white p-1"
                onClick={() => setOpen(!open)}
                aria-label="Mở menu"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden" style={{ background: '#8A2F2C' }}>
            <div className="px-4 pt-2 pb-4 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:0123456789"
                onClick={() => setOpen(false)}
                className="block mt-2 px-4 py-2 rounded-xl text-sm font-bold text-center transition-all"
                style={{ background: '#FFB200', color: '#A60817', fontFamily: 'Inter, sans-serif' }}
              >
                Gọi Đặt Hàng
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Drawer Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transition-transform duration-300 ease-in-out transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>Giỏ hàng</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <ShoppingCart size={64} className="mb-4" />
                <p className="text-lg">Giỏ hàng của bạn đang trống</p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    window.location.href = '/menu';
                  }}
                  className="mt-6 text-[#A60817] font-bold underline"
                >
                  Đi mua sắm ngay
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 italic">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                        <p className="text-[#A60817] font-bold text-sm">{priceFormatter.format(item.price)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-gray-100 rounded-lg px-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-[#A60817]"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, Math.min(99, item.quantity + 1))}
                            disabled={item.quantity >= 99}
                            className="p-1 hover:text-[#A60817] disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-500 font-medium">Tổng thanh toán:</span>
              <span className="text-2xl font-black text-[#A60817]">{priceFormatter.format(totalPrice)}</span>
            </div>
            <Link
              href="/thanh-toan"
              onClick={() => setCartOpen(false)}
              className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-[#FFB200] to-[#FE5200] text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Đặt hàng ngay
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
