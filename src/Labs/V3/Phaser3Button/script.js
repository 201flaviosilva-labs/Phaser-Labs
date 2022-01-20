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
		const { sheet } = Assets.Sprites.Quadrados;
		this.load.spritesheet("Button", sheet.png, { frameWidth: sheet.frameWidth, frameHeight: sheet.frameHeight, });
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;
		const button = new Phaser.Button(this, {
			x: 100,
			y: 100,
			spritesheet: "Button",
			on: {
				click: () => { console.log("Mouse Clicked!"); },
				over: () => { console.log("Mouse Over!"); },
				up: () => { console.log("Mouse Up!"); },
				out: () => { console.log("Mouse Out!"); },
			},
			frames: { click: 1, over: 2, up: 0, out: 0 },
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
