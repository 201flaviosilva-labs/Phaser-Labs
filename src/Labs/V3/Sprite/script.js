import Assets from "../../../Assets.js";
import { randomNumber, randomNumberDecimal } from "../../../util.js";

const FPSsDiv = document.getElementById("FPSs");
const world = {
	width: 500,
	height: 500,
};

class Scene {
	preload() {
		this.load.image("Master", Assets.Sprites.Monstro.Master);
	}

	create() {
		this.lastMagic = 5000;
		this.master = this.physics.add.sprite(world.width / 2, world.height / 2, "Master");
		this.master.setCollideWorldBounds(true);

		this.master.setScale(randomNumber(1, 4));
		this.master.flipY = true;
		this.master.flipX = true;

		console.log(this.master);
	}

	update(time) {
		FPSsDiv.innerHTML = Number(game.loop.actualFps).toFixed(2);

		// this.master.rotation += 0.01;
		this.master.angle++;



		if (this.lastMagic < time) {
			randomNumber(0, 1) && (this.master.flipY = !this.master.flipY);
			randomNumber(0, 1) && (this.master.flipX = !this.master.flipX);

			const scale = randomNumber(1, 4);
			this.master.setScale(scale);

			this.lastMagic = time + 5000;

			// const newX = randomNumber(0, world.width);
			// const newY = randomNumber(0, world.height);
			// this.master.setPosition(newX, newY);

			// Physics
			const gravityX = randomNumber(-100, 100);
			const gravityY = randomNumber(-100, 100);
			this.master.setGravity(gravityX, gravityY);
			const newBounce = randomNumber(0, 1) + randomNumberDecimal(0, 100);
			this.master.setBounce(newBounce);
		}
	}
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.Auto,
	backgroundColor: "#00ffff",
	scale: {
		mode: Phaser.Scale.FIT,
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
		}
	},
	scene: [Scene]
};
const game = new Phaser.Game(config);
