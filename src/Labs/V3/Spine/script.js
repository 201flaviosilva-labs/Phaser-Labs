// -- Imports
import Assets from "../../../Assets.js";
import "../_Lib/SpinePlugin.js";
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
		const configMainScene = { key: "Home" };

		super(configMainScene);
	}

	preload() {
		// https://photonstorm.github.io/phaser3-docs/SpinePlugin.html#add__anchor

		this.load.setPath("https://labs.phaser.io/assets/spine/3.8/demos/");
		this.load.spine("spines", "demos.json", ["atlas1.atlas", "atlas2.atlas"], true);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;

		// x, y, sprite (key), animation, repeat
		const boy1 = this.add.spine(middleWidth, middleHeight + 150, "spines.spineboy", "idle", true).setScale(0.5).setInteractive();
		this.input.enableDebug(boy1, 0xff00ff);
		let animationIndex = 0;
		const animations = boy1.getAnimationList();
		boy1.on("pointerdown", () => {
			animationIndex = (animationIndex + 1) % animations.length;
			boy1.play(animations[animationIndex], true);
		});

		const alien = this.add.spine(200, 600, "spines.alien", "death", false).setScale(0.5); // No Repeat
		const dragon = this.add.spine(150, 200, "spines.dragon", "flying", true).setScale(0.4);
		dragon.drawDebug = true;

		const boy2 = this.add.spine(700, 200, "spines.spineboy", "run", true).setScale(0.25); //  From atlas1
		const armorgirl = this.add.spine(700, 600, "spines.armorgirl", "animation", true).setScale(0.1); //  From atlas2
	}

	update() {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
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
		},
	},
	scene: [MainScene],
	plugins: {
		scene: [
			{
				key: "SpinePlugin",
				plugin: window.SpinePlugin,
				mapping: "spine",
			},
		],
	},
};
const game = new Phaser.Game(config);
