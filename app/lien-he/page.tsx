import type { Metadata } from 'next';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Liên Hệ Đặt Bánh Tráng Trộn Cần Thơ | Giao Hỏa Tốc',
  description: 'Thông tin liên hệ, địa chỉ bản đồ và số điện thoại tiệm bánh tráng trộn ngon nhất Cần Thơ. Đặt hàng qua hotline để được freeship Ninh Kiều.',
};

export default async function ContactPage() {
  const config = await prisma.langdingPage.findFirst({ where: { id: 1 } }) as any;
  const heroPhone = config?.heroPhone || '0123.456.789';
  const contactAddress = config?.contactAddress || '123 Đường 30/4, Quận Ninh Kiều, Cần Thơ';
  const contactEmail = config?.contactEmail || 'contact@banhtrangtronngoncantho.vn';
  const contactHours = config?.contactHours || '09:00 - 22:00';
  const contactDays = config?.contactDays || 'Thứ 2 - Chủ Nhật';

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Page Header */}
      <div style={{ background: '#A60817' }} className="pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(255,178,0,0.2)', border: '1px solid #FFB200', color: '#FFB200' }}
          >
            📞 Liên Hệ
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}
          >
            Liên Hệ <span style={{ color: '#FFB200' }}>Với Tiệm</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Bạn cần đặt số lượng lớn cho công ty, trường học? Hay đơn giản là thèm một bịch bánh tráng lúc nửa đêm? Gọi ngay cho chúng tôi!
          </p>
        </div>
      </div>

      {/* Contact card */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 md:p-12 border border-gray-100"
          style={{ boxShadow: '0 8px 40px rgba(166,8,23,0.10)' }}>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#FFF0F0' }}
              >
                <MapPin size={20} style={{ color: '#A60817' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                  Địa Chỉ Cửa Hàng
                </h3>
                <p className="text-gray-600">{contactAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#FFF0F0' }}
              >
                <Phone size={20} style={{ color: '#A60817' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                  Hotline Đặt Hàng
                </h3>
                <a
                  href={`tel:${heroPhone.replace(/\D/g, '')}`}
                  className="font-extrabold text-3xl transition-opacity hover:opacity-80"
                  style={{ color: '#A60817', fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}
                >
                  {heroPhone}
                </a>
                <p className="text-sm text-gray-500 mt-1">Hỗ trợ đặt hộ qua Zalo/Phone</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#FFF0F0' }}
              >
                <Clock size={20} style={{ color: '#A60817' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                  Giờ Hoạt Động
                </h3>
                <p className="text-gray-600">{contactDays}: {contactHours}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#FFF0F0' }}
              >
                <Mail size={20} style={{ color: '#A60817' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                  Email
                </h3>
                <a href={`mailto:${contactEmail}`} className="text-gray-600 hover:text-[#A60817] transition-colors">
                  {contactEmail}
                </a>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={`tel:${heroPhone.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-xl text-white transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #A60817, #FE5200)' }}
              >
                <Phone size={20} />
                Gọi Ship Ngay
              </a>
            </div>
          </div>

          {/* Map iframe */}
          <div className="relative aspect-square md:aspect-auto rounded-2xl overflow-hidden bg-gray-200 shadow-inner min-h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15715.367060596207!2d105.76019574452077!3d10.030511874465457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d2192b0f1%3A0x4c90a391d232ccce!2zTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
