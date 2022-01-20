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
// Render Texture
class RenderTexture extends Phaser.GameObjects.RenderTexture {
	constructor(scene, x = 100, y = 100, width = world.middleWidth, height = world.middleHeight) {
		super(scene, x, y, width, height);

		// Add Objects
		const graphics = scene.add.graphics();
		graphics.clear();
		graphics.setDefaultStyles({
			lineStyle: {
				width: 1,
				color: 0x00ff00,
				alpha: 1,
			},
			fillStyle: {
				color: 0xff0000,
				alpha: 1,
			},
		});
		graphics.strokeRect(1, 1, width - 1, height - 2);

		const dino = scene.add.image(300, 200, "DinoIdle").setScale(0.5).setFlipX(true);
		const sky1 = scene.add.image(0, 0, "Sky").setScale(0.25).setOrigin(0);
		const sky2 = scene.add.image(0, height / 2, "Sky").setScale(0.25).setOrigin(0).setFlipY(true);

		const text = scene.add.text(width / 2, height / 2, "RenderTexture").setOrigin(0.5);

		// Draw Objects
		this.draw(graphics);
		this.draw(dino);
		this.draw(sky1);
		this.draw(sky2);
		this.draw(text);

		// Remove Objects
		graphics.destroy();
		dino.destroy();
		sky1.destroy();
		sky2.destroy();
		text.destroy();

		scene.add.existing(this);
	}
}

// MainScene
class MainScene extends Phaser.Scene {
	constructor() {
		super({ key: "Home", });
	}

	preload() {
		this.load.image("Sky", Assets.Background.Skys.Sky);
		this.load.image("DinoIdle", Assets.Sprites.Dino.Idle[0]);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;

		this.rTexture = new RenderTexture(this);
		// this.rTexture.setOrigin(0.5);
	}

	update(time, delta) {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
		// this.rTexture.angle += 0.25;
	}
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.Auto,
	backgroundColor: "#000000",
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		}
	},
	scene: [MainScene],
};
const game = new Phaser.Game(config);
