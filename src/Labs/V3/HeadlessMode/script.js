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
		this.load.image("Player", Assets.Sprites.Bola.AzulClaro);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;
		this.player = this.physics.add.sprite(middleWidth, middleHeight, "Player").setCircle(16);
		this.player.setVelocity(200, 200);
		this.player.setBounce(1);
	}

	update(time, delta) {
		if (this.player.body.checkWorldBounds()) console.log("Collision");

		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
	}
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.HEADLESS,
	backgroundColor: "#000000",
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		}
	},
	fps: {
		target: 1000,
		forceSetTimeOut: true,
	},
	scene: [MainScene],
};
const game = new Phaser.Game(config);
