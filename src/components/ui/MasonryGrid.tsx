import type { ReactNode } from 'react';

interface MasonryGridProps {
  children: ReactNode;
}

export const MasonryGrid = ({ children }: MasonryGridProps) => {
  return (
    <div className="grid grid-cols-2 md:block md:columns-3 lg:columns-4 gap-2 md:gap-6 space-y-0 md:space-y-6 p-2 md:p-4">
      {children}
    </div>
  );
};
