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
		this.load.image("Amarelo", Assets.Sprites.Quadrados.Amarelo);
		this.load.image("Azul", Assets.Sprites.Quadrados.Azul);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;
		const amarelo = this.physics.add.sprite(middleWidth - 200, middleHeight, "Amarelo").setCollideWorldBounds(true).setVelocityX(150).setBounceX(1);
		const azul = this.physics.add.sprite(middleWidth + 200, middleHeight, "Azul").setCollideWorldBounds(true).setVelocityX(-100).setBounceX(1);

		this.physics.add.collider(amarelo, azul);

		this.add.text(10, 10, "Valores Iniciais:");
		this.add.text(10, 30, "Amarelo => velocityX: 150, bouce: 1;");
		this.add.text(10, 50, "Azul => velocityX: -100, bouce: 1;");
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
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		}
	},
	scene: [MainScene],
};
const game = new Phaser.Game(config);
