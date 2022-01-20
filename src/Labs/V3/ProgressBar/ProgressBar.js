export default function progressBar(_this) {
	const GConfigs = {
		width: 1000,
		height: 600,
	}

	const size = {
		width: 350,
		height: 50,
		padding: {
			x: 10,
			y: 5
		},
		border: 4,
	};

	const position = {
		x: (GConfigs.width - size.width) / 2,
		y: (GConfigs.height - size.height) / 2
	};

	const style = {
		font: '18px monospace',
		fill: '#ffffff'
	};

	const progressBar = _this.add.graphics();
	const progressBox = _this.add.graphics();

	const percentText = _this.add.text(GConfigs.width / 2, GConfigs.height / 2, "0%", style);
	percentText.setOrigin(0.5, 0.5);

	progressBox.fillStyle(0xffffff, 0.2);
	progressBox.fillRoundedRect(
		position.x, position.y,
		size.width, size.height,
		size.border);

	let file = null;
	_this.load.on("fileprogress", f => {
		file = f;
	});

	_this.load.on("progress", value => {
		progressBar.clear();
		progressBar.fillStyle(0x00ff00, 1);
		progressBar.stroke()
		progressBar.fillRoundedRect(
			position.x + size.padding.x, position.y + size.padding.y,
			(size.width * value) - (size.padding.x * 2), size.height - (size.padding.y * 2),
			size.border);

		percentText.setText("Load: " + Math.round(value * 100) + "% - " + file?.key);
	});

	_this.load.on("complete", () => {
		progressBar.destroy();
		progressBox.destroy();
		percentText.destroy();
	});
}
