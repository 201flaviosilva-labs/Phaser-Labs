// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/group/

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

class Spaceship extends Phaser.GameObjects.Sprite {
	constructor(scene, x = 0, y = 0, texture = "Player", frame = 0) {
		super(scene, x, y, texture, frame);

		this.setScale(0.25);
	}
}

// -- Game
class MainScene extends Phaser.Scene {
	constructor() {
		super({ key: "Home", });
	}

	preload() {
		// this.load.image("Player", Assets.Sprites.Ship.Space._1);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;

		const config = { // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/group/
			classType: Spaceship,
		};
		this.group = this.add.group(config);
		this.group.get(middleWidth, middleHeight, "Player");

		this.group.getChildren().map(sprite => {
			console.log(sprite);
		});
	}

	update(time, delta) {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1) + " - " + this.group.countActive();
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
