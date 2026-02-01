import { MasonryGrid } from '../ui/MasonryGrid';

export const GallerySkeleton = () => {
    return (
        <section className="w-full max-w-[1600px] mx-auto mb-20 px-4 md:px-12">
            <div className="text-left mb-8">
                <div className="h-8 w-48 bg-white/10 rounded-md animate-pulse"></div>
            </div>
            <MasonryGrid>
                {[...Array(8)].map((_, i) => (
                    <div 
                        key={i} 
                        className="break-inside-avoid mb-6 rounded-xl bg-white/5 animate-pulse"
                        style={{ height: `${Math.floor(Math.random() * (400 - 200 + 1) + 200)}px` }}
                    ></div>
                ))}
            </MasonryGrid>
        </section>
    );
};
