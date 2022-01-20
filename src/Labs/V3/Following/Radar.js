import { radiansToDegrees, degreesToRadians } from "../../../util.js";

export default class Radar extends Phaser.GameObjects.Graphics {
	constructor(scene, radius = 300, numSlices = 10, color = 0xff0000) {
		super(scene);

		// Configs
		this.radius = radius;
		this.numSlices = numSlices;
		this.radBySlice = radiansToDegrees(Math.PI * 2 / this.numSlices);

		// Style
		this.setDefaultStyles({
			lineStyle: {
				width: 2,
				color: color,
				alpha: 1,
			},
			fillStyle: {
				color: color,
				alpha: 0.5,
			},
		});

		scene.add.existing(this);
	}

	draw(obj1, obj2) {
		this.clear();
		const distance = Phaser.Math.Distance.BetweenPoints(obj1, obj2);
		const obj2Angle = radiansToDegrees(Phaser.Math.Angle.Between(obj1.x, obj1.y, obj2.x, obj2.y));

		let a = 0;
		for (let i = 0; i < this.numSlices; i++) {
			const startAngle = i * this.radBySlice - 180;
			const endAngle = startAngle + this.radBySlice;

			this.beginPath();
			this.slice(0, 0, this.radius, degreesToRadians(startAngle), degreesToRadians(endAngle));

			if (distance < this.radius && (obj2Angle > startAngle && obj2Angle < endAngle)) {
				this.fillPath();
				a = startAngle + this.radBySlice / 2;
			}
			else this.strokePath();
		}

		return a;
	}
}
