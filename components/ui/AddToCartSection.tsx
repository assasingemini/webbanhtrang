'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';

interface AddToCartSectionProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    slug: string;
  };
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white transition-all text-gray-600"
          >
            <Minus size={18} />
          </button>
          <span className="w-12 text-center font-bold text-lg text-gray-900">{quantity}</span>
          <button 
            onClick={() => setQuantity(Math.min(99, quantity + 1))}
            disabled={quantity >= 99}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white transition-all text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
          </button>
        </div>
        <button 
          onClick={() => {
            addToCart({
              ...product,
              quantity
            });
          }}
          className="flex-1 flex items-center justify-center gap-3 bg-[#A60817] hover:bg-[#8A2F2C] text-white py-4 px-8 rounded-2xl font-bold transition-all shadow-lg shadow-red-900/10 active:scale-[0.98]"
        >
          <ShoppingCart size={20} />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
