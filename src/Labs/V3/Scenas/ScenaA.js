import EventSystem, { EVENTS_NAMES } from "./EventSystem.js";
import ScenaC from "./ScenaC.js";

export default class ScenaA extends Phaser.Scene {
	constructor() {
		super({ key: "ScenaA", });
	}

	init() {
		console.log("Cena A");
	}

	create() {
		const x = 50;
		const y = 50;

		const graphics = this.add.graphics();
		graphics.fillStyle("0xff0000", 1);
		graphics.fillRect(x, y, 100, 100);

		this.add.text(x + 5, y + 5, "Scena A");

		this.scene.add("ScenaC", new ScenaC());

		// Emitting event to change scene B
		this.input.on("pointerup", (pointer) => {
			EventSystem.emit(EVENTS_NAMES.addScoreSceneB, 1);
		});
	}
}
