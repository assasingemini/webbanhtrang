-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "tags" TEXT[],
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerAddress" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LangdingPage" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "heroTitle" TEXT NOT NULL DEFAULT 'Bánh Tráng Trộn Ngon Cần Thơ',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Chua cay đậm đà – mê hoặc từng miếng cắn. Hương vị đặc trưng miền Tây với bò khô, trứng cút, đậu phộng rang và sa tế cay nồng.',
    "heroBgImage" TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1660579384185-5d9cc8d5bb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600',
    "aboutTitle" TEXT NOT NULL DEFAULT 'Hương Vị Đặc Trưng Từ Đất Cần Thơ',
    "aboutDescription1" TEXT NOT NULL DEFAULT 'Ra đời từ niềm đam mê ẩm thực đường phố, Bánh Tráng Trộn Ngon Cần Thơ mang đến công thức bí truyền đã được chắt lọc qua nhiều năm kinh nghiệm.',
    "aboutDescription2" TEXT NOT NULL DEFAULT 'Mỗi phần bánh tráng trộn là sự kết hợp tinh tế giữa nguyên liệu tươi ngon và gia vị đặc biệt, tạo nên hương vị không nơi nào sánh bằng.',
    "aboutImage" TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1689760661329-1e6504082caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    "statsRating" TEXT NOT NULL DEFAULT '4.9/5',
    "statsDailyCustomers" TEXT NOT NULL DEFAULT '500+',
    "statsExperience" TEXT NOT NULL DEFAULT '5 năm',
    "heroPhone" TEXT NOT NULL DEFAULT '0123.456.789',
    "contactAddress" TEXT NOT NULL DEFAULT '123 Đường 30/4, Quận Ninh Kiều, Cần Thơ',
    "contactEmail" TEXT NOT NULL DEFAULT 'contact@banhtrangtronngoncantho.vn',
    "contactHours" TEXT NOT NULL DEFAULT '09:00 - 22:00',
    "contactDays" TEXT NOT NULL DEFAULT 'Thứ 2 - Chủ Nhật',
    "facebookUrl" TEXT NOT NULL DEFAULT '#',
    "instagramUrl" TEXT NOT NULL DEFAULT '#',
    "youtubeUrl" TEXT NOT NULL DEFAULT '#',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LangdingPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_slug_key" ON "MenuItem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
