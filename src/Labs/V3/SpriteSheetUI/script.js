console.clear();

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

let image = null;
let game = null;

// -- Game
class MainScene extends Phaser.Scene {
	constructor() {
		super({ key: "MainScene", });
	}

	preload() {
		this.load.spritesheet("SpriteSheet", URL.createObjectURL(image), {
			frameWidth: Number(document.getElementById("frameWidth").value),
			frameHeight: Number(document.getElementById("frameHeight").value),
		});
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;
		const player = this.add.sprite(middleWidth, middleHeight, "SpriteSheet");

		const animationConfig = {
			// Render
			key: "animation",
			frames: this.anims.generateFrameNumbers("SpriteSheet"),
			skipMissedFrames: true,

			// Time
			frameRate: Number(document.getElementById("frameRate").value),

			// Repeat
			repeat: document.getElementById("repeat").checked ? -1 : 0,
			repeatDelay: Number(document.getElementById("repeatDelay").value),
			yoyo: document.getElementById("yoyo").checked,
		};
		this.anims.create(animationConfig);

		player.play("animation");
	}

	update(time, delta) {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
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

document.getElementById("btnOK").addEventListener("click", () => {
	image = document.getElementById("inputFile").files[0];
	if (!image) {
		alert("Tens de adicionar uma imagem!");
		return;
	}
	console.log(URL.createObjectURL(image));
	document.getElementById("Modal").style.display = "none";

	game = new Phaser.Game(config);
});
