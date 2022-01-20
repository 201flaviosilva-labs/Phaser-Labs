import ScenaC from "./ScenaC.js";

export default class ScenaA extends Phaser.Scene {
	constructor() {
		super({ key: "ScenaA" });
	}

	preload() {
		console.log("Cena A");
	}

	create() {
		const graphics = this.add.graphics();
		graphics.fillStyle("0xff0000", 1);

		const x = 50;
		const y = 50;

		graphics.fillRect(x, y, 100, 100);

		this.add.text(x + 5, y + 5, "Scena A");

		this.scene.add("ScenaC", new ScenaC());
	}
}
