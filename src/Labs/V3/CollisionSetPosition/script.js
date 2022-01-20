// -- Imports
import Assets from "../../../Assets.js";
import { randomNumber } from "../../../util.js";

// -- Configs
const FPSDiv = document.getElementById("FPS");
const world = {
	width: 600,
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
		this.load.image("Player1", Assets.Sprites.Bola.AzulClaro);
		this.load.image("Player2", Assets.Sprites.Quadrados.Amarelo);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;
		this.player1 = this.physics.add.sprite(0, 0, "Player1").setCircle(16).setCollideWorldBounds(true).setBounce(1);
		this.player2 = this.physics.add.sprite(width, height, "Player2").setCollideWorldBounds(true).setBounce(1);

		this.physics.add.collider(this.player1, this.player2);
	}

	update(time, delta) {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
		const speed = 1;

		this.player1.setPosition(this.player1.x + speed, this.player1.y + speed);
		this.player2.setPosition(this.player2.x - speed, this.player2.y - speed);
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
