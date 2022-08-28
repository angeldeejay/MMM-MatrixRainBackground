/* global Module */

/* Magic Mirror
 * Module: MMM-MatrixRainBackground
 *
 * By Andrés Vanegas <ukab72106@gmail.com>
 * MIT Licensed.
 */

Module.register("MMM-MatrixRainBackground", {
	defaults: {
		header: false,
		updateInterval: 600000,
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
	readyState: false,

	start: function () {
		this.config = { ...this.default, ...this.config };
		this.loop();
	},

	loop: function () {
		var self = this;
		if (this.readyState) {
			this.animate();
			setTimeout(function () {
				self.clear();
				self.loop();
			}, this.config.updateInterval);
		} else {
			this.updateDom();
			setTimeout(function () {
				self.loop();
			}, 100);
		}
	},

	clear: function () {
		this.readyState = false;
		if (this.animationInterval !== null) {
			clearInterval(this.animationInterval);
		}
		this.animationInterval = null;
		this.context = null;
		for (const el of ['wrapper', 'canvas']) {
			if (this[el] !== null) {
				try { this[el].offsetParent.removeChild(this[el]); } catch (_) { }
				this[el] = null;
			}
		}
		this.drops = [];
	},

	initDrops: function () {
		this.canvas.height = this.wrapper.offsetHeight;
		this.canvas.width = this.wrapper.offsetWidth;
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

	getDom: function () {
		if (this.wrapper === null) {
			this.wrapper = document.createElement("div");
			this.wrapper.classList.add("wrapper");
		}

		if (this.canvas === null) {
			this.canvas = document.createElement('canvas');
			this.canvas.id = 'canvas_' + this.identifier;
			this.canvas.style.width = 0.1;
			this.canvas.style.height = 0.1;
			this.wrapper.appendChild(this.canvas);
		}

		if (this.wrapper !== null &&
			this.wrapper.offsetParent !== null &&
			this.canvas !== null &&
			this.canvas.offsetParent !== null) {
			this.context = this.canvas.getContext("2d");
			this.readyState = true;
		}

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
			if (this.drops[i] * this.config.fontSize > this.canvas.height && Math.random() > 0.995) {
				this.drops[i] = 0;
			}
		}
	},

	animate: function () {
		this.initDrops();

		var self = this;
		this.animationInterval = setInterval(function () {
			self.draw()
		}, this.config.speed);
	},

	getStyles: function () {
		return [
			"MMM-MatrixRainBackground.css",
		];
	},
});
