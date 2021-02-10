const mediaMatches = {
	mobile: '(min-width: 0px) and (max-width: 599.98px)',
	desktop: '(min-width: 600px)',
	getMediaMatches: () => {
		const mobile = window.matchMedia(mediaMatches.mobile)
		const desktop = window.matchMedia(mediaMatches.desktop)
		if (mobile.matches) return mediaMatches.mobile
		if (desktop.matches) return mediaMatches.desktop
		return ''
	},
}
export { mediaMatches }
