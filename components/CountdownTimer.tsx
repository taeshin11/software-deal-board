'use client';
import { useEffect, useState } from 'react';

function getTimeLeft(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return { d, h, m };
}

export function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [left, setLeft] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLeft(getTimeLeft(expiresAt));
    const id = setInterval(() => setLeft(getTimeLeft(expiresAt)), 60000);
    return () => clearInterval(id);
  }, [expiresAt]);

  if (!mounted) return <span className="text-gray-400 text-xs">Loading...</span>;
  if (!left) return <span className="text-red-500 text-xs font-semibold">Expired</span>;

  const urgent = left.d < 2;
  return (
    <span className={`text-xs font-semibold ${urgent ? 'text-red-500' : 'text-amber-600'}`}>
      ⏱ {left.d > 0 ? `${left.d}d ` : ''}{left.h}h {left.m}m left
    </span>
  );
}
