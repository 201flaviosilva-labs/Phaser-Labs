import Assets from "../../../Assets.js";
import { randomNumber } from "../../../util.js";

const FPSsDiv = document.getElementById("FPSs");

const screen = {
	width: 800,
	height: 600,
	middleWidth: 0,
	middleHeight: 0,
};

screen.middleWidth = screen.width / 2;
screen.middleHeight = screen.height / 2;

class MainScene extends Phaser.Scene {
	constructor() {
		super({ key: "MainScene" });
	}

	init() {
	}

	preload() {
		this.load.image("Red", Assets.Sprites.Triangulos.GreenRight);
	}

	create() {
		this.player = this.physics.add.sprite(screen.middleWidth, screen.middleHeight, "Red");

		this.player.setCollideWorldBounds(true);
		this.player.setAngle(randomNumber(0, 360));

		const cursorKeys = this.input.keyboard.createCursorKeys();
		cursorKeys.space.on("down", () => { this.player.setAngle(Phaser.Math.Angle.RandomDegrees()); });
	}

	update() {
		this.physics.velocityFromRotation(this.player.rotation, 100, this.player.body.velocity);
		FPSsDiv.innerHTML = game.loop.actualFps.toFixed(1);
	}
}

const config = {
	type: Phaser.AUTO,
	width: screen.width,
	height: screen.height,
	background: "#fff",
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		}
	},
	scene: [MainScene,],
}

const game = new Phaser.Game(config);
