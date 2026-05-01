import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// POST /api/orders – public (customer places order)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerName, customerPhone, customerAddress, note, items } = req.body;

    if (!customerName || !customerPhone || !customerAddress) {
      res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' });
      return;
    }

    if (!items || items.length === 0) {
      res.status(400).json({ error: 'Giỏ hàng trống.' });
      return;
    }

    const totalAmount = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        customerAddress,
        note: note || null,
        totalAmount,
        status: 'PENDING',
        updatedAt: new Date(),
        OrderItem: {
          create: items.map((item: { id: number; price: number; quantity: number }) => ({
            menuItemId: item.id,
            quantity: Math.min(99, item.quantity),
            price: item.price,
          })),
        },
      },
      include: {
        OrderItem: { include: { MenuItem: true } },
      },
    });

    res.status(201).json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.' });
  }
});

// GET /api/orders – admin
router.get('/', requireAdmin, async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        OrderItem: { include: { MenuItem: true } },
      },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách đơn hàng.' });
  }
});

// PATCH /api/orders/:id – admin (update status)
router.patch('/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: 'Trạng thái không hợp lệ.' });
      return;
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error('Order update error:', error);
    res.status(500).json({ error: 'Không thể cập nhật đơn hàng.' });
  }
});

// DELETE /api/orders/:id – admin
router.delete('/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await prisma.order.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Không thể xoá đơn hàng.' });
  }
});

export default router;
