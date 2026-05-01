interface LoadingSpinnerProps {
  /** Hiển thị fullscreen overlay (default: true) */
  fullScreen?: boolean;
  /** Kích thước spinner: 'sm' | 'md' | 'lg' (default: 'md') */
  size?: 'sm' | 'md' | 'lg';
  /** Text hiển thị bên dưới spinner */
  text?: string;
}

const sizeMap = {
  sm: { ring: 48, icon: 20, border: 3 },
  md: { ring: 72, icon: 32, border: 4 },
  lg: { ring: 96, icon: 44, border: 5 },
};

/**
 * LoadingSpinner – Spinner hiện đại với icon lửa 🔥 ở giữa
 * - Vòng xoay bên ngoài gradient đỏ brand
 * - Icon lửa pulse nhẹ
 * - Có thể dùng fullscreen overlay hoặc inline
 */
export default function LoadingSpinner({
  fullScreen = true,
  size = 'md',
  text,
}: LoadingSpinnerProps) {
  const s = sizeMap[size];

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      {/* Spinner container */}
      <div className="relative flex items-center justify-center" style={{ width: s.ring, height: s.ring }}>
        {/* Outer spinning ring */}
        <div
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            border: `${s.border}px solid rgba(166,8,23,0.15)`,
            borderTopColor: '#A60817',
            borderRightColor: '#FE5200',
          }}
        />

        {/* Fire icon with pulse */}
        <span
          className="animate-pulse-glow select-none"
          style={{ fontSize: s.icon, lineHeight: 1 }}
          role="img"
          aria-label="loading"
        >
          🔥
        </span>
      </div>

      {/* Optional text */}
      {text && (
        <p
          className="text-sm font-medium animate-pulse"
          style={{ color: '#A60817', fontFamily: 'Inter, sans-serif' }}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (!fullScreen) return spinner;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      {spinner}
    </div>
  );
}
