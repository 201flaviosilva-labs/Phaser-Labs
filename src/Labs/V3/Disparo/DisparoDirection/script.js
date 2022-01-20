import Assets from "../../../../Assets.js";

const FPSsDiv = document.getElementById("FPSs");

const screen = {
	w: 800,
	h: 800,
};

class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Nave");

		this.speed = 200;

		this.time = 0;
	}

	fire(x, y, direction) {
		this.setPosition(x, y);

		this.setAngle(direction);
	}

	update() {
		this.time++;

		this.scene.physics.velocityFromRotation(this.rotation, this.speed, this.body.velocity);

		if (this.time > 150) this.destroy();
	}
}


class MainScene {
	preload() {
		this.load.image("Nave", Assets.Sprites.Triangulos.GreenRight);
	}

	create() {
		// Player
		this.player = this.physics.add.sprite(screen.w / 2, screen.h / 2, "Nave"); // Imagem está de 90º "errada"
		this.player.displayWidth = 64;
		this.player.displayHeight = 64;

		// Bullet
		this.bullets = this.physics.add.group({
			classType: Bullet,
			runChildUpdate: true,
		});

		this.input.on("pointermove", this.checkAngle, this);
		this.input.on("pointerup", this.fire, this);
		this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).on("down", this.fire, this);
	}

	checkAngle(pointer) {
		const angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
		this.player.setAngle(angle);
	}

	fire() {
		const bullet = this.bullets.get();
		if (bullet) {
			bullet.fire(this.player.x, this.player.y, this.player.angle);
		}
	}

	update() {
		FPSsDiv.innerHTML = game.loop.actualFps.toFixed(1);
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
			debug: true,
		}
	},
	scene: [MainScene],
}

const game = new Phaser.Game(config);
