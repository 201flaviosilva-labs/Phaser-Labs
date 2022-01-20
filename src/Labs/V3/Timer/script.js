// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/
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
		this.load.image("Player", Assets.Sprites.Bola.AzulClaro);
	}

	create() {
		// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/
		const { width, height, middleWidth, middleHeight } = world;

		{ // Looped timer
			let loops = 0;
			const labelLoop = this.add.text(10, 50, "Loop: " + loops);
			const timer = this.time.addEvent({
				delay: 1000,                // ms
				callback: () => {
					loops++;
					labelLoop.setText("Loop: " + loops);
				},
				callbackScope: this,
				loop: true,
			});
		}

		{ // Repeat timer
			let repeats = 0;
			const labelRepeat = this.add.text(150, 50, "Repeat (4): " + repeats);
			const timer = this.time.addEvent({
				delay: 1000,                // ms
				callback: () => {
					repeats++;
					labelRepeat.setText("Repeat (4): " + repeats);
				},
				repeat: 4,
			});
		}

		{ // One Shot timer
			let times = 0;
			const labelOneShot = this.add.text(300, 50, "One Shot: " + times);
			const callback = () => {
				times++;
				labelOneShot.setText("One Shot: " + times);
			};
			const timer = this.time.delayedCall(1000, callback, null, this);  // delay, callback, args, scope

		}

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
