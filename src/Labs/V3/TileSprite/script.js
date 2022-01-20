// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/tilesprite/

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
		this.load.image("Map", Assets.Texture.Floor.StoneFloorDiffuse);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;
		this.map = this.add.tileSprite(350, 200, width, 200, "Map");
	}

	update(time, delta) {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
		// this.map.tileRotation += 0.1;
		this.map.tilePositionX += 0.1;
		// this.map.tilePositionY += 0.1;
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
