import Assets from "../../../Assets.js";
import { randomNumber } from "../../../util.js";

const FPSsDiv = document.getElementById("FPSs");

const mundo = {
	w: 800,
	h: 800
};

class MainScene {
	constructor() {
		this.isBouce = false;
		this.isCreative = true;
		this.isCircle = false;

		this.ui();
	}

	ui() {
		const bounce = document.getElementById("Bounce");
		bounce.addEventListener("change", () => {
			this.isBouce = !this.isBouce;
			this.boxGroup.children.entries.forEach(box => {
				box.setBounce(bounce.checked ? 1 : 0);
			});
		});

		const CriarBox = document.getElementById("CriarBox");
		CriarBox.addEventListener("change", () => this.isCreative = !this.isCreative);

		const Circular = document.getElementById("Circular");
		Circular.addEventListener("change", () => this.isCircle = !this.isCircle);

		// Input Gravity
		const gravityX = document.getElementById("GravityX");
		gravityX.addEventListener("change", () => this.physics.world.gravity.x = gravityX.value);

		const gravityY = document.getElementById("GravityY");
		gravityY.addEventListener("change", () => this.physics.world.gravity.y = gravityY.value);
	}

	preload() {
		this.load.image("Plataforma", Assets.Sprites.Platforms.Platform);

		const box = Assets.Sprites.Quadrados;
		this.box = [];
		Object.keys(box).map(key => {
			if ("sheet" == key.toLowerCase()) return;
			this.box.push("Quadrados" + key);
			this.load.image("Quadrados" + key, box[key])
		});

		const balls = Assets.Sprites.Bola;
		this.balls = [];
		Object.keys(balls).map(key => {
			if ("sheet" == key.toLowerCase()) return;
			this.balls.push("Ball" + key);
			this.load.image("Ball" + key, balls[key])
		});
	}

	create() {
		// this.platform = this.physics.add.staticSprite(mundo.w / 2, mundo.h - 50, "Plataforma");
		this.platform = this.physics.add.staticGroup();
		this.platform.get(mundo.w / 2, mundo.h - 50, "Plataforma");
		this.platform.get(mundo.w / 2, 50, "Plataforma").setScale(0.25).refreshBody();

		this.boxGroup = this.physics.add.group({
			collideWorldBounds: true,
			runChildUpdate: true
		});

		this.physics.add.collider(this.platform, this.boxGroup);
		this.physics.add.collider(this.boxGroup);

		this.createElement({ downX: mundo.w / 2, downY: mundo.h / 2 });

		this.input.on("pointerdown", (e) => this.isCreative && this.createElement(e));
	}

	createElement(e) {
		if (!this.isCreative) return;

		const x = e.downX;
		const y = e.downY;

		let newElement = null;

		if (!this.isCircle) {
			const sprite = this.box[randomNumber(0, this.box.length - 1)];
			newElement = this.boxGroup.get(x, y, sprite);
		} else {
			const sprite = this.balls[randomNumber(0, this.balls.length - 1)];
			newElement = this.boxGroup.get(x, y, sprite);
			newElement.setCircle(32 / 2);
		}

		if (this.isBouce) newElement.setBounce(1);

		this.input.setDraggable(newElement.setInteractive());
		this.input.on('dragstart', (pointer, obj) => obj.body.moves = false);
		this.input.on('drag', (pointer, obj, dragX, dragY) => obj.setPosition(dragX, dragY));
		this.input.on('dragend', (pointer, obj) => obj.body.moves = true);
	}

	update() {
		const countElements = this.boxGroup.children.entries.length;
		FPSsDiv.innerHTML = Number(game.loop.actualFps).toFixed(1) + " - " + countElements;
	}
}

const config = {
	type: Phaser.AUTO,
	width: mundo.w,
	height: mundo.h,
	background: "#fff",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 50 },
			debug: true
		}
	},
	scene: [MainScene]
}

const game = new Phaser.Game(config);
