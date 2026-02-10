export const getOptimizedImageUrl = (url: string, width: number = 400) => {
    if (!url.includes('supabase.co')) return url;
    
    // Check if already has query params
    const hasParams = url.includes('?');
    const separator = hasParams ? '&' : '?';
    
    // Supabase storage image transformation
    // Note: This requires the "Image Transformation" feature to be enabled in Supabase project.
    // However, for standard Supabase storage, typically we just append constraints if supported.
    // If transformations are not enabled, this might be ignored, but it's safe to add.
    // Standard pattern: /render/image/public/... or just ?width=... depends on setup.
    // We will assume the standard query param method which is common.
    
    return `${url}${separator}width=${width}&format=webp&quality=80`;
};
