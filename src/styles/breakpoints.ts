export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const mediaQueries = {
  up: (breakpoint: Breakpoint) => 
    `@media (min-width: ${breakpoints[breakpoint]}px)`,
  down: (breakpoint: Breakpoint) => 
    `@media (max-width: ${breakpoints[breakpoint] - 0.1}px)`,
  between: (start: Breakpoint, end: Breakpoint) => 
    `@media (min-width: ${breakpoints[start]}px) and (max-width: ${breakpoints[end] - 0.1}px)`
};

export const containerMaxWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;