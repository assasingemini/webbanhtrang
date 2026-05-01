import Link from 'next/link';
import { Flame, MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer({
  phone,
  address,
  email,
  hours,
  facebookUrl = '#',
  instagramUrl = '#',
  youtubeUrl = '#',
}: {
  phone: string;
  address: string;
  email: string;
  hours: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}) {
  return (
    <footer style={{ background: '#1a0505', color: 'white' }} className="pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#FFB200' }}
              >
                <Flame size={26} color="#A60817" />
              </div>
              <div>
                <div className="font-bold text-lg text-white" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                  Bánh Tráng Trộn
                </div>
                <div className="text-sm" style={{ color: '#FFB200', fontFamily: 'Inter, sans-serif' }}>
                  Ngon Cần Thơ
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>
              Mang đến hương vị bánh tráng trộn đặc trưng nhất của vùng đất Cần Thơ. Chua, cay, đậm đà và mê hoặc từng miếng cắn.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ background: '#A60817' }}
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ background: '#FE5200' }}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ background: '#8A2F2C' }}
                aria-label="Youtube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="font-semibold text-base mb-4"
              style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif', color: '#FFB200' }}
            >
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>
              {[
                { href: '/', label: 'Trang Chủ' },
                { href: '/menu', label: 'Thực Đơn' },
                { href: '/tin-tuc', label: 'Tin Tức' },
                { href: '/lien-he', label: 'Liên Hệ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span style={{ color: '#FE5200' }}>›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold text-base mb-4"
              style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif', color: '#FFB200' }}
            >
              Thông Tin Liên Hệ
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>
              <li className="flex items-start gap-3">
                <MapPin size={16} style={{ color: '#FE5200', marginTop: 2, flexShrink: 0 }} />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} style={{ color: '#FE5200' }} />
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} style={{ color: '#FE5200' }} />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} style={{ color: '#FE5200' }} />
                <span className="text-gray-400">{hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-6 flex flex-col md:flex-row items-center justify-between text-xs"
          style={{ borderColor: '#374151', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}
        >
          <div>
            © {new Date().getFullYear()} Bánh Tráng Trộn Ngon Cần Thơ. Tất cả quyền được bảo lưu.
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/admin/login" className="hover:text-white transition-colors" aria-label="Admin Login">
              Đăng nhập Quản trị viên
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
