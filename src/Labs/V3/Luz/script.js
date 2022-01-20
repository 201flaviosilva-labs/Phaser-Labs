import Assets from "../../../Assets.js";
import { randomNumber } from "../../../util.js";

const FPSsDiv = document.getElementById("FPSs");

const screen = {
	w: 800,
	h: 600,
	middleWidth: 0,
	middleHeight: 0,
};

screen.middleWidth = screen.w / 2;
screen.middleHeight = screen.h / 2;

class MainScene {
	init() {
	}

	preload() {
		{ // Bolas
			this.load.image("BAmarelo", Assets.Sprites.Bola.Amarelo);
			this.load.image("BAzul", Assets.Sprites.Bola.Azul);
			this.load.image("BAzulClaro", Assets.Sprites.Bola.AzulClaro);
			this.load.image("BBranca", Assets.Sprites.Bola.Branca);
			this.load.image("BRosa", Assets.Sprites.Bola.Rosa);
			this.load.image("BVerde", Assets.Sprites.Bola.Verde);
			this.load.image("BVermelha", Assets.Sprites.Bola.Vermelha);
		}

		{ // Quadrados
			this.load.image("QAmarelo", Assets.Sprites.Quadrados.Amarelo);
			this.load.image("QAzul", Assets.Sprites.Quadrados.Azul);
			this.load.image("QAzulClaro", Assets.Sprites.Quadrados.AzulClaro);
			this.load.image("QBranco", Assets.Sprites.Quadrados.Branco);
			this.load.image("QCinzento", Assets.Sprites.Quadrados.Cinzento);
			this.load.image("QPreto", Assets.Sprites.Quadrados.Preto);
			this.load.image("QRosa", Assets.Sprites.Quadrados.Rosa);
			this.load.image("QVerde", Assets.Sprites.Quadrados.Verde);
			this.load.image("QVermelho", Assets.Sprites.Quadrados.Vermelho);
		}
	}

	create() {
		const sprites = ["BAmarelo", "BAzul", "BAzulClaro", "BBranca", "BRosa", "BVerde", "BVermelha", "QAmarelo", "QAzul", "QAzulClaro", "QCinzento", "QPreto", "QRosa", "QVerde", "QVermelho"];

		// Sprites
		const rn = randomNumber(5, 25);
		for (let i = 0; i < rn; i++) {
			const texture = sprites[randomNumber(0, sprites.length)];
			this.physics.add.sprite(0, 0, texture).setCollideWorldBounds(true).setRandomPosition().setPipeline("Light2D");
		}

		// Text
		this.add.text(screen.middleWidth, 10, "Ganda Luz", { fontSize: 20, }).setPipeline("Light2D").setShadow(4, 4, "#ff0000", 0.2, true, true).setOrigin(0.5);

		// Lights
		this.lights.enable();
		// const abientColor = this.lights.setAmbientColor(0x00ff00);
		const light = this.lights.addLight(screen.middleWidth, screen.middleHeight, 100, 0xffffff, 1);
		const graphics = this.add.graphics({
			x: 0,
			y: 0,
			lineStyle: {
				width: 1,
				color: 0xffff00,
				alpha: 1
			},
			add: true,
		});
		graphics.strokeCircle(0, 0, 100);
		this.input.on("pointermove", pointer => {
			const { x, y } = pointer;
			light.setPosition(x, y);
			graphics.setPosition(x, y);
		});

		this.input.on("pointerdown", () => {
			if (this.lights.active) {
				this.lights.disable();
				graphics.setVisible(false);
			} else {
				this.lights.enable();
				graphics.setVisible(true);
			}
		});
	}

	update() {
		FPSsDiv.innerHTML = Number(game.loop.actualFps).toFixed(1);
	}
}

const config = {
	type: Phaser.WEBGL,
	width: screen.w,
	height: screen.h,
	background: "#fff",
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
}

const game = new Phaser.Game(config);
