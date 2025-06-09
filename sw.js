importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { CacheableResponsePlugin } = workbox.cacheableResponse;

// Cấu hình cache 5 phút
const cacheConfig = {
    cacheName: 'external-resources',
    plugins: [
        new CacheableResponsePlugin({ statuses: [0, 200] }),
        new ExpirationPlugin({
            maxAgeSeconds: 300, // 5 phút
            purgeOnQuotaError: true
        })
    ]
};

// Đăng ký route cho từng resource
[
    'https://h5.zadn.vn/static/fonts/ZMPIcons-Regular-v3.woff2',
    'https://h5.zdn.vn/static/js/custom-element.js',
    'https://h5.zdn.vn/static/js/getOwnPropertyDescriptors.js',
    'https://h5.zdn.vn/static/zmp-modules/extend-mini-app-index/index.js',
    'https://upload.wikimedia.org/wikipedia/commons/7/74/A-Cat.jpg'
].forEach(url => {
    registerRoute(
        new RegExp(url.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')),
        new CacheFirst(cacheConfig)
    );
});
