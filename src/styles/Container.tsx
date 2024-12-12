import React from 'react';
import { containerMaxWidths } from './breakpoints';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: keyof typeof containerMaxWidths;
  className?: string;
}

export default function Container({ 
  children, 
  maxWidth = 'lg',
  className = ''
}: ContainerProps) {
  return (
    <div className={`mx-auto px-4 w-full ${maxWidth ? `max-w-[${containerMaxWidths[maxWidth]}]` : ''} ${className}`}>
      {children}
    </div>
  );
}