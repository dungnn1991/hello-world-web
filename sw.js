importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;

const cacheConfig = {
    cacheName: 'external-resources',
    plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
            headers: {
                'ETag': true,
                'Last-Modified': true
            }
        }),
        new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 300,
            purgeOnQuotaError: true
        })
    ]
};

const targetDomains = [
    'https://h5.zadn.vn',
    'https://h5.zdn.vn',
    'https://photo-logo-mapps.zadn.vn'
];

targetDomains.forEach(domain => {
    registerRoute(
        ({url}) => url.origin === domain,
        new StaleWhileRevalidate(cacheConfig)
    );
});
