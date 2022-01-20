import Assets from "../../../Assets.js";

const world = {
	width: 500,
	height: 500,
};

class Scene {
	preload() {
		this.load.spritesheet("Dead", Assets.Sprites.Dino.Sheet.dead, { frameWidth: 364, frameHeight: 234, });
		this.load.spritesheet("Idle", Assets.Sprites.Dino.Sheet.idle, { frameWidth: 364, frameHeight: 388, });
		this.load.spritesheet("Jump", Assets.Sprites.Dino.Sheet.jump, { frameWidth: 409, frameHeight: 440, });
		this.load.spritesheet("Run", Assets.Sprites.Dino.Sheet.run, { frameWidth: 417, frameHeight: 417, });
		this.load.spritesheet("Walk", Assets.Sprites.Dino.Sheet.walk, { frameWidth: 370, frameHeight: 437, });
	}

	create() {
		this.player = this.add.sprite(world.width / 2, world.height / 2);

		// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/animation/
		// https://phaser.io/examples/v3/view/animation/create-animation-from-sprite-sheet
		const animations = ["DeadAnim", "IdleAnim", "JumpAnim", "RunAnim", "WalkAnim",];
		let currentTexture = 1;
		this.anims.create({
			key: animations[0],
			frames: this.anims.generateFrameNumbers("Dead"),
			frameRate: 24,
			repeat: -1,
			repeatDelay: 500,
		});

		this.anims.create({
			key: animations[1],
			frames: this.anims.generateFrameNumbers("Idle"),
			frameRate: 24,
			repeat: -1,
		});

		this.anims.create({
			key: animations[2],
			frames: this.anims.generateFrameNumbers("Jump"),
			frameRate: 20,
			repeat: -1,
			repeatDelay: 500,
			yoyo: true,
		});

		this.anims.create({
			key: animations[3],
			frames: this.anims.generateFrameNumbers("Run"),
			frameRate: 20,
			repeat: -1,
		});

		this.anims.create({
			key: animations[4],
			frames: this.anims.generateFrameNumbers("Walk"),
			frameRate: 24,
			repeat: -1,
		});

		this.player.play(animations[1]);

		this.input.on("pointerup", () => {
			currentTexture++;
			if (currentTexture >= animations.length) currentTexture = 0;
			console.log(animations[currentTexture]);
			this.player.play(animations[currentTexture]);
		});
	}
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.Auto,
	scale: {
		mode: Phaser.Scale.FIT,
	},
	backgroundColor: "#000000",
	scene: [Scene],
};
const game = new Phaser.Game(config);
