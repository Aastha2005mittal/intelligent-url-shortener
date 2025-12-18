const encodeBase62 = require("../utils/base62");
const store = require("../models/urlStore");
const LRUCache = require("../utils/lruCache");

// Create a cache of capacity 100 for hot URLs
const cache = new LRUCache(100);

function shortenUrl(longUrl) {
    if (store.reverseUrlMap.has(longUrl)) {
        return store.reverseUrlMap.get(longUrl);
    }

    const id = store.generateId();
    const shortCode = encodeBase62(id);

    store.urlMap.set(shortCode, longUrl);
    store.reverseUrlMap.set(longUrl, shortCode);
    store.analyticsMap.set(shortCode, { clicks: 0 });

    return shortCode;
}

function getLongUrl(shortCode) {
    // Check cache first
    const cached = cache.get(shortCode);
    if (cached) {
        const analytics = store.analyticsMap.get(shortCode);
        analytics.clicks += 1;
        return cached;
    }

    const longUrl = store.urlMap.get(shortCode);
    if (!longUrl) return null;

    // Add to cache
    cache.put(shortCode, longUrl);

    // Update analytics
    const analytics = store.analyticsMap.get(shortCode);
    analytics.clicks += 1;

    return longUrl;
}

function getAnalytics(shortCode) {
    return store.analyticsMap.get(shortCode) || null;
}

module.exports = {
    shortenUrl,
    getLongUrl,
    getAnalytics
};
