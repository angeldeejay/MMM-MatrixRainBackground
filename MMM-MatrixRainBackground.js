/* global Module */

/* Magic Mirror
 * Module: MMM-MatrixRainBackground
 *
 * By Andrés Vanegas <ukab72106@gmail.com>
 * MIT Licensed.
 */

Module.register("MMM-MatrixRainBackground", {
	defaults: {
		updateInterval: 60000,
		fontSize: 32,
		speed: 75,
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror
	animationInterval: null,
	wrapper: null,
	canvas: null,
	context: null,
	drops: [],
	characters: [
		'田', '由', '甲', '申', '甴',
		'电', '甶', '男', '甸', '甹',
		'町', '画', '甼', '甽', '甾',
		'甿', '畀', '畁', '畂', '畃',
		'畄', '畅', '畆', '畇', '畈',
		'畉', '畊', '畋', '界', '畍',
		'畎', '畏', '畐', '畑'
	],

	start: function () {
		this.updateDom();
	},

	initDrops: function () {
		this.drops = [];
		for (
			var columns = Math.ceil(this.canvas.width / this.config.fontSize),
			rows = Math.ceil(this.canvas.height / this.config.fontSize),
			i = 0;
			i < columns;
			i++
		) {
			this.drops[i] = Math.floor(Math.random() * rows) * this.config.fontSize;
		}
	},

	clear: function () {
		if (this.animationInterval !== null) {
			clearInterval(this.animationInterval);
			this.animationInterval = null;
		}
		for (var el of ['canvas', 'wrapper']) {
			if (this[el] !== null) {
				try { this[el].parentNode.removeChild(this[el]); }
				catch (_) { ; }
				finally { this[el] = null; }
			}
		}
		this.context = null;
		this.initDrops();
	},

	getDom: function () {
		this.clear();

		this.wrapper = document.createElement("div");
		this.wrapper.width = '100%';
		this.wrapper.height = '100%';
		this.wrapper.style.position = 'relative';
		this.wrapper.style.width = '100%';
		this.wrapper.style.maxWidth = '100%';
		this.wrapper.style.minWidth = '100%';
		this.wrapper.style.height = '100%';
		this.wrapper.style.maxHeight = '100%';
		this.wrapper.style.minHeight = '100%';

		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'relative';
		this.wrapper.appendChild(this.canvas);

		this.context = this.canvas.getContext("2d");
		this.animate();

		return this.wrapper;
	},

	draw: function () {
		this.context.fillStyle = "rgba(0, 0, 0, 0.05)";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillStyle = "rgba(135, 180, 15, 0.7)";
		this.context.font = this.config.fontSize + "px arial";
		this.context.style = "text-align:center !important";
		for (var i = 0; i < this.drops.length; i++) {
			var character = this.characters[Math.floor(Math.random() * this.characters.length)];
			this.context.fillText(character, i * this.config.fontSize, this.drops[i] * this.config.fontSize);
			this.drops[i]++;
			if (this.drops[i] * this.config.fontSize > c.height && Math.random() > 0.995) {
				this.drops[i] = 0;
			}
		}
	},

	animate: function () {
		if (this.wrapper = null || this.wrapper.offsetParent === null) {
			setTimeout(() => this.animate, 100);
			return;
		}
		this.canvas.height = this.wrapper.innerHeight;
		this.canvas.width = this.wrapper.innerWidth;

		this.animationInterval = setInterval(
			() => window.requestAnimationFrame(this.draw),
			this.config.speed
		);
	},

	getStyles: function () {
		return [
			"MMM-MatrixRainBackground.css",
		];
	},
});
