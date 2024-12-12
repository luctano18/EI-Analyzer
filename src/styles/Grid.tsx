import React from 'react';

interface GridProps {
  children: React.ReactNode;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

export default function Grid({ 
  children, 
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 4,
  className = ''
}: GridProps) {
  const getColsClass = () => {
    return [
      cols.xs && `grid-cols-${cols.xs}`,
      cols.sm && `sm:grid-cols-${cols.sm}`,
      cols.md && `md:grid-cols-${cols.md}`,
      cols.lg && `lg:grid-cols-${cols.lg}`,
      cols.xl && `xl:grid-cols-${cols.xl}`
    ].filter(Boolean).join(' ');
  };

  return (
    <div className={`grid ${getColsClass()} gap-${gap} ${className}`}>
      {children}
    </div>
  );
}