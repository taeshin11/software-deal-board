'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147441.profitablecpmratenetwork.com/90/26/54/90265434096cfce6a0821bed155d0739.js", "https://pl29147443.profitablecpmratenetwork.com/9c/34/50/9c34504eecb74c8ec70c16229f9f4950.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
