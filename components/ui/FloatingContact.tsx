'use client';

import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingContact({ phone }: { phone: string }) {
  const cleanPhone = phone.replace(/\D/g, '');

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
      {/* Zalo Button */}
      <a
        href={`https://zalo.me/${cleanPhone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#0068FF] rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        aria-label="Liên hệ Zalo"
      >
        <div className="absolute inset-0 rounded-full bg-[#0068FF] animate-ping opacity-20 group-hover:opacity-40"></div>
        <MessageCircle size={28} className="text-white relative z-10" />
        <span className="absolute left-16 bg-white text-[#0068FF] px-3 py-1.5 rounded-lg text-sm font-bold shadow-md opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap pointer-events-none">
          Zalo Chat
        </span>
      </a>

      {/* Phone Call Button */}
      <a
        href={`tel:${cleanPhone}`}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#A60817] rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        aria-label="Gọi điện hotline"
      >
        <div className="absolute inset-0 rounded-full bg-[#A60817] animate-pulse-slow opacity-30"></div>
        <div className="absolute inset-0 rounded-full bg-[#A60817] animate-ping opacity-20 group-hover:opacity-40"></div>
        <Phone size={24} className="text-white relative z-10 animate-shake" />
        <span className="absolute left-16 bg-white text-[#A60817] px-3 py-1.5 rounded-lg text-sm font-bold shadow-md opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap pointer-events-none">
          {phone}
        </span>
      </a>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
          20%, 40%, 60%, 80% { transform: rotate(10deg); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }
        .animate-shake {
          animation: shake 2.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
