// -- Imports
import Assets from "../../../Assets.js";
import { randomNumber } from "../../../util.js";
import Radar from "./Radar.js";

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

	init() {
		this.radar = new Radar(this, world.width * 2, 5);
	}

	preload() {
		this.load.image("Player", Assets.Sprites.Quadrados.Branco);
		this.load.image("Enemy", Assets.Sprites.Quadrados.Vermelho);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;
		this.player = this.physics.add.sprite(middleWidth, middleHeight, "Player");
		this.enemy = this.physics.add.sprite(middleWidth, middleHeight, "Enemy").setCollideWorldBounds(true).setBounce(1);

		this.input.on("pointermove", e => this.player.setPosition(e.x, e.y));
	}

	update(time, delta) {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);

		const playerAngle = this.radar.draw(this.enemy, this.player);
		this.radar.setPosition(this.enemy.x, this.enemy.y);

		this.enemy.setAngle(playerAngle);
		this.physics.velocityFromRotation(this.enemy.rotation, 100, this.enemy.body.velocity);
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
