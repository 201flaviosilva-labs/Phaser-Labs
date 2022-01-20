import Assets from "../../../Assets.js";

import progressBar from './ProgressBar.js';

export default class ScenaB extends Phaser.Scene {
	constructor() {
		super({ key: "ScenaB" });
	}

	preload() {
		console.log("ScenaB");

		// const _this = this;
		// progressBar(_this);


		this.load.image("DinoJump", Assets.Sprites.Dino.Jump[8]);
		// for (let i = 0; i < 500; i++) {
		// 	this.load.image("Dino" + i, Assets.Sprites.Dino.Idle[0]);
		// }

	}

	create() {
		const DinoPreload = this.add.image(100, 100, "DinoPreloadScene").setScale(0.25);
		const DinoJump = this.add.image(400, 400, "DinoJump");
	}
}
