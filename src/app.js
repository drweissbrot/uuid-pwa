// try to register a service worker for offline capabilities
if ('serviceWorker' in navigator) {
	// register the service worker
	navigator.serviceWorker.register('/sw.js').then(() => {
		// let the user know we're ready for offline
		document.querySelector('#sw-installed').innerText = 'available offline'
	})
}

const copiedToClipboardElement = document.querySelector('#copied-to-clipboard')
const copyButton = document.querySelector('button#copy')
const regenerateAndCopyButton = document.querySelector('button#regenerate-and-copy')
const regenerateButton = document.querySelector('button#regenerate')
const uuidElement = document.querySelector('#uuid')

const regenerateUuid = () => {
	uuidElement.innerText = crypto.randomUUID()
}

let hideCopiedToClipboardElementTimeout

const copyUuidToClipboard = async () => {
	await navigator.clipboard.writeText(uuidElement.innerText)

	if (hideCopiedToClipboardElementTimeout) {
		clearTimeout(hideCopiedToClipboardElementTimeout)
		hideCopiedToClipboardElementTimeout = null
	}

	copiedToClipboardElement.classList.remove('--active')

	requestAnimationFrame(() => {
		copiedToClipboardElement.classList.add('--active')

		hideCopiedToClipboardElementTimeout = setTimeout(() => {
			copiedToClipboardElement.classList.remove('--active')
			hideCopiedToClipboardElementTimeout = null
		}, 1000)
	})
}

// generate a UUID on page load
regenerateUuid()

// immediately copy and close if we're on a matching URL
const url = new URL(window.location)

if (url.hostname === 'copy-uuid.brot.phd' || url.hostname === 'copy-guid.brot.phd' || url.hash === '#copy' || url.searchParams.has('copy')) {
	copyUuidToClipboard().then(() => {
		requestAnimationFrame(() => {
			window.close()
		})
	})
}

// add event listeners
copyButton.addEventListener('click', copyUuidToClipboard)
uuidElement.addEventListener('click', copyUuidToClipboard)
regenerateButton.addEventListener('click', regenerateUuid)

regenerateAndCopyButton.addEventListener('click', () => {
	regenerateUuid()
	copyUuidToClipboard()
})
