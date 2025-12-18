let idCounter = 1;

// shortCode -> longUrl
const urlMap = new Map();

// longUrl -> shortCode
const reverseUrlMap = new Map();

// shortCode -> analytics
const analyticsMap = new Map();

module.exports = {
    generateId: () => idCounter++,
    urlMap,
    reverseUrlMap,
    analyticsMap
};
