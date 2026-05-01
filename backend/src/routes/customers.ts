import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/customers – admin
router.get('/', requireAdmin, async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        customerName: true,
        customerPhone: true,
        customerAddress: true,
        totalAmount: true,
        createdAt: true,
      },
    });

    // Group by phone
    const customerMap = new Map<string, any>();
    for (const order of orders) {
      const existing = customerMap.get(order.customerPhone);
      if (existing) {
        existing.orderCount += 1;
        existing.totalSpent += order.totalAmount;
      } else {
        customerMap.set(order.customerPhone, {
          name: order.customerName,
          phone: order.customerPhone,
          address: order.customerAddress,
          orderCount: 1,
          totalSpent: order.totalAmount,
          firstOrder: order.createdAt,
        });
      }
    }

    res.json(Array.from(customerMap.values()));
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách khách hàng.' });
  }
});

export default router;
