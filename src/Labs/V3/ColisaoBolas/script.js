import Assets from "../../../Assets.js";
import { randomNumber } from "../../../util.js";

class Ball extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);
	}

	generate() {
		this.setCollideWorldBounds(true);
		this.setVelocity(randomNumber(-500, 500), randomNumber(-500, 500));
		this.setBounce(1);
		const tamanho = randomNumber(4, 32);
		this.setCircle(tamanho / 2);
		this.displayWidth = tamanho;
		this.displayHeight = tamanho;
	}
}

const FPSsDiv = document.getElementById("FPSs");
const world = {
	width: window.innerWidth,
	height: window.innerHeight,
};


const Numberbals = randomNumber(5, 100);
const bolasNome = Object.keys(Assets.Sprites.Bola);

class Scene {
	preload() {
		bolasNome.map(b => {
			this.load.image(b, Assets.Sprites.Bola[b]);
		});
	}

	create() {
		this.ballsGroup = this.physics.add.group({ classType: Ball, });
		this.physics.add.collider(this.ballsGroup);

		for (let i = 0; i < Numberbals; i++) {
			const e = {
				downX: Math.floor(Math.random() * world.width),
				downY: Math.floor(Math.random() * world.height)
			}

			this.createBola(e);
		}

		this.input.on("pointerdown", e => this.createBola(e));
		this.input.on("pointermove", e => this.createBola(e));
	}

	createBola(e) {
		const x = e.downX;
		const y = e.downY;

		const sprite = bolasNome[randomNumber(0, bolasNome.length - 1)];
		const ball = this.ballsGroup.get(x, y, sprite);
		if (ball) ball.generate();
	}

	update() {
		const count = this.ballsGroup.children.entries.length;
		FPSsDiv.innerHTML = Number(game.loop.actualFps).toFixed(2) + " - " + count;
	}
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.Auto,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
		}
	},
	scene: [Scene]
};
const game = new Phaser.Game(config);
