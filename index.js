var eventlistener = require('eventlistener');

function wallpaperPlugin (gardrPluginApi, options) {
	gardrPluginApi.on('item:afterrender', onBannerRendered);
}

function onBannerRendered (item) {
	if (item.rendered.wallpaperimage) {
		createWallpaperByUrl(item.rendered.wallpaperimage, item.rendered.wallpapercolor);
		if (item.rendered.wallpaperclick) {
			listenToBodyClicks(item.rendered.wallpaperclick);
		}
	}
	else if (item.rendered.wallpapercolor) {
		createWallpaperByColor(item.rendered.wallpapercolor);
	}
}

function createWallpaperByUrl (url, color) {
	var css = 'url(' + url + ') 0% 0% repeat fixed ' + (color || '');
	setBodyBackground(css);
}

function listenToBodyClicks (url) {
	var body = document.body;	
	eventlistener.add(body, 'click', function (e) {	
		if (e.target === body) {
			window.open(url, '_blank');
		}
	});
}

function createWallpaperByColor (color) {
	 setBodyBackground(color);
}

function setBodyBackground (background) {
	document.body.style.background = background;
}

module.exports = wallpaperPlugin;
