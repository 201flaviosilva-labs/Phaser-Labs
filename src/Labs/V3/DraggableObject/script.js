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
		const quadrados = Assets.Sprites.Quadrados.sheet;
		this.load.spritesheet("Boxes", quadrados.png, { frameWidth: quadrados.frameWidth, frameHeight: quadrados.frameHeight, });
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;

		const boxGroup = this.physics.add.group({ collideWorldBounds: true, });

		for (let i = 0; i < 50; i++) {
			const box = this.add.sprite(randomNumber(0, width), randomNumber(0, height), "Boxes", randomNumber(0, 8))
			boxGroup.add(box);

			box.setInteractive({ useHandCursor: true, });
			this.input.setDraggable(box);
		}

		this.physics.add.collider(boxGroup, boxGroup);

		this.input.on("dragstart", (pointer, gameObject) => gameObject.body.enable = false);
		this.input.on("drag", (pointer, gameObject, dragX, dragY) => gameObject.setPosition(dragX, dragY));
		this.input.on("dragend", (pointer, gameObject) => gameObject.body.enable = true);
	}

	update(time, delta) { FPSDiv.innerHTML = game.loop.actualFps.toFixed(1); }
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
			gravity: { x: 0, y: 300, },
			debug: true,
		}
	},
	scene: [MainScene],
};
const game = new Phaser.Game(config);
