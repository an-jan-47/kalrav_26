// Convert Supabase public URL to proxied CDN path
export const getProxiedUrl = (url: string) => {
  if (!url) return url;

  const supabasePattern =
    /^https:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\//;

  if (!supabasePattern.test(url)) return url;

  return url.replace(supabasePattern, "/cdn/image/");
};

// Add optimization parameters safely
export const getOptimizedImageUrl = (
  url: string,
  width: number = 400
) => {
  if (!url) return url;

  let finalUrl = getProxiedUrl(url);

  // Only optimize CDN image routes
  if (!finalUrl.startsWith("/cdn/image/")) return finalUrl;

  // Prevent duplicate parameters
  const urlObj = new URL(finalUrl, "https://dummy-base.com");

  // Only set if not already present
  if (!urlObj.searchParams.has("width")) {
    urlObj.searchParams.set("width", width.toString());
  }

  if (!urlObj.searchParams.has("format")) {
    urlObj.searchParams.set("format", "webp");
  }

  if (!urlObj.searchParams.has("quality")) {
    urlObj.searchParams.set("quality", "80");
  }

  return urlObj.pathname + urlObj.search;
};