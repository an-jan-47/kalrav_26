import type { ReactNode } from 'react';

interface MasonryGridProps {
  children: ReactNode;
}

export const MasonryGrid = ({ children }: MasonryGridProps) => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-2 md:p-4">
      {children}
    </div>
  );
};
