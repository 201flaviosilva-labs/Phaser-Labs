import Assets from "../../../Assets.js";

const FPSsDiv = document.getElementById("FPSs");

const screen = {
	w: 1600,
	h: 1200,
	middleWidth: 0,
	middleHeight: 0,
};

screen.middleWidth = screen.w / 2;
screen.middleHeight = screen.h / 2;

class MainScene {
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

		{ // Triangulos
			this.load.image("TBlue", Assets.Sprites.Triangulos.Blue);
			this.load.image("TGreen", Assets.Sprites.Triangulos.Green);
			this.load.image("TWhite", Assets.Sprites.Triangulos.White);
			this.load.image("TRed", Assets.Sprites.Triangulos.Red);
		}

		{// Flares
			this.load.atlas("Flares", Assets.PhaserLabs.particles.flares.png, Assets.PhaserLabs.particles.flares.json);
		}
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.explodeOnClick();
		this.steppedAngle();
		this.YPositionRange();
		this.YPositionRange();
		this.moveToParticle();
		this.mouseParticle();
	}

	explodeOnClick() {
		this.emitterClick = this.add.particles("TBlue").createEmitter({
			x: 400,
			y: 300,
			speed: { min: -800, max: 800 },
			angle: { min: 0, max: 360 },
			scale: { start: 1, end: 0 },
			frequency: -1,
			quantity: 1000,
			blendMode: "SCREEN",
			lifespan: 500,
			gravityY: 800,
		});

		this.input.on("pointerdown", pointer => {
			const { x, y } = pointer;
			this.emitterClick.setPosition(x, y);
			this.emitterClick.explode();
		});
	}

	steppedAngle() {
		const particles = this.add.particles("BRosa");
		particles.createEmitter({
			x: screen.middleWidth, y: screen.middleHeight,
			lifespan: 1000,
			angle: { start: 0, end: 360, steps: 360 },
			speed: 200,
			quantity: 32,
			scale: { start: 0.4, end: 0 },
			blendMode: 'ADD',
		});
	}

	YPositionRange() {
		const particles = this.add.particles("QAzulClaro");

		particles.createEmitter({
			x: 0,
			y: { min: 0, max: screen.h },
			lifespan: 2000,
			speedX: { min: 100, max: 600 },
			scale: { start: 0.1, end: 0 },
			quantity: 4,
			blendMode: "ADD",
		});
	}

	moveToParticle() {
		const particles = this.add.particles("Flares");
		const rect = new Phaser.Geom.Rectangle(0, 0, screen.w, 100);

		const emitter = particles.createEmitter({
			frame: { frames: ["red", "green", "blue"], cycle: true, quantity: 2 },
			x: 0,
			y: -100,
			moveToX: screen.middleWidth,
			moveToY: 1200,
			lifespan: 1000,
			alpha: { min: 0.75, max: 0 },
			scale: 0.5,
			quantity: 4,
			_frequency: 20,
			blendMode: "ADD",
			emitZone: { source: rect },
		});
	}

	mouseParticle() {
		const { middleWidth, middleHeight, } = screen;
		const spark0 = this.add.particles("BBranca").createEmitter({
			x: middleWidth,
			y: middleHeight,
			speed: { min: -500, max: 500 },
			angle: { min: -120, max: -60 },
			scale: { min: 0.5, max: 0 },
			alpha: { min: 1, max: 0 },
			blendMode: "SCREEN",
			gravityY: 500,
			lifespan: 5000,
		});
		spark0.reserve(1000);

		const spark1 = this.add.particles("BVermelha").createEmitter({
			x: middleWidth,
			y: middleHeight,
			speed: { min: -100, max: 100 },
			angle: { min: -120, max: -60 },
			scale: { start: 0, end: 0.4 },
			alpha: { start: 1, end: 0, ease: "Expo.easeIn" },
			blendMode: "SCREEN",
			gravityY: 500,
			lifespan: 1000,
		});
		spark1.reserve(1000);

		const fire = this.add.particles("BAmarelo").createEmitter({
			x: middleWidth,
			y: middleHeight,
			speed: { min: 100, max: 200 },
			angle: { min: -85, max: -95 },
			scale: { start: 0, end: 1, ease: "Back.easeOut" },
			alpha: { start: 1, end: 0, ease: "Quart.easeOut" },
			blendMode: "SCREEN",
			lifespan: 1000,
		});
		fire.reserve(1000);

		const whiteSmoke = this.add.particles("BVerde").createEmitter({
			x: middleWidth,
			y: middleHeight,
			speed: { min: 20, max: 100 },
			angle: { min: 0, max: 360 },
			scale: { start: 1, end: 0 },
			alpha: { start: 0, end: 0.5 },
			lifespan: 2000,
			// active: false,
		});
		whiteSmoke.reserve(1000);

		fire.onParticleDeath(particle => {
			whiteSmoke.setPosition(particle.x, particle.y);
			whiteSmoke.emitParticle();
		});

		this.input.on("pointermove", pointer => {
			const { x, y } = pointer;
			spark0.setPosition(x, y);
			spark1.setPosition(x, y);
			fire.setPosition(x, y);
		});
	}

	update() {
		FPSsDiv.innerHTML = Number(game.loop.actualFps).toFixed(1);

		if (this.cursors.space.isDown) {
			const { x, y } = this.input;
			this.emitterClick.setPosition(x, y);
			this.emitterClick.explode();
		}
	}
}

const config = {
	type: Phaser.AUTO,
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
	scene: [MainScene]
}

const game = new Phaser.Game(config);
