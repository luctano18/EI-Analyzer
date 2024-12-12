import React from 'react';

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  mobileSrc?: string;
  tabletSrc?: string;
  desktopSrc: string;
  alt: string;
  className?: string;
}

export default function ResponsiveImage({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  alt,
  className = '',
  ...props
}: ResponsiveImageProps) {
  return (
    <picture>
      {mobileSrc && (
        <source
          media="(max-width: 767px)"
          srcSet={mobileSrc}
        />
      )}
      {tabletSrc && (
        <source
          media="(min-width: 768px) and (max-width: 1023px)"
          srcSet={tabletSrc}
        />
      )}
      <source
        media="(min-width: 1024px)"
        srcSet={desktopSrc}
      />
      <img
        src={desktopSrc}
        alt={alt}
        className={`w-full h-auto ${className}`}
        loading="lazy"
        {...props}
      />
    </picture>
  );
}