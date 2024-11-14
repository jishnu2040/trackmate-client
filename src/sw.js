import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// Cleanup outdated caches
cleanupOutdatedCaches();

// Precache the static assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache API responses using a Network First strategy
registerRoute(
  ({ request }) => request.destination === 'document' || request.destination === 'style' || request.destination === 'script',
  new CacheFirst({
    cacheName: 'static-assets-cache',
    plugins: [
      // Use this plugin to control cache expiration, etc.
    ],
  })
);

// Cache API requests with Network First strategy for dynamic content
registerRoute(
  ({ url }) => url.origin === 'https://api.example.com', // Modify with your actual API domain
  new NetworkFirst({
    cacheName: 'api-cache',
  })
);

// Make sure service worker skips waiting and immediately activates
self.skipWaiting();
