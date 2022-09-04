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
		fontSize: 32,
		speed: 75,
		rate: 99.5,
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror
	animationInterval: null,
	wrapper: null,
	canvas: null,
	context: null,
	drops: [],
	characters: [
		'一', '丁', '丂', '七', '丄', '丅', '丆', '万', '丈', '三', '上', '下', '丌', '不', '与', '丏',
		'丐', '丑', '丒', '专', '且', '丕', '世', '丗', '丘', '丙', '业', '丛', '东', '丝', '丞', '丟',
		'丠', '両', '丢', '丣', '两', '严', '並', '丧', '丨', '丩', '个', '丫', '丬', '中', '丮', '丯',
		'丰', '丱', '串', '丳', '临', '丵', '丶', '丷', '丸', '丹', '为', '主', '丼', '丽', '举', '丿',
		'乀', '乁', '乂', '乃', '乄', '久', '乆', '乇', '么', '义', '乊', '之', '乌', '乍', '乎', '乏',
		'乐', '乑', '乒', '乓', '乔', '乕', '乖', '乗', '乘', '乙', '乚', '乛', '乜', '九', '乞', '也',
		'习', '乡', '乢', '乣', '乤', '乥', '书', '乧', '乨', '乩', '乪', '乫', '乬', '乭', '乮', '乯',
		'买', '乱', '乲', '乳', '乴', '乵', '乶', '乷', '乸', '乹', '乺', '乻', '乼', '乽', '乾', '乿',
		'亀', '亁', '亂', '亃', '亄', '亅', '了', '亇', '予', '争', '亊', '事', '二', '亍', '于', '亏',
		'亐', '云', '互', '亓', '五', '井', '亖', '亗', '亘', '亙', '亚', '些', '亜', '亝', '亞', '亟',
		'亠', '亡', '亢', '亣', '交', '亥', '亦', '产', '亨', '亩', '亪', '享', '京', '亭', '亮', '亯',
		'亰', '亱', '亲', '亳', '亴', '亵', '亶', '亷', '亸', '亹', '人', '亻', '亼', '亽', '亾', '亿',
		'什', '仁', '仂', '仃', '仄', '仅', '仆', '仇', '仈', '仉', '今', '介', '仌', '仍', '从', '仏',
		'仐', '仑', '仒', '仓', '仔', '仕', '他', '仗', '付', '仙', '仚', '仛', '仜', '仝', '仞', '仟',
		'仠', '仡', '仢', '代', '令', '以', '仦', '仧', '仨', '仩', '仪', '仫', '们', '仭', '仮', '仯',
		'仰', '仱', '仲', '仳', '仴', '仵', '件', '价', '仸', '仹', '仺', '任', '仼', '份', '仾', '仿',
		'伀', '企', '伂', '伃', '伄', '伅', '伆', '伇', '伈', '伉', '伊', '伋', '伌', '伍', '伎', '伏',
		'伐', '休', '伒', '伓', '伔', '伕', '伖', '众', '优', '伙', '会', '伛', '伜', '伝', '伞', '伟',
		'传', '伡', '伢', '伣', '伤', '伥', '伦', '伧', '伨', '伩', '伪', '伫', '伬', '伭', '伮', '伯',
		'估', '伱', '伲', '伳', '伴', '伵', '伶', '伷', '伸', '伹', '伺', '伻', '似', '伽', '伾', '伿',
		'佀', '佁', '佂', '佃', '佄', '佅', '但', '佇', '佈', '佉', '佊', '佋', '佌', '位', '低', '住',
		'佐', '佑', '佒', '体', '佔', '何', '佖', '佗', '佘', '余', '佚', '佛', '作', '佝', '佞', '佟',
		'你', '佡', '佢', '佣', '佤', '佥', '佦', '佧', '佨', '佩', '佪', '佫', '佬', '佭', '佮', '佯',
		'佰', '佱', '佲', '佳', '佴', '併', '佶', '佷', '佸', '佹', '佺', '佻', '佼', '佽', '佾', '使',
		'侀', '侁', '侂', '侃', '侄', '侅', '來', '侇', '侈', '侉', '侊', '例', '侌', '侍', '侎', '侏',
		'侐', '侑', '侒', '侓', '侔', '侕', '侖', '侗', '侘', '侙', '侚', '供', '侜', '依', '侞', '侟',
		'侠', '価', '侢', '侣', '侤', '侥', '侦', '侧', '侨', '侩', '侪', '侫', '侬', '侭', '侮', '侯',
		'侰', '侱', '侲', '侳', '侴', '侵', '侶', '侷', '侸', '侹', '侺', '侻', '侼', '侽', '侾', '便',
		'俀', '俁', '係', '促', '俄', '俅', '俆', '俇', '俈', '俉', '俊', '俋', '俌', '俍', '俎', '俏',
		'俐', '俑', '俒', '俓', '俔', '俕', '俖', '俗', '俘', '俙', '俚', '俛', '俜', '保', '俞', '俟',
		'俠', '信', '俢', '俣', '俤', '俥', '俦', '俧', '俨', '俩', '俪', '俫', '俬', '俭', '修', '俯',
		'俰', '俱', '俲', '俳', '俴', '俵', '俶', '俷', '俸', '俹', '俺', '俻', '俼', '俽', '俾', '俿'
	],
	readyState: false,

	start: function () {
		this.config = { ...this.default, ...this.config };
		const __rate = parseFloat(`${this.config.rate}`);
		this.config.rate = isNaN(__rate) ? this.defaults.rate : __rate;
		this.loop();
	},

	loop: function () {
		var self = this;
		if (this.readyState) {
			this.animate();
		} else {
			this.updateDom();
			setTimeout(function () {
				self.loop();
			}, 100);
		}
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
			if (this.drops[i] * this.config.fontSize > this.canvas.height && Math.random() > (this.config.rate / 100)) {
				this.drops[i] = 0;
			}
		}
	},

	animate: function () {
		this.initDrops();
		const requestAnimationFrame = window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame;

		this.animationInterval = setInterval(() => requestAnimationFrame(() => this.draw()), this.config.speed);
	},

	getStyles: function () {
		return [
			"MMM-MatrixRainBackground.css",
		];
	},
});
