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

class Car extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, width, height, color) {
		super(scene, x, y, width, height, color);
		scene.add.existing(this);

		this.speed = 0;
		this.acceleration = 0.2;
		this.maxSpeed = 3;
		this.friction = 0.05;
		this.rotationSpeed = 0.03;

		const keyboard = {
			up1: "W",
			up2: "UP",
			down1: "S",
			down2: "DOWN",
			left1: "LEFT",
			left2: "A",
			right1: "RIGHT",
			right2: "D",
		};
		this.keys = this.scene.input.keyboard.addKeys(keyboard);
	}

	update() {
		const {
			keys,
			x, y,
			speed,
			acceleration,
			maxSpeed,
			friction,
			angle,
			rotation,
			rotationSpeed
		} = this;

		const move = this.move({
			keys: {
				forward: keys.up1.isDown || keys.up2.isDown,
				reverse: keys.down1.isDown || keys.down2.isDown,
				left: keys.left1.isDown || keys.left2.isDown,
				right: keys.right1.isDown || keys.right2.isDown,
			},
			x, y,
			speed,
			acceleration,
			maxSpeed,
			friction,
			rotation,
			rotationSpeed
		});

		const newX = Phaser.Math.Clamp(move.x, 0, world.width);
		const newY = Phaser.Math.Clamp(move.y, 0, world.height);

		this.setPosition(newX, newY);
		this.setRotation(move.rotation);
		this.speed = move.speed;
	}

	move({
		keys,
		x, y,
		speed,
		acceleration,
		maxSpeed,
		friction,
		rotation,
		rotationSpeed
	}) {
		// Add Speed
		if (keys.forward) speed += acceleration;
		else if (keys.reverse) speed -= acceleration;

		// Limit Speed
		const reverseForce = Number(keys.reverse) + 1; // if the forward and reverse are pressed at the same time
		if (speed > maxSpeed) speed = maxSpeed / reverseForce;
		else if (speed < -maxSpeed / 2) speed = -maxSpeed / 2;

		// Friction
		if (speed > 0) speed -= friction;
		else if (speed < 0) speed += friction;
		if (Math.abs(speed) < friction) speed = 0; // if the speed is less than the friction, set it to 0

		// Rotation
		if (speed) {
			const flip = speed > 0 ? 1 : -1; // Check if the forward or reverse
			if (keys.left) rotation -= rotationSpeed * flip;
			if (keys.right) rotation += rotationSpeed * flip;
		}

		// Update Position
		return {
			x: x + Math.sin(rotation) * speed,
			y: y - Math.cos(rotation) * speed,
			speed,
			rotation,
		}
	}
}

// -- Game
class MainScene extends Phaser.Scene {
	constructor() {
		super({ key: "Home", });
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;
		this.player = new Car(this, middleWidth, middleHeight, 32, 64, 0xffffff);
	}

	update(time, delta) {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
		this.player.update();
	}
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.Auto,
	backgroundColor: "#000000",
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		}
	},
	scene: [MainScene],
};
const game = new Phaser.Game(config);
