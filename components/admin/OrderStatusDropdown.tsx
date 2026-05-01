'use client';

import { useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface OrderStatusDropdownProps {
  orderId: number;
  currentStatus: string;
}

const statusOptions = [
  { value: 'PENDING', label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'PROCESSING', label: 'Đang chuẩn bị', color: 'bg-blue-100 text-blue-800' },
  { value: 'SHIPPED', label: 'Đang giao', color: 'bg-purple-100 text-purple-800' },
  { value: 'COMPLETED', label: 'Hoàn thành', color: 'bg-green-100 text-green-800' },
  { value: 'CANCELLED', label: 'Đã hủy', color: 'bg-gray-100 text-gray-800' },
];

export default function OrderStatusDropdown({ orderId, currentStatus }: OrderStatusDropdownProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (newStatus: string) => {
    if (newStatus === status) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
      } else {
        alert('Cập nhật thất bại.');
      }
    } catch {
      alert('Lỗi kết nối.');
    } finally {
      setIsUpdating(false);
    }
  };

  const currentOption = statusOptions.find((o) => o.value === status);

  return (
    <>
      {isUpdating && <LoadingSpinner fullScreen={true} text="Đang cập nhật..." />}
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isUpdating}
        className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-[#FE5200] transition-all disabled:opacity-50 ${currentOption?.color || 'bg-gray-100 text-gray-800'}`}
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
}
