'use client';

import React from 'react';

interface BrandMarkProps {
  size?: number;
  color?: string;
  className?: string;
}

export function BrandMark({
  size = 20,
  color = '#16a34a',
  className = '',
}: BrandMarkProps) {
  const barWidth = Math.max(2.5, size * 0.22);
  const angles = [0, 45, 90, 135];

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {angles.map((angle) => (
        <span
          key={angle}
          className="absolute rounded-full"
          style={{
            width: barWidth,
            height: size,
            backgroundColor: color,
            transform: `rotate(${angle}deg)`,
          }}
        />
      ))}
    </span>
  );
}
