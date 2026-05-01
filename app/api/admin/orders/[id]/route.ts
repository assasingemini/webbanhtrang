import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check admin auth
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const orderId = parseInt(id);
    const body = await req.json();
    const { status } = body;

    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Trạng thái không hợp lệ.' }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status, updatedAt: new Date() },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json(
      { error: 'Không thể cập nhật đơn hàng.' },
      { status: 500 }
    );
  }
}
