'use client';

import { useTransition } from 'react';
import { deletePost } from './actions';
import { Trash2 } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function DeletePostButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm('Bạn có chắc chắn muốn xoá bài viết này? Hành động này không thể hoàn tác.')) {
      startTransition(() => {
        deletePost(id);
      });
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`text-red-600 hover:text-red-900 transition-colors ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label="Xoá bài viết"
    >
      {isPending ? <LoadingSpinner fullScreen={true} text="Đang xoá bài viết..." /> : <Trash2 size={20} />}
    </button>
  );
}
