// -- Imports
import Assets from "../../../Assets.js";

// -- Configs
const FPSDiv = document.getElementById("FPS");
const world = {
	width: 2150,
	height: 1200,
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
		this.load.image("Azul", Assets.Sprites.Bola.AzulClaro);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;

		const particles = this.add.particles("Azul");
		particles.createEmitter({
			x: { min: 0, max: width },
			y: -10,
			lifespan: 5000,
			speedY: { min: 100, max: 600 },
			scale: { start: 0.1, end: 0.075 },
			quantity: { min: 1, max: 20 },
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
	scale: {
		mode: Phaser.Scale.FIT,
	},
	scene: [MainScene],
};
const game = new Phaser.Game(config);
