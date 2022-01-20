import PreloadScene from "./PreloadScene.js";
import ScenaA from "./ScenaA.js";
import ScenaB from "./ScenaB.js";

const config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 600,
	background: "#fff",
	scene: [PreloadScene, ScenaA, ScenaB]
}

const game = new Phaser.Game(config);
