import Assets from "../../../../Assets.js";
import Bala from "./Bala.js";
const FPSsDiv = document.getElementById("FPSs");

const screen = {
	w: 800,
	h: 800
};

class MainScene {
	preload() {
		this.load.image("Fire", Assets.Sprites.Bola.Branca);
		this.load.image("Nave", Assets.Sprites.Ship.Space._6);
	}

	create() {
		// Jogador
		this.player = this.physics.add.sprite(screen.w / 2, screen.h / 2, "Nave"); // Imagem está de 90º "errada"
		this.player.displayWidth = 64;
		this.player.displayHeight = 64;

		// Bullet
		this.bullets = this.physics.add.group({
			classType: Bala,
			// maxSize: 10, // Maximo de bullets
			runChildUpdate: true
		});

		this.input.on("pointermove", this.checkAngle, this);
		this.input.on("pointerdown", this.clickFire, this);
	}

	checkAngle(pointer) {
		const angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
		this.player.setAngle(angle + 90); // estou a dar 90 graus a mais porque a imagem está está com posição errada
	}

	clickFire() {
		const bullet = this.bullets.get();
		if (bullet) {
			bullet.fire(this.player.x, this.player.y, this.player.rotation - 1.56); // Estou a remover 1.56 de radianos para compensra o 90º dados na imagem
		}
	}

	update() {
		FPSsDiv.innerHTML = Number(game.loop.actualFps).toFixed(1);
	}
}

const config = {
	type: Phaser.AUTO,
	width: screen.w,
	height: screen.h,
	background: "#fff",
	physics: {
		default: "arcade",
		arcade: {
			debug: true
		}
	},
	scene: [MainScene],
}

const game = new Phaser.Game(config);
