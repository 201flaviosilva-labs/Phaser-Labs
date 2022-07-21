import EventSystem, { EVENTS_NAMES } from "./EventSystem.js";
export default class ScenaB extends Phaser.Scene {
	constructor() {
		super({ key: "ScenaB", active: true });
	}

	init() {
		console.log("Cena B");
		this.score = 0;
	}

	create() {
		const x = 200;
		const y = 50;

		const graphics = this.add.graphics();
		graphics.fillStyle("0x00ff00", 1);
		graphics.fillRect(x, y, 100, 100);

		this.add.text(x + 5, y + 5, "Scena B");

		const scoreLabel = this.add.text(x + 50, y + 50, "Click in scene A").setOrigin(0.5);
		EventSystem.on(EVENTS_NAMES.addScoreSceneB, (score) => {
			this.score += score;
			scoreLabel.setText(this.score);
		})
	}
}
