type CacheEntry<T> = {
  data: T;
  timestamp: number;
  expiry: number;
};

export class CacheService {
  private static memoryCache: Map<string, CacheEntry<any>> = new Map();
  private static readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Get data from cache or fetch it if missing/expired
   */
  static async get<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = this.DEFAULT_TTL
  ): Promise<T> {
    const now = Date.now();
    
    // 1. Check Memory Cache
    if (this.memoryCache.has(key)) {
      const entry = this.memoryCache.get(key)!;
      if (now < entry.expiry) {
        // console.log(`[Cache] Hit (Memory): ${key}`);
        return entry.data;
      } else {
        // console.log(`[Cache] Expired (Memory): ${key}`);
        this.memoryCache.delete(key);
      }
    }

    // 2. Check Session Storage (Persists across reload in same tab)
    try {
      const stored = sessionStorage.getItem(`kalrav_cache_${key}`);
      if (stored) {
        const entry: CacheEntry<T> = JSON.parse(stored);
        if (now < entry.expiry) {
          // Hydrate memory cache
          this.memoryCache.set(key, entry);
          // console.log(`[Cache] Hit (Session): ${key}`);
          return entry.data;
        } else {
          // console.log(`[Cache] Expired (Session): ${key}`);
          sessionStorage.removeItem(`kalrav_cache_${key}`);
        }
      }
    } catch (e) {
      console.warn("Session storage validation failed", e);
    }

    // 3. Fetch Fresh Data
    // console.log(`[Cache] Miss: ${key} - Fetching...`);
    try {
      const data = await fetchFn();
      
      const entry: CacheEntry<T> = {
        data,
        timestamp: now,
        expiry: now + ttl
      };

      // Save to caches
      this.memoryCache.set(key, entry);
      try {
        sessionStorage.setItem(`kalrav_cache_${key}`, JSON.stringify(entry));
      } catch (e) {
        // Quota exceeded or disabled
        console.warn("Cache write failed", e);
      }

      return data;
    } catch (error) {
        console.error(`[Cache] Fetch failed for ${key}`, error);
        throw error;
    }
  }

  /**
   * Clear multiple cache keys by prefix or all if no prefix
   */
  static clear(prefix?: string) {
    if (!prefix) {
      this.memoryCache.clear();
      sessionStorage.clear();
      return;
    }

    // Clear memory
    for (const key of this.memoryCache.keys()) {
      if (key.startsWith(prefix)) this.memoryCache.delete(key);
    }

    // Clear session
    Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith(`kalrav_cache_${prefix}`)) {
            sessionStorage.removeItem(key);
        }
    });
  }
}
