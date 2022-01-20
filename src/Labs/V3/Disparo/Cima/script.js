import Assets from "../../../../Assets.js";

import Bullet from "./Bullet.js";
const FPSsDiv = document.getElementById("FPSs");

const mundo = {
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
		this.player = this.physics.add.sprite(mundo.w / 2, mundo.h - 40, "Nave");
		this.player.displayWidth = 64;
		this.player.displayHeight = 64;
		this.player.setMaxVelocity(500);
		this.player.speed = 2;

		// Bullets
		this.bullets = this.add.group({
			classType: Bullet,
			// maxSize: 10, // Maximo de bullets
			runChildUpdate: true
		});
		this.lastFired = 0;

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update(time) {
		FPSsDiv.innerHTML = Number(game.loop.actualFps).toFixed(2);

		if (this.cursors.left.isDown) this.player.x -= this.player.speed;
		else if (this.cursors.right.isDown) this.player.x += this.player.speed;

		if (this.cursors.up.isDown || this.cursors.space.isDown) {
			const bullet = this.bullets.get();
			if (bullet) {
				bullet.fire(this.player.x, this.player.y);
				this.lastFired = time + 50;
			}
		}

		// Border Colision
		this.checkBordersColision(this.player);
	}

	checkBordersColision(obj) {
		if (obj.x > mundo.w) obj.x = 0;
		if (obj.x < 0) obj.x = mundo.w;
	}
}

const config = {
	type: Phaser.AUTO,
	width: mundo.w,
	height: mundo.h,
	background: "#fff",
	physics: {
		default: "arcade",
		arcade: {
			debug: true
		}
	},
	scene: [MainScene]
}

const game = new Phaser.Game(config);
