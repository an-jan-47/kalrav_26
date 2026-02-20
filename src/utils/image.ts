// Supabase storage URL with our proxy path
export const getProxiedUrl = (url: string) => {
    if (!url || !url.includes('supabase.co')) return url;
    return url.replace(
        /https:\/\/.*\.supabase\.co\/storage\/v1\/object\/public\//, 
        '/cdn/image/'
    );
};

export const getOptimizedImageUrl = (url: string, width: number = 400) => {

    let finalUrl = getProxiedUrl(url);

    if (!finalUrl.startsWith('/cdn/image/')) return finalUrl;
    
    const hasParams = finalUrl.includes('?');
    const separator = hasParams ? '&' : '?';
    
    return `${finalUrl}${separator}width=${width}&format=webp&quality=80`;
};
