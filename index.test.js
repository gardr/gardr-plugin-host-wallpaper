var plugin = require('./index');
var PluginApi = require('gardr-core-plugin').PluginApi;

describe('plugin', function () {
	var pluginApi, spy;
	
	beforeEach(function () {
		pluginApi = new PluginApi();
		spy = sinon.spy(pluginApi, 'on');
	});
	
	it('should listen to item:afterrender event', function () {
		plugin(pluginApi, {});
		expect(spy).to.have.been.calledOnce;
		expect(spy).to.have.been.calledWith('item:afterrender');
	});
	
	it('should put background image on body', function () {
		var imageUrl = 'http://www.test.com/fooimage';
		var expectedStyle = 'url(' + imageUrl + ') 0% 0% repeat fixed';
		plugin(pluginApi, {});
		
		var options = {
			rendered : {
				wallpaperimage : imageUrl
			}
		};
		
		pluginApi.trigger('item:afterrender', options);
		
		expect(document.body.style.background).to.equal(expectedStyle);
	});	
	
	it('should set background color on body', function() {
		var color = 'rgb(255, 136, 51)';
		plugin(pluginApi, {});
		
		var options = {
			rendered : {
				wallpapercolor : color
			}
		};
		
		pluginApi.trigger('item:afterrender', options);
		
		expect(document.body.style.background).to.equal(color);		
	});
	
	it('should open url when body is clicked and wallpaperclick url is defined', function (done) {
		var imageUrl = 'http://www.test.com/fooimage';
		var clickUrl = 'http://www.test.com/foo';
		var windowSpy = sinon.spy(window, 'open');
		
		plugin(pluginApi, {});
		
		var options = {
			rendered : {
				wallpaperimage : imageUrl,
				wallpaperclick : clickUrl
			}
		};
		
		pluginApi.trigger('item:afterrender', options);
		
		setTimeout(function () {
			document.body.click();
			expect(windowSpy).to.have.been.calledOnce;
			expect(windowSpy).to.have.been.calledWith(clickUrl, '_blank');
			done();
		});				
	});
});