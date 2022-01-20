import ScenaA from "./ScenaA.js";
import ScenaB from "./ScenaB.js";

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 800,
	background: "#fff",
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
			gravity: { x: 0, y: 0 }
		}
	},
	scene: [ScenaA, ScenaB],
}

const game = new Phaser.Game(config);
