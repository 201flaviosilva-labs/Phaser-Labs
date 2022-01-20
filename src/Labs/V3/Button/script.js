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

class BasicButton extends Phaser.GameObjects.Sprite {
	constructor(config) {
		// check if config contains a scene
		if (!config.scene) {
			console.log("missing scene");
			return;
		}

		// check if config contains a key
		if (!config.key) {
			console.log("missing key!");
			return;
		}

		if (!config.up) config.up = 0;	// if there is no up property assume 0
		if (!config.down) config.down = config.up;// if there is no down in config use up
		if (!config.over) config.over = config.up;// if there is no over in config use up

		// call the constructor of the parent
		// set at 0, 0 in case there is no x and y
		// in the config
		super(config.scene, 0, 0, config.key, config.up);

		// if there is an x and y assign it
		if (config.x) this.x = config.x;
		if (config.y) this.y = config.y;

		// make interactive and set listeners
		this.setInteractive();
		this.on("pointerdown", this.onDown, this);
		this.on("pointerup", this.onUp, this);
		this.on("pointerover", this.onOver, this);
		this.on("pointerout", this.onUp, this);


		this.config = config;

		// To scene
		config.scene.add.existing(this);
	}

	onDown() {
		this.setFrame(this.config.down);
		console.log("Pointer Down");
	}
	onOver() {
		this.setFrame(this.config.over);
		console.log("Pointer Over");
	}
	onUp() {
		this.setFrame(this.config.up);
		console.log("Pointer Up");
	}
}

// -- Game
class MainScene extends Phaser.Scene {
	constructor() {
		console.clear();
		super({ key: "Home", });
	}

	preload() {
		const { sheet } = Assets.Sprites.Quadrados;
		this.load.spritesheet("Button", sheet.png, { frameWidth: sheet.frameWidth, frameHeight: sheet.frameHeight, });
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;

		const button = new BasicButton({
			"scene": this,
			"key": "Button",
			"up": 0,
			"over": 1,
			"down": 2,
			"x": middleWidth,
			"y": middleHeight,
		});
	}

	update(time, delta) {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
	}
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
