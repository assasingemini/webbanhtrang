import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, customerAddress, note, items } = body;

    // Validate required fields
    if (!customerName || !customerPhone || !customerAddress) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Giỏ hàng trống.' },
        { status: 400 }
      );
    }

    // Calculate total
    const totalAmount = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );

    // Create order with items
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
        OrderItem: {
          include: {
            MenuItem: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}
