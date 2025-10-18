'use client';

import { useEffect } from 'react';

export default function CursorGlow() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty('--x', `${e.clientX}px`);
      document.body.style.setProperty('--y', `${e.clientY}px`);
    };

    document.body.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div className="pointer-events-none fixed inset-0 z-0 cursor-glow" />;
}
