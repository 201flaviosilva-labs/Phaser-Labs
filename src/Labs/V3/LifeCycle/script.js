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
		console.clear();

		// Main events
		this.countInit = 0;
		this.countPreload = 0;
		this.countCreate = 0;
		this.countUpdate = 0;

		// Others events
		this.countStep = 0;
		this.countPostStep = 0;
		this.countPreUpdate = 0;
		this.countPostUpdate = 0;
		this.countPreRender = 0;
		this.countRender = 0;
		this.countPostRender = 0;

		console.log("Constructor");
	}

	init() {
		this.countInit++;
		console.log("Init");
	}

	preload() {
		this.countPreload++;
		console.log("Preload");
	}

	create() {
		this.countCreate++;
		console.log("Create");

		// Main Events
		const x = 10;
		this.add.text(x, 20, "Init: " + this.countInit);
		this.add.text(x, 40, "Preload: " + this.countPreload);
		this.add.text(x, 60, "Create: " + this.countCreate);
		this.labelCountUpdate = this.add.text(x, 80, "Update: " + this.countUpdate);


		// Others
		this.labelCountPreUpdate = this.add.text(x, 100, "PreUpdate: " + this.countPreUpdate);
		this.labelCountPostUpdate = this.add.text(x, 120, "PostUpdate: " + this.countPostUpdate);
		this.labelCountStep = this.add.text(x, 140, "Step: " + this.countStep);
		this.labelCountPostStep = this.add.text(x, 160, "PostStep: " + this.countPostStep);
		this.labelCountPreRender = this.add.text(x, 180, "PreRender: " + this.countPreRender);
		this.labelCountRender = this.add.text(x, 200, "Render: " + this.countRender);
		this.labelCountPostRender = this.add.text(x, 220, "PostRender: " + this.countPostRender);

		this.events.on("preupdate", this.preUpdate, this);
		this.events.on("postupdate", this.postUpdate, this);
		this.game.events.on("step", this.step, this);
		this.game.events.on("poststep", this.postStep, this);
		this.game.events.on("prerender", this.preRender, this); // ou this.events.on("prerender", this.preRender, this);
		this.events.on("render", this.render, this);
		this.game.events.on("postrender", this.postRender, this);
	}

	step(time, delta) {
		this.countStep++;
		console.log("Step");
		this.labelCountStep.setText("Step: " + this.countStep);
	}

	postStep(time, delta) {
		this.countPostStep++;
		console.log("PostStep");
		this.labelCountPostStep.setText("PostStep: " + this.countPostStep);
	}

	preUpdate(time, delta) {
		this.countPreUpdate++;
		console.log("PreUpdate");
		this.labelCountPreUpdate.setText("PreUpdate: " + this.countPreUpdate);
	}

	update(time, delta) {
		this.countUpdate++;
		console.log("Update");
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
		this.labelCountUpdate.setText("Update: " + this.countUpdate);
	}

	postUpdate(time, delta) {
		this.countPostUpdate++;
		console.log("PostUpdate");
		this.labelCountPostUpdate.setText("PostUpdate: " + this.countPostUpdate);
	}

	preRender(renderer, time, delta) {
		this.countPreRender++;
		console.log("PreRender");
		this.labelCountPreRender.setText("PreRender: " + this.countPreRender);
	}

	render(renderer) {
		this.countRender++;
		console.log("Render");
		this.labelCountRender.setText("Render: " + this.countRender);
	}

	postRender(renderer, time, delta) {
		this.countPostRender++;
		console.log("PostRender");
		this.labelCountPostRender.setText("PostRender: " + this.countPostRender);
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
