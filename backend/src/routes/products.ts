import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/products – public
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { featured, limit, category } = req.query;

    const where: any = { isAvailable: true };
    if (category) where.category = category as string;

    const products = await prisma.menuItem.findMany({
      where,
      take: limit ? parseInt(limit as string) : undefined,
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm.' });
  }
});

// GET /api/products/all – admin (includes unavailable)
router.get('/all', requireAdmin, async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm.' });
  }
});

// GET /api/products/:slug – public
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await prisma.menuItem.findUnique({
      where: { slug: req.params.slug },
    });
    if (!product) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
      return;
    }

    // Get related products
    const related = await prisma.menuItem.findMany({
      where: {
        category: product.category,
        NOT: { id: product.id },
        isAvailable: true,
      },
      take: 4,
    });

    res.json({ product, related });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Lỗi khi lấy sản phẩm.' });
  }
});

// POST /api/products – admin
router.post('/', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, imageUrl, category, slug, isAvailable } = req.body;
    const product = await prisma.menuItem.create({
      data: { name, description, price: parseFloat(price), imageUrl, category, slug, isAvailable: isAvailable ?? true },
    });
    res.status(201).json(product);
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Slug đã tồn tại.' });
      return;
    }
    res.status(500).json({ error: 'Không thể tạo sản phẩm.' });
  }
});

// PUT /api/products/:id – admin
router.put('/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, imageUrl, category, slug, isAvailable } = req.body;
    const product = await prisma.menuItem.update({
      where: { id },
      data: { name, description, price: parseFloat(price), imageUrl, category, slug, isAvailable },
    });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Không thể cập nhật sản phẩm.' });
  }
});

// DELETE /api/products/:id – admin
router.delete('/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await prisma.menuItem.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Không thể xoá sản phẩm.' });
  }
});

export default router;
