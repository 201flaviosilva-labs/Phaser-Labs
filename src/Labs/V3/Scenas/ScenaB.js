export default class ScenaB extends Phaser.Scene {
	constructor() {
		super({ key: "ScenaB", active: true });
	}

	preload() {
		console.log("Cena B");
	}

	create() {
		const graphics = this.add.graphics();
		graphics.fillStyle("0x00ff00", 1);

		const x = 200;
		const y = 50;

		graphics.fillRect(x, y, 100, 100);

		this.add.text(x + 5, y + 5, "Scena B");
	}
}
