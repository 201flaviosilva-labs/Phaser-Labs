console.log("https://blog.ourcade.co/posts/2020/fire-bullets-from-facing-direction-phaser-3/");

import { randomNumber } from "../../../util.js";

const FPSsDiv = document.getElementById("FPSs");

const mundo = {
	w: 800,
	h: 800
};

class MainScene {
	create() {
		const x = this.scale.width * 0.5;
		const y = this.scale.height * 0.5;

		// red rectangle
		this.rect = this.add.rectangle(x, y, 100, 50, 0xff0000, 1);
		this.rect.angle = 45;


		// create Circle
		// // vector to edge of rectangle
		// const vec = this.physics.velocityFromAngle(this.rect.angle, 50);

		// // draw a circle to show the position
		// this.add.circle(x + vec.x, y + vec.y, 10, 0xffffff, 1);
	}

	update() {
		FPSsDiv.innerHTML = Number(game.loop.actualFps).toFixed(1);

		this.updateBalla();
		this.rect.angle += 1;
		this.rect.x += randomNumber(-1, 1);
	}

	updateBalla() {
		// vector as direction only by setting the speed param to 1
		const vec = this.physics.velocityFromAngle(this.rect.angle, 50);

		// manually set a 50px magnitude change in x and y (dx, dy)
		// const dx = vec.x * 50
		// const dy = vec.y * 50

		// draw a circle like before
		// this.add.circle(dx, dy, 10, 0xffffff, 1);

		// bullet velocity using a magnitude of 300
		// const vx = vec.x * 300;
		// const vy = vec.y * 300;

		// set the bullet's velocity with (vx, vy)


		// Minhas testes
		console.log(this.rect.angle, vec);
		// const x = this.scale.width * 0.5;
		// const y = this.scale.height * 0.5;

		const x = this.rect.x;
		const y = this.rect.y;

		const circle = this.add.circle(
			x + vec.x,
			y + vec.y,
			10, 0xffffff, 1);
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
