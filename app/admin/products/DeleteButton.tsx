'use client';

import { useTransition } from 'react';
import { deleteProduct } from './actions';
import { Trash2 } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm('Bạn có chắc chắn muốn xoá sản phẩm này? Hành động này không thể hoàn tác.')) {
      startTransition(() => {
        deleteProduct(id);
      });
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`text-red-600 hover:text-red-900 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label="Delete product"
    >
      {isPending ? <LoadingSpinner fullScreen={true} text="Đang xoá sản phẩm..." /> : <Trash2 size={20} />}
    </button>
  );
}
