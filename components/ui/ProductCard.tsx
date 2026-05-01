import Link from 'next/link';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white group transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 4px 20px rgba(166,8,23,0.10)' }}
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={product.imageUrl || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop"}
          alt={`Hình ảnh ${product.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-semibold"
          style={{ background: '#A60817', fontFamily: 'Inter, sans-serif' }}
        >
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </div>
      </div>
      <div className="p-4">
        <h3
          className="font-semibold text-gray-800 mb-1 truncate"
          style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}
        >
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="font-bold text-lg"
            style={{ color: '#A60817', fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}
          >
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </span>
          <Link
            href={`/menu/${product.slug}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #A60817, #FE5200)', fontFamily: 'Inter, sans-serif' }}
          >
            <Eye size={14} />
            Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
