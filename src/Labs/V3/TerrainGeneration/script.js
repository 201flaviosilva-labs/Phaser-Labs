// Tutorial: https: //learn.yorkcs.com/2019/02/25/top-down-infinite-terrain-generation-with-phaser-3/
// -- Imports
import Assets from "../../../Assets.js";

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
// Tutorial: https: //learn.yorkcs.com/2019/02/25/top-down-infinite-terrain-generation-with-phaser-3/
class Chunk {
	constructor(scene, x, y) {
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.tiles = this.scene.add.group();
		this.isLoaded = false;
	}

	unload() {
		if (this.isLoaded) {
			this.tiles.clear(true, true);

			this.isLoaded = false;
		}
	}

	load() {
		if (this.isLoaded) return;

		for (let x = 0; x < this.scene.chunkSize; x++) {
			for (let y = 0; y < this.scene.chunkSize; y++) {

				const tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
				const tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);

				const perlinValue = noise.perlin2(tileX / 100, tileY / 100);

				let key = "";
				if (perlinValue < 0.2) key = "Water";
				else if (perlinValue >= 0.2 && perlinValue < 0.3) key = "Sand";
				else if (perlinValue >= 0.3) key = "Grass";

				const tile = new Tile(this.scene, tileX, tileY, key, perlinValue);

				this.tiles.add(tile);
			}
		}

		this.isLoaded = true;
	}
}

class Tile extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, key, value) {
		super(scene, x, y, key);
		this.scene = scene;
		this.setOrigin(0);
		// this.scene.add.text(this.x, this.y, value.toFixed(1)).setDepth(10);
		this.scene.add.existing(this);
	}
}

class MainScene extends Phaser.Scene {
	constructor() {
		console.clear();
		super({ key: "Home", });
	}

	init() {
		this.chunkSize = 16;
		this.tileSize = 8;
		this.cameraSpeed = 10;

		this.chunks = [];
	}

	preload() {
		const { Amarelo, AzulClaro, Verde, } = Assets.Sprites.Quadrados;
		this.load.image("Sand", Amarelo);
		this.load.image("Water", AzulClaro);
		this.load.image("Grass", Verde);
	}

	create() {
		this.cameras.main.setZoom(2);
		this.followPoint = new Phaser.Math.Vector2(
			this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
			this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5)
		);

		// Keyboard
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	}

	getChunk(x, y) {
		let chunk = null;
		for (let i = 0; i < this.chunks.length; i++) {
			if (this.chunks[i].x == x && this.chunks[i].y == y) chunk = this.chunks[i];
		}
		return chunk;
	}

	update() {
		let snappedChunkX = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
		let snappedChunkY = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));

		snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
		snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

		for (let x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
			for (let y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
				const existingChunk = this.getChunk(x, y);

				if (existingChunk == null) {
					const newChunk = new Chunk(this, x, y);
					this.chunks.push(newChunk);
				}
			}
		}

		for (let i = 0; i < this.chunks.length; i++) {
			const chunk = this.chunks[i];

			if (Phaser.Math.Distance.Between(
				snappedChunkX,
				snappedChunkY,
				chunk.x,
				chunk.y
			) < 3) {
				if (chunk !== null) chunk.load();
			}
			else {
				if (chunk !== null) chunk.unload();
			}
		}

		if (this.keyW.isDown) this.followPoint.y -= this.cameraSpeed;
		if (this.keyS.isDown) this.followPoint.y += this.cameraSpeed;
		if (this.keyA.isDown) this.followPoint.x -= this.cameraSpeed;
		if (this.keyD.isDown) this.followPoint.x += this.cameraSpeed;
		this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);

		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
	}
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.Auto,
	backgroundColor: "#000000",
	pixelArt: true,
	roundPixels: true,
	scale: {
		mode: Phaser.Scale.FIT,
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 0, },
			debug: true,
		}
	},
	scene: [MainScene],
};
const game = new Phaser.Game(config);
