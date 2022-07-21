export default class ScenaC extends Phaser.Scene {
	constructor() {
		super({ key: "ScenaC", active: true });
	}

	init() {
		console.log("Cena C");
	}

	create() {
		const graphics = this.add.graphics();
		graphics.fillStyle("0x0000ff", 1);

		const x = 350;
		const y = 50;

		graphics.fillRect(x, y, 100, 100);

		this.add.text(x + 5, y + 5, "Scena C");
	}
}
