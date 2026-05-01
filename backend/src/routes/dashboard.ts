import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/dashboard/stats – admin
router.get('/stats', requireAdmin, async (_req: Request, res: Response): Promise<void> => {
  try {
    const [postCount, orderCount, customerGroups] = await Promise.all([
      prisma.post.count(),
      prisma.order.count(),
      prisma.order.groupBy({ by: ['customerPhone'] }),
    ]);

    res.json({
      postCount,
      orderCount,
      customerCount: customerGroups.length,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Lỗi khi lấy thống kê.' });
  }
});

export default router;
