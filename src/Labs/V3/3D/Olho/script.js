// -- Imports
import Assets from "../../../../Assets.js";

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
	}

	preload() {
		this.load.obj("SphereBasic", Assets._3D.Geometria.Sphere.Basic.obj);
		this.load.image("Olho", Assets.Texture.Olho.Olho);
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;

		const rotateRate = 1;
		const panRate = 1;
		const zoomRate = 4;

		this.add.text(10, 10, "Espaço para Debug\nShift para Mover\nRoda para Zomm");

		const mesh = this.add.mesh(middleWidth, middleHeight, "Olho").addVerticesFromObj("SphereBasic", 0.1).panZ(7);
		mesh.modelRotation.y -= Phaser.Math.DegToRad(90);

		this.debug = this.add.graphics();

		// Controls
		this.input.on("pointermove", pointer => {
			if (!pointer.isDown) return;
			if (!pointer.event.shiftKey) {
				mesh.modelRotation.y += pointer.velocity.x * (rotateRate / 800);
				mesh.modelRotation.x += pointer.velocity.y * (rotateRate / 600);
			} else {
				mesh.panX(pointer.velocity.x * (panRate / 800));
				mesh.panY(pointer.velocity.y * (panRate / 600));
			}
		});

		this.input.on("wheel", (pointer, over, deltaX, deltaY, deltaZ) => mesh.panZ(deltaY * (zoomRate / 600)));
		this.input.keyboard.on("keydown-SPACE", () => mesh.debugCallback ? mesh.setDebug() : mesh.setDebug(this.debug));
	}

	update(time, delta) {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);

		this.debug.clear();
		this.debug.lineStyle(1, 0x00ff00);
	}
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.Auto,
	backgroundColor: "#000000",
	scale: {
		mode: Phaser.Scale.FIT,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		}
	},
	scene: [MainScene],
};
const game = new Phaser.Game(config);
