import type { ReactNode } from 'react';

interface MasonryGridProps {
  children: ReactNode;
}

export const MasonryGrid = ({ children }: MasonryGridProps) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 p-4">
      {/* 
        CSS Columns Strategy:
        - columns-*: Definitions for responsive column count.
        - gap-*: Spacing between columns.
        - space-y-*: Vertical spacing between items within a column (browser distributes them).
        - break-inside-avoid: Crucial! Prevents items from being split across columns.
      */}
      {children}
    </div>
  );
};
