import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Poppins, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/ui/FloatingContact';
import { CartProvider } from '@/lib/context/CartContext';
import { prisma } from '@/lib/prisma';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['700', '800', '900'],
  variable: '--font-be-vietnam-pro',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://banhtrangtron.vercel.app'),
  title: 'Bánh Tráng Trộn Ngon Cần Thơ | Ship Tận Nơi Đỉnh Nhất',
  description: 'Thưởng thức bánh tráng trộn chuẩn vị ngon nhất tại Cần Thơ. Menu đa dạng, gia vị đậm đà, nhận ship hàng tận nơi nhanh chóng trong khu vực Ninh Kiều.',
  keywords: 'bánh tráng trộn ngon Cần Thơ, bánh tráng trộn Cần Thơ, ship bánh tráng trộn Cần Thơ, quán bánh tráng trộn Cần Thơ',
  openGraph: {
    title: 'Bánh Tráng Trộn Ngon Cần Thơ | Ship Tận Nơi',
    description: 'Thưởng thức bánh tráng trộn chuẩn vị ngon nhất tại Cần Thơ.',
    url: 'https://banhtrangtron.vercel.app',
    siteName: 'Bánh Tráng Trộn Ngon Cần Thơ',
    images: [
      {
        url: '/logo-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/logo-small.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/logo-small.png',
    apple: '/logo-small.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await prisma.langdingPage.findFirst({ where: { id: 1 } }) as any;
  const heroPhone = config?.heroPhone || '0123.456.789';
  const contactAddress = config?.contactAddress || '123 Đường 30/4, Quận Ninh Kiều, Cần Thơ';
  const contactEmail = config?.contactEmail || 'contact@banhtrangtronngoncantho.vn';
  const contactHours = config?.contactHours || '09:00 - 22:00';
  const contactDays = config?.contactDays || 'Thứ 2 - Chủ Nhật';
  const facebookUrl = config?.facebookUrl || '#';
  const instagramUrl = config?.instagramUrl || '#';
  const youtubeUrl = config?.youtubeUrl || '#';

  return (
    <html lang="vi">
      <head>
        <meta name="google-site-verification" content="1b_EDppXLq_61gN-_pDf9wSPggqm_JUq60kP7gv5ZiQ" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${beVietnamPro.variable} min-h-screen flex flex-col`} style={{ fontFamily: 'Inter, sans-serif' }}>
        <CartProvider>
          <Header phone={heroPhone} />
          <main className="flex-1">
            {children}
          </main>
          <Footer
            phone={heroPhone}
            address={contactAddress}
            email={contactEmail}
            hours={`${contactDays}: ${contactHours}`}
            facebookUrl={facebookUrl}
            instagramUrl={instagramUrl}
            youtubeUrl={youtubeUrl}
          />
          <FloatingContact phone={heroPhone} />
        </CartProvider>
        {/* Google Site Name & Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Bánh Tráng Trộn Ngon Cần Thơ",
                "url": "https://banhtrangtron.vercel.app"
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Bánh Tráng Trộn Ngon Cần Thơ",
                "image": "https://banhtrangtron.vercel.app/logo.jpg",
                "logo": "https://banhtrangtron.vercel.app/logo.jpg",
                "@id": "https://banhtrangtron.vercel.app",
                "url": "https://banhtrangtron.vercel.app",
                "telephone": heroPhone,
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": contactAddress,
                  "addressLocality": "Quận Ninh Kiều",
                  "addressRegion": "Cần Thơ",
                  "postalCode": "900000",
                  "addressCountry": "VN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 10.0299337,
                  "longitude": 105.7706153
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                  ],
                  "opens": "09:00",
                  "closes": "22:00"
                }
              }
            ])
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q4HY1KPLET"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Q4HY1KPLET');
          `}
        </Script>
      </body>
    </html>
  );
}
