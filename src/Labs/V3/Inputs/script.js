// -- Imports
import Assets from "../../../Assets.js";
import { randomNumber } from "../../../util.js";
import Inputs, { keyboard, mouse, gamepadInputs } from "./InputsSprites.js";

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

	init() {
		const globalOptions = {};
		this.notifier = new AWN(globalOptions);
	}

	preload() {
		const { png, frameWidth, frameHeight } = Assets.Sprites.KenneyInputPromptsPixel16.TileMapSheet512;
		// const { png, frameWidth, frameHeight } = Assets.Sprites.KenneyInputPromptsPixel16.TileMapSheet16;
		this.load.spritesheet("Inputs", png, { frameWidth, frameHeight });
	}

	create() {
		const { width, height, middleWidth, middleHeight } = world;
		this.inputSprites = this.add.sprite(middleWidth, middleHeight, "Inputs", 0);
		this.keyText = this.add.text(middleWidth, height - 20, "Clica numa tecla").setOrigin(0.5);

		this.anims.create({
			key: "inputsAnimation",
			frames: this.anims.generateFrameNumbers("Inputs"),
			frameRate: 10,
			repeat: -1,
			skipMissedFrames: true,
		});
		this.inputSprites.play("inputsAnimation");

		this.keyboardInputEvents();
		this.mouseInputEvents();
		this.gamePadInputEvents();
		this.othersInputEvents();
	}

	// ------------ Keyboard
	keyboardInputEvents() {
		this.input.keyboard.on("keydown", (event) => {
			this.inputSprites.stop();
			this.inputSprites.setAlpha(1);
			this.inputSprites.setTint(0xffffff);

			const eventKey = event.key;
			this.keyText.setText(`Code: ${event.code} | Key: ${eventKey} | Key Code: ${event.keyCode}`);

			for (let i = 0; i < keyboard.length; i++) {
				if (keyboard[i].key.toLowerCase() === eventKey.toLowerCase()) {
					this.inputSprites.setFrame(keyboard[i].frames[1]);
					return;
				}
			}

			this.inputSprites.setAlpha(0.5);
			this.inputSprites.setTint(0xff0000);
		});

		this.input.keyboard.on("keyup", (event) => {
			console.log(event.key);
			for (let i = 0; i < keyboard.length; i++) {
				if (keyboard[i].key === event.key) {
					this.inputSprites.setFrame(keyboard[i].frames[0]);
					return;
				}
			}
		});
	}

	// -------------- Pointer / Mouse
	mouseInputEvents() {
		this.input.on("pointerdown", (pointer) => {
			this.inputSprites.stop();
			this.inputSprites.setAlpha(1);
			this.inputSprites.setTint(0xffffff);

			for (let i = 0; i < mouse.length; i++) {
				if (mouse[i].button === pointer.button) {
					this.inputSprites.setFrame(mouse[i].frames[1]);
					return;
				}
			}

			this.inputSprites.setAlpha(0.5);
			this.inputSprites.setTint(0xff0000);
		});
		this.input.on("pointerup", (pointer) => {
			for (let i = 0; i < mouse.length; i++) {
				if (mouse[i].button === pointer.button) {
					this.inputSprites.setFrame(mouse[i].frames[0]);
					return;
				}
			}
		});
	}

	// -------------- GamePad
	gamePadInputEvents() {
		this.input.gamepad.on("down", (gamepad, button, value) => {
			this.inputSprites.stop();
			this.inputSprites.setAlpha(1);
			this.inputSprites.setTint(0xffffff);

			const btnIndex = button.index;
			console.log(btnIndex);

			for (let i = 0; i < gamepadInputs.length; i++) {
				if (gamepadInputs[i].index === btnIndex) {
					this.inputSprites.setFrame(gamepadInputs[i].frames[1]);
					return;
				}
			}

			this.inputSprites.setAlpha(0.5);
			this.inputSprites.setTint(0xff0000);
		});

		this.input.gamepad.on("up", (gamepad, button, value) => {
			const btnIndex = button.index;
			console.log(btnIndex);

			for (let i = 0; i < gamepadInputs.length; i++) {
				if (gamepadInputs[i].index === btnIndex) {
					this.inputSprites.setFrame(gamepadInputs[i].frames[0]);
					return;
				}
			}
		});
	}

	// -------------- Others
	othersInputEvents() {
		// ------------ Poiter / Mouse
		// this.input.on("pointerdown", (pointer, currentlyOver) => {
		// 	// console.log("Pointer Down", pointer, currentlyOver);
		// 	this.notifier.info("Pointer Down");
		// });

		this.input.on("pointerdownoutside", (pointer) => {
			// console.log("Pointer Down OutSide", pointer);
			this.notifier.warning("Pointer Down OutSide");
		});

		// this.input.on("pointerup", (pointer, currentlyOver) => {
		// 	// console.log("Pointer Up", pointer, currentlyOver);
		// 	this.notifier.info("Pointer Up");
		// });

		this.input.on("pointerupoutside", (pointer) => {
			// console.log("Pointer Up OutSide", pointer);
			this.notifier.warning("Pointer Up OutSide");
		});

		// this.input.on("pointermove", (pointer, currentlyOver) => {
		// console.log("Pointer Move", pointer, currentlyOver);
		// this.notifier.info("Pointer Move");
		// });

		this.input.on("pointerover", (pointer, justOver) => {
			// console.log("Pointer Over", pointer, justOver);
			this.notifier.success("Pointer Over");
		});

		this.input.on("pointerout", (pointer, justOut) => {
			// console.log("Pointer Out", pointer, justOut);
			this.notifier.warning("Pointer Out");
		});

		this.input.on("gameout", (timeStamp, domEvent) => {
			// console.log("Pointer Game Out", timeStamp, domEvent);
			this.notifier.warning("Pointer Game Out");
		});

		this.input.on("gameover", (timeStamp, domEvent) => {
			// console.log("Pointer Game Over", timeStamp, domEvent);
			this.notifier.success("Pointer Game Over");
		});

		// ------------ Gamepad
		this.input.gamepad.on("connected", (gamepad, event) => {
			console.log("Gamepad Conectado: ", gamepad, event);
			this.notifier.info("Gamepad Conectado");
		});

		this.input.gamepad.on("disconnected", (gamepad, event) => {
			// console.log("Gamepad Desconectado: ", gamepad, event);
			this.notifier.warning("Gamepad Desconectado");
		});
	}

	update(time, delta) {
		FPSDiv.innerHTML = game.loop.actualFps.toFixed(1);
	}
}

const config = {
	width: world.width,
	height: world.height,
	type: Phaser.Auto,
	backgroundColor: "#000000",
	input: {
		gamepad: true,
	},
	scale: {
		mode: Phaser.Scale.FIT,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		}
	},
	scene: [MainScene],
};
const game = new Phaser.Game(config);
