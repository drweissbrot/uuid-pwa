const cacheName = 'uuid-pwa-v1'

// cache all files we need on service worker install
self.addEventListener('install', (e) => {
	e.waitUntil(
		(async () => {
			const cache = await caches.open(cacheName)
			await cache.addAll([
				'/',
				'app.css',
				'app.js',
				'img/favicon.svg',
				'img/icon.svg',
			])
		})(),
	)

	console.info('sw installed')
})

// intercept all HTTP requests
self.addEventListener('fetch', (e) => {
	// ignore requests to different origins
	const url = new URL(e.request.url)
	if (url.origin !== location.origin) return

	// redirect index.html to root
	if (url.pathname === '/index.html') {
		return e.respondWith(Response.redirect('/'))
	}

	// try to load the requested resource from cache, and send a network request if it's a miss
	e.respondWith(
		(async () => {
			const hit = await caches.match(e.request)
			if (hit) return hit

			const response = await fetch(e.request)

			const cache = await caches.open(cacheName)
			await cache.put(e.request, response.clone())

			return response
		})(),
	)
})
