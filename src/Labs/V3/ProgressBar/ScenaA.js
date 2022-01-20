import Assets from "../../../Assets.js";

import progressBar from './ProgressBar.js';

export default class ScenaA extends Phaser.Scene {
	constructor() {
		super({ key: "ScenaA" });
	}

	preload() {
		console.log("ScenaA");

		// const _this = this;
		// progressBar(_this);


		this.load.image("Dino", Assets.Sprites.Dino.Dead[6]);
		// for (let i = 0; i < 500; i++) {
		// 	this.load.image("Dino" + i, Assets.Sprites.Dino.Idle[0]);
		// }

	}

	create() {
		const Dino = this.add.image(400, 400, "Dino");
		this.scene.start("ScenaB");
	}

	update() {
		console.log("Ainda está aqui a Scene A");
	}
}
