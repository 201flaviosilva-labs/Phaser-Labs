import Assets from "../../../Assets.js";


export default class PreloadScene extends Phaser.Scene {
	constructor() {
		super({ key: "PreloadScene" });
	}

	preload() {
		console.log("PreloadScene");

		this.gConfigs = {
			width: 1000,
			height: 600,
		}

		this.size = {
			width: 350,
			height: 50,
			padding: {
				x: 10,
				y: 5
			},
			border: 4,
		};

		this.position = {
			x: (this.gConfigs.width - this.size.width) / 2,
			y: (this.gConfigs.height - this.size.height) / 2
		};

		this.file = null;

		const style = {
			font: '18px monospace',
			fill: '#ffffff'
		};

		this.progressBar = this.add.graphics();
		this.progressBox = this.add.graphics();

		this.percentText = this.add.text(this.gConfigs.width / 2, this.gConfigs.height / 2, "0 %", style);
		this.percentText.setOrigin(0.5, 0.5);

		this.progressBox.fillStyle(0xffffff, 0.2);
		this.progressBox.fillRoundedRect(
			this.position.x, this.position.y,
			this.size.width, this.size.height,
			this.size.border);


		this.load.image("DinoPreloadScene", Assets.Sprites.Dino.Idle[0]);
		for (let i = 0; i < 500; i++) {
			this.load.image("Dino" + i, Assets.Sprites.Dino.Idle[0]);
		}

		this.load.on('progress', (p) => this.updateBar(p));
		this.load.on("fileprogress", (f) => this.filePercent(f));
		this.load.on('complete', () => this.complete());
	}

	updateBar(percentage) {
		// console.log(percentage);

		this.progressBar.clear();
		this.progressBar.fillStyle(0x00ff00, 1);
		this.progressBar.stroke();
		this.progressBar.fillRoundedRect(
			this.position.x + this.size.padding.x, this.position.y + this.size.padding.y,
			(this.size.width * percentage) - (this.size.padding.x * 2), this.size.height - (this.size.padding.y * 2),
			this.size.border);

		this.percentText.setText("Load: " + Math.round(percentage * 100) + "% - " + this.file?.key);
	}

	filePercent(file) {
		this.file = file;
	}

	complete() {
		this.progressBar.destroy();
		this.progressBox.destroy();
		this.percentText.destroy();

		console.log("COMPLETE!");
		this.scene.start("ScenaA");
	}

}
