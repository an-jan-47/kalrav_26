// Supabase storage URL with our proxy path
export const getProxiedUrl = (url: string) => {
    if (!url || !url.includes('supabase.co')) return url;
    const path = url.replace(
        /https:\/\/.*\.supabase\.co\/storage\/v1\/object\/public\//, 
        ''
    );
    // Encode each path segment individually to handle spaces and special chars
    // without double-encoding already-encoded sequences or slashes
    const encodedPath = path.split('/').map(segment => encodeURIComponent(segment)).join('/');
    return `/cdn/image/${encodedPath}`;
};

export const getOptimizedImageUrl = (url: string, width: number = 400) => {

    let finalUrl = getProxiedUrl(url);

    if (!finalUrl.startsWith('/cdn/image/')) return finalUrl;
    
    const hasParams = finalUrl.includes('?');
    const separator = hasParams ? '&' : '?';
    
    return `${finalUrl}${separator}width=${width}&format=webp&quality=80`;
};
