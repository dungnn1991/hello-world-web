// sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponsePlugin, ExpirationPlugin } = workbox.cacheableResponse;

// Cấu hình cache 5 phút với validation
const cacheConfig = {
    cacheName: 'external-resources',
    plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200],
            headers: {
                'ETag': true,
                'Last-Modified': true
            }
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 300, // 5 phút
            purgeOnQuotaError: true
        })
    ]
};

// Danh sách domain cần cache
const targetDomains = [
    'https://h5.zadn.vn',
    'https://h5.zdn.vn',
    'https://photo-logo-mapps.zadn.vn'
];

// Đăng ký route cho từng domain
targetDomains.forEach(domain => {
    registerRoute(
        ({url}) => url.origin === domain,
        new StaleWhileRevalidate(cacheConfig)
    );
});

// Xử lý service worker update
self.addEventListener('message', (event) => {
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
