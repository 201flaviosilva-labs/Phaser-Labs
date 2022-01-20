// -- Imports
import Assets from "../../../Assets.js";
import { randomNumber, radiansToDegrees, degreesToRadians } from "../../../util.js";

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

// -- Game
class MainScene extends Phaser.Scene {
	constructor() {
		super({ key: "Home", });
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;
		const graphics = this.add.graphics({
			x: 50,
			y: 50,
			add: true,

			lineStyle: {
				width: 2,
				color: 0xff0000,
				alpha: 1,
			},
			fillStyle: {
				color: 0x00ff00,
				alpha: 1,
			},
		});

		graphics.clear();

		// Rectangle
		graphics.fillRoundedRect(10, 10, width - 120, height - 120, { tl: 5, tr: 10, bl: 20, br: 40, }); // x, y, width, height, radius
		graphics.strokeRectShape({ x: 10, y: 10, width: width - 120, height: height - 120 });

		// Triangle
		graphics.fillStyle(0xffff00, 1); // color, alpha
		graphics.fillTriangle(50, 0, 150, 0, 100, 100); // x1, y1, x2, y2, x3, y3

		// Point
		graphics.fillPoint(300, 300, 5); // x, y, size

		// Line
		graphics.lineBetween(400, 300, 200, 350); // x1, y1, x2, y2

		// Circle
		graphics.fillCircle(middleWidth, middleHeight - 100, 50); // x, y, radius

		// Ellipse
		graphics.fillEllipse(50, 200, 50, 50, 8); // x, y, width, height, smoothness

		// Arc
		graphics.lineStyle(2, 0x000fff, 1);
		graphics.beginPath();
		graphics.arc(450, 200, 100, 0, degreesToRadians(120), false); // x, y, radius, startAngle, endAngle, anticlockwise, overshoot
		graphics.strokePath();

		// Pie-chart slice
		graphics.beginPath();
		graphics.slice(0, 0, 50, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45)); // x, y, radius, startAngle, endAngle, anticlockwise, overshoot
		graphics.strokePath();
	}
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.Auto,
	backgroundColor: "#000000",
	scene: [MainScene],
};
const game = new Phaser.Game(config);
