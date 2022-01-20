import Assets from "../../../Assets.js";

const FPSDiv = document.getElementById("FPS");
const screenWorld = {
	w: 1000,
	h: 200,
	middleWidth: 0,
	middleHeight: 0,
};

screenWorld.middleWidth = screenWorld.w / 2;
screenWorld.middleHeight = screenWorld.h / 2;

class MainScene {
	constructor() {
		this.ease = "Power0";

		const animationSelect = document.getElementById("aniamtion");
		const EaseName = document.getElementById("EaseName");
		animationSelect.addEventListener("change", () => {
			this.ease = animationSelect.value;
			EaseName.innerText = this.ease;
			this.startTween();
		});
	}

	preload() {
		this.load.image("Quadrado", Assets.Sprites.Quadrados.Amarelo);
	}

	create() {
		const { middleWidth, middleHeight } = screenWorld;
		this.player = this.add.image(middleWidth, middleHeight, "Quadrado");
		this.startTween();
	}

	startTween() {
		this.tweens.add({
			targets: this.player,
			ease: this.ease,
			duration: 2500,
			x: { from: 200, to: screenWorld.w - 200 },
			alpha: { from: 1, to: 0.75 },
			scale: { from: 1, to: 1.5 },
			angle: { from: 0, to: 360 },
		});
	}

	update() {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
	}
}

const config = {
	type: Phaser.AUTO,
	width: screenWorld.w,
	height: screenWorld.h,
	background: "#fff",
	scale: {
		mode: Phaser.Scale.FIT,
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 0 },
			// debug: true
		}
	},
	scene: [MainScene]
}

const game = new Phaser.Game(config);
