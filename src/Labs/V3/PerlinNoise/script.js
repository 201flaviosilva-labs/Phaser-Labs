// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/perlin/
// https://codepen.io/rexrainbow/pen/YmyzoE?editors=0011

// -- Imports
import Assets from "../../../Assets.js";
import { randomNumber } from "../../../util.js";

// -- Configs
const FPSDiv = document.getElementById("FPS");
const world = {
	width: 800,
	height: 600,
	middleWidth: 0,
	middleHeight: 0,
};
world.middleWidth = world.width / 2;
world.middleHeight = world.height / 2;

// -- Game
class MainScene extends Phaser.Scene {
	constructor() {
		super({ key: "Home", });
	}

	preload() {
		const textPerlin = "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperlinplugin.min.js";
		this.load.plugin("rexperlinplugin", textPerlin, true);

		const rexCanvas = "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcanvasplugin.min.js";
		this.load.plugin("rexcanvasplugin", rexCanvas, true);

		this.load.image("Sky", Assets.Background.Skys.Sky);
		this.load.image("Dino", Assets.Sprites.Dino.Idle[1]);
		this.load.image("DinoDead", Assets.Sprites.Dino.Dead[6]);
		this.load.image("DinoJump", Assets.Sprites.Dino.Jump[8]);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;

		this.add.sprite(middleWidth, middleHeight, "Sky").setDepth(0);
		this.add.sprite(middleWidth, middleHeight, "Dino").setDepth(10);
		this.add.sprite(0, 0, "DinoDead").setDepth(0).setOrigin(0).setScale(0.5);

		const config = {
			levels: 100,
			period: 0.01,
		}

		console.log(this.add.rexCanvas);
		const noise = this.plugins.get("rexperlinplugin").add();
		const canvas = this.add.rexCanvas(0, 0, this.cameras.main.width, this.cameras.main.height).setOrigin(0);
		ResetTerrain(canvas, noise, config);
		canvas.setAlpha(0.25);
		canvas.setDepth(1);

		this.input.on("pointerdown", function () { ResetTerrain(canvas, noise, config); })

		this.add.sprite(width, height, "DinoJump").setDepth(1).setOrigin(1).setScale(0.5);
		this.add.text(middleWidth, 590, "Clica", { color: "yellow", }).setOrigin(0.5).setDepth(100);
	}

	update() {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
	}
}

const GetValue = Phaser.Utils.Objects.GetValue;
const ResetTerrain = function (canvas, noise, config) {
	const levels = GetValue(config, "levels", 5);
	const period = GetValue(config, "period", 0.013);
	noise.setSeed(Math.random());
	const width = canvas.width;
	const height = canvas.height;

	const ctx = canvas.getCanvas().getContext("2d");
	const imgData = ctx.createImageData(width, height), data = imgData.data;
	const step = 255 / levels;
	let value = null;
	let imgIndex = null;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			value = ValueMapping(noise.perlin2(x * period, y * period), step);
			imgIndex = ((y * width) + x) * 4;
			data[imgIndex + 0] = value;
			data[imgIndex + 1] = value;
			data[imgIndex + 2] = value;
			data[imgIndex + 3] = 255;
		}
	}

	ctx.putImageData(imgData, 0, 0);
}

const ValueMapping = function (value, step) {
	// value: -1~1
	value = (value + 1) / 2; // 0~1
	value *= 255; // 0~255
	value = Math.floor(value / step) * step;
	return Math.floor(value);
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.Auto,
	backgroundColor: "#000000",
	// scale: {
	// 	mode: Phaser.Scale.FIT,
	// },
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		}
	},
	scene: [MainScene],
};

const game = new Phaser.Game(config);
