// -- Imports
import Assets from "../../../Assets.js";
import { randomNumber } from "../../../util.js";

// -- Configs
const FPSDiv = document.getElementById("FPS");
const world = {
	width: 720,
	height: 1280,
	middleWidth: 0,
	middleHeight: 0,
};
world.middleWidth = world.width / 2;
world.middleHeight = world.height / 2;

class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Enemy");
	}

	fixPhysics() {
		this.setCircle(16);
		this.setVelocity(randomNumber(-200, 200), randomNumber(-200, 200));
		this.setRandomPosition();
	}
}

// -- Game
class MainScene extends Phaser.Scene {
	constructor() {
		super({ key: "Home", });
	}

	init() {
		this.score = 0;
	}

	preload() {
		this.load.image("Player", Assets.Sprites.Bola.AzulClaro);
		this.load.image("Enemy", Assets.Sprites.Bola.Vermelha);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;

		this.scoreLabel = this.add.text(middleWidth, middleHeight, this.score, { fontSize: 50, color: "#ff0000" }).setOrigin(0.5);

		this.player = this.physics.add.sprite(middleWidth, middleHeight, "Player").setCircle(16);
		this.enemies = this.physics.add.group({
			classType: Enemy,
			runChildUpdate: true,
			collideWorldBounds: true,
			bounceX: 1,
			bounceY: 1,
		});

		this.createNewEnemy();

		this.time.addEvent({
			delay: 1500,
			callback: this.createNewEnemy,
			callbackScope: this,
			loop: true,
		});

		this.physics.add.overlap(this.player, this.enemies, () => this.scene.restart());
		this.physics.add.collider(this.enemies);

		this.input.on("pointermove", ({ x, y }) => this.player.setPosition(x, y));
		// this.input.on("pointermove", ({ x, y }) => this.player.setPosition(x, y));
	}

	createNewEnemy() {
		const newEnemy = this.enemies.create(-100, -100);
		newEnemy.fixPhysics();
		this.score++;
		this.scoreLabel.setText(this.score);
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
