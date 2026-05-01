-- AlterTable
ALTER TABLE "LangdingPage" ADD COLUMN     "ogImage" TEXT NOT NULL DEFAULT '/logo.jpg',
ADD COLUMN     "siteDescription" TEXT NOT NULL DEFAULT 'Thưởng thức bánh tráng trộn chuẩn vị ngon nhất tại Cần Thơ. Menu đa dạng, gia vị đậm đà, nhận ship hàng tận nơi nhanh chóng trong khu vực Ninh Kiều.',
ADD COLUMN     "siteKeywords" TEXT NOT NULL DEFAULT 'bánh tráng trộn ngon Cần Thơ, bánh tráng trộn Cần Thơ, ship bánh tráng trộn Cần Thơ',
ADD COLUMN     "siteName" TEXT NOT NULL DEFAULT 'food',
ADD COLUMN     "siteTitle" TEXT NOT NULL DEFAULT 'Bánh Tráng Trộn Ngon Cần Thơ | Ship Tận Nơi Đỉnh Nhất',
ADD COLUMN     "siteUrl" TEXT NOT NULL DEFAULT 'https://banhtrangtron.vercel.app';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoKeyword" TEXT,
ADD COLUMN     "seoTitle" TEXT;
