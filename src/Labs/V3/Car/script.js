import Assets from "../../../Assets.js";

const FPSsDiv = document.getElementById("FPSs");

const screen = {
	w: 800,
	h: 600,
};

class MainScene {
	init() {
		this.gamePaused = false;
		this.carRotation = 0;
		this.carSpeed = 0;
	}

	preload() {
		this.load.image("Nave", Assets.Sprites.Ship.Space._6Dir);
	}

	create() {
		this.player = this.physics.add.sprite(screen.w / 2, screen.h / 2, "Nave");
		this.player.displayWidth = 64;
		this.player.displayHeight = 64;
		this.player.setMaxVelocity(250);

		// Friction
		// this.player.setDrag(0.3);
		// this.player.setDamping(true); // Ativa o Drag

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		FPSsDiv.innerHTML = game.loop.actualFps.toFixed(1);

		if (this.gamePaused) return;

		// Roda independetemente da velocidade
		// if (this.cursors.up.isDown) this.physics.velocityFromRotation(this.player.rotation, 100, this.player.body.velocity);
		// else this.player.setAcceleration(0);

		// if (this.player.body.speed > 5) {
		// 	if (this.cursors.left.isDown) this.player.setAngularVelocity(-100);
		// 	else if (this.cursors.right.isDown) this.player.setAngularVelocity(100);
		// 	else this.player.setAngularVelocity(0);
		// } else {
		// 	this.player.setAngularVelocity(0);
		// }


		// // Movimentação como um "carro"
		if (this.cursors.up.isDown && this.carSpeed < 250) this.carSpeed += 8;
		else { if (this.carSpeed > 0) this.carSpeed -= 4; }

		if (this.cursors.down.isDown && this.carSpeed > -250) this.carSpeed -= 8;
		else { if (this.carSpeed < 0) this.carSpeed += 4; }

		if (this.player.body.speed > 0) {
			if (this.cursors.left.isDown) this.player.angle -= 4;
			else if (this.cursors.right.isDown) this.player.angle += 4;
		}

		this.physics.velocityFromRotation(this.player.rotation, this.carSpeed, this.player.body.velocity);

		// Border Collision
		this.checkBordersCollision(this.player);
	}

	checkBordersCollision(obj) {
		if (obj.x > screen.w) obj.x = 0;
		if (obj.x < 0) obj.x = screen.w;

		if (obj.y > screen.h) obj.y = 0;
		if (obj.y < 0) obj.y = screen.h;
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
	scene: [MainScene]
}

const game = new Phaser.Game(config);
