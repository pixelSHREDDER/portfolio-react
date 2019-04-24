// Credit for original cubes code goes to Paul Hayes: https://paulrhayes.com/2010-09/3d-css-cube-ii-touch-gestures-click-and-drag/

$(function() {
	var isMobile = detectMobile();
	var hasTouch = detectTouch();
	var el = document.createElement('div');
	var transformProps = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
	var transformProp = support(transformProps);
	var perspectiveProps = 'perspective webkitPerspective'.split(' ');
	var perspectiveProp = support(perspectiveProps);
	var transitionDuration = 'transitionDuration WebkitTransitionDuration MozTransitionDuration OTransitionDuration msTransitionDuration'.split(' ');
	var transitionDurationProp = support(transitionDuration);
	var activeCube = -1;
	var mouse = {
		start: {}
	};
	var widthDiff = (800 - $(window).width());
	var $wrapper = $('.wrapper')[0];
	var $nav = $('nav')[0];
	var navHeight = $('nav').eq(0).height();
	var $cubes = $('.cube');
	var cubeHeight = $('.cube').eq(0).height();
	var $viewports = $('.viewport');
	var viewports = [];
	var scale = getScale(isMobile);

	class Viewport {
		constructor(index) {
			this.index = index;
			this.x = 0;
			this.y = 0;
			this.el = $('.viewport')[this.index];
			this.cube = $('.cube')[this.index];
		}

		move(coords) {
			this.x = ((coords && (typeof coords.x === 'number')) ? coords.x : this.x);
			this.y = ((coords && (typeof coords.y === 'number')) ? coords.y : this.y);
			this.cube.style[transformProp] = `rotateX(-${((18 * (this.index + 1)) * 0.25)}deg) rotateY(${this.y}deg) translateY(${this.x}px)`;
			this.el.style[perspectiveProp] = `${(((cubeHeight * 2) * (this.index + 1)) * 1.50)}px`;
		}
	};

	function init() {
		for (var i = 0; i < $cubes.length; i++) {
			viewports.push(new Viewport(i));
			bindViewport(i);
		};

		if (isMobile) {
			setOrientation();

			$(window).resize(function() {
				setOrientation();
				animateIn();
			});
		};

		animateIn();

		$('iframe').load(function() {
			$(this).contents().on('mouseup touchend', function() {
				alert('Click detected inside iframe.');
				$(document).unbind('mousemove touchmove');
			});
		});
	};

	function support(props = []) {
		for (var i = 0, l = props.length; i < l; i++) {
			if (typeof el.style[props[i]] !== 'undefined') {
				return props[i];
			}
		}
	};

	function getActiveCube(x = 0, y = 0) {
		for (var i = 0; i < $cubes.length; i++) {
			var $cube = $cubes.eq(i);
			var offset = $cube.offset();
			var cubeArea = {
				x1: (offset.left || 0), 
				y1: (offset.top || 0),
				x2: ((offset.left + $cube.width()) || 0),
				y2: ((offset.top + $cube.height()) || 0)
			};
			if (x >= cubeArea.x1 && x <= cubeArea.x2) {
				if (y >= cubeArea.y1 && y <= cubeArea.y2) {
					return i;
				};
			};
		};
		return -1;
	};

	function moveCubes({x = 0, y = 0, activeCube = -1}) {
		var movementScaleFactor = 1;
		var dx;
		var dy;

		if (!mouse.last) {
			mouse.last = mouse.start;
		} else {
			if (this.forward(mouse.start.x, mouse.last.x) != this.forward(mouse.last.x, x)) {
				mouse.start.x = mouse.last.x;
			}
			if (this.forward(mouse.start.y, mouse.last.y) != this.forward(mouse.last.y, y)) {
				mouse.start.y = mouse.last.y;
			}
		}
		dx = parseInt((mouse.start.y - y) / movementScaleFactor);
		dy = parseInt((mouse.start.x - x) / movementScaleFactor);

		mouse.last.x = x;
		mouse.last.y = y;

		this.forward = (v1 = 0, v2 = 0) => {
			return v1 >= v2 ? true : false;
		};

		for (var i = 0; i < $cubes.length; i++) {
			if (i === activeCube) {
				$('.viewport').eq(i).trigger(`move-viewport-${i}`, {x: dx, y: dy});
			} else {
				$('.viewport').eq(i).trigger(`move-viewport-${i}`, {x: dx, y: 0});
			};
		};
	};

	function keyboardMoveCubes({dir = 'left', dist = 0}) {
		for (var i = 0; i < $cubes.length; i++) {
			var dx = 0;
			var dy = 0;

			switch (dir) {
				case 37:
					dy = -45;
					break;
				case 38:
					dx = -dist;
					break;
				case 39:
					dy = 45;
					break;
				case 40:
					dx = dist;
					break;
			}
			$('.viewport').eq(i).trigger(`move-viewport-${i}`, {x: dx, y: dy});
		};
	};

	function bindViewport(viewportIndex = 0) {
		$('.viewport').eq(viewportIndex).bind(`move-viewport-${viewportIndex}`, function(evt, movedMouse) {
			viewports[viewportIndex].move({
				x: viewports[viewportIndex].x - movedMouse.x,
				y: viewports[viewportIndex].y - movedMouse.y
			});
		});
	};

	function animateIn() {
		var y = ((scale === 1.0) ? 0 : (scale * 2000));
		$viewports.each(function(i) {
			$(this).trigger(`move-viewport-${i}`, {x: 0, y: 0});
		}).promise()
		.done(function() {
			$wrapper.style[transformProp] = `scale(${scale},${scale})`;
		}).promise()
		.done(function() {
			var heightDiff = parseInt($('.wrapper').eq(0).offset().top / scale);
			$wrapper.style[transformProp] += ` translateY(-${(heightDiff - 200)}px)`;
		}).promise()
		.done(function() {
			$cubes.each(function(i) {
				$(this).css({'opacity': '1'});
			});
		});
	};

	function detectMobile() {
		return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
	};

	function detectTouch() {
		return (document.ontouchmove !== undefined);
	};

	function getScale(mobile = false) {
		return (
			((widthDiff > 0) ? ((100 - (widthDiff / 10)) / 100) : 1.0) *
			((mobile && detectLandscape()) ? 0.6 : 1.0)
		);
	};

	function detectLandscape() {
		return (screen.width > screen.height);
	};

	function setOrientation(div = 'body') {
		if (detectLandscape()) {
			$(div).addClass('landscape_mode');
			$(div).removeClass('portrait_mode');
		} else {
			$(div).addClass('portrait_mode');
			$(div).removeClass('landscape_mode');
		}
	};

	$(document).keydown(function(e) {
		switch(e.keyCode) {
			case 37: // left
			case 39: // right
				keyboardMoveCubes({dir: e.keyCode});
			case 38: // up
			case 40: // down
				e.preventDefault();
				keyboardMoveCubes({dir: e.keyCode, dist: 20});
				break;
			default:
				break;
		};
	}).bind('mousedown touchstart', function(e) {
		delete mouse.last;

		if($(e.target).is('a')) {
			return true;
		}

		e.originalEvent.touches ? e = e.originalEvent.touches[0] : null;
		mouse.start.x = e.pageX;
		mouse.start.y = e.pageY;
		activeCube = getActiveCube(mouse.start.x, mouse.start.y);

		$(document).bind('mousemove touchmove', function(event) {
			// Only perform rotation if one touch or mouse (e.g. still scale with pinch and zoom)
			if(!hasTouch || !(event.originalEvent && event.originalEvent.touches.length > 1)) {
				event.preventDefault();
				// Get touch co-ords
				event.originalEvent.touches ? event = event.originalEvent.touches[0] : null;
				moveCubes({x: event.pageX, y: event.pageY, activeCube: activeCube});
			}
		}).bind('mouseup touchend', function() {
			$(document).unbind('mousemove touchmove');
		});
	}).on('mousewheel', function(e) {
		keyboardMoveCubes({dir: ((e.deltaY > 0) ? 38 : 40), dist: (e.deltaFactor * 20)});
	}).ready(function() {
		init();
	});
});