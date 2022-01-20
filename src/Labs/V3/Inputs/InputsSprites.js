// {
// 	key: "KeyName", // Key name
// 	frames: [0, 1], // 0 - Key up Frame, 1 - Key Down Frame
// },

export const mouse = [
	{ button: 0, frames: [76, 77], }, // Left
	{ button: 1, frames: [76, 79], }, // Wheel
	{ button: 2, frames: [76, 78], }, // Right
];

export const keyboard = [
	// Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
	{ key: "Escape", frames: [17, 289], },
	{ key: "F1", frames: [18, 290], },
	{ key: "F2", frames: [19, 291], },
	{ key: "F3", frames: [20, 292], },
	{ key: "F4", frames: [21, 293], },
	{ key: "F5", frames: [22, 294], },
	{ key: "F6", frames: [23, 295], },
	{ key: "F7", frames: [24, 296], },
	{ key: "F8", frames: [25, 297], },
	{ key: "F9", frames: [26, 298], },
	{ key: "F10", frames: [27, 299], },
	{ key: "F11", frames: [28, 300], },
	{ key: "F12", frames: [29, 301], },

	// ! @ #
	{ key: "!", frames: [31, 303], },
	{ key: "@", frames: [32, 304], },
	{ key: "#", frames: [33, 305], },

	// 1 2 3 4 5 6 7 8 9 0
	{ key: "1", frames: [51, 323], },
	{ key: "2", frames: [52, 324], },
	{ key: "3", frames: [53, 325], },
	{ key: "4", frames: [54, 326], },
	{ key: "5", frames: [55, 327], },
	{ key: "6", frames: [56, 328], },
	{ key: "7", frames: [57, 329], },
	{ key: "8", frames: [58, 330], },
	{ key: "9", frames: [59, 331], },
	{ key: "0", frames: [60, 332], },

	// - + = _ * Shift
	{ key: "-", frames: [61, 333], },
	{ key: "+", frames: [62, 334], },
	{ key: "=", frames: [63, 335], },
	{ key: "_", frames: [64, 336], },
	{ key: "*", frames: [133, 405], },
	{ key: "Shift", frames: [166, 438], },

	// Q W E R T Y U I O P
	{ key: "q", frames: [85, 357], },
	{ key: "w", frames: [86, 358], },
	{ key: "e", frames: [87, 359], },
	{ key: "r", frames: [88, 360], },
	{ key: "t", frames: [89, 361], },
	{ key: "y", frames: [90, 362], },
	{ key: "u", frames: [91, 363], },
	{ key: "i", frames: [92, 364], },
	{ key: "o", frames: [93, 365], },
	{ key: "p", frames: [94, 366], },

	// A S D F G H J K L
	{ key: "a", frames: [120, 392], },
	{ key: "s", frames: [121, 393], },
	{ key: "d", frames: [122, 394], },
	{ key: "f", frames: [123, 395], },
	{ key: "g", frames: [124, 396], },
	{ key: "h", frames: [125, 397], },
	{ key: "j", frames: [126, 398], },
	{ key: "k", frames: [127, 399], },
	{ key: "l", frames: [128, 400], },

	// Z X C V B N M
	{ key: "z", frames: [155, 427], },
	{ key: "x", frames: [156, 428], },
	{ key: "c", frames: [157, 429], },
	{ key: "v", frames: [158, 430], },
	{ key: "b", frames: [159, 431], },
	{ key: "n", frames: [160, 432], },
	{ key: "m", frames: [161, 433], },

	// Arrows
	{ key: "ArrowUp", frames: [166, 438], },
	{ key: "ArrowDown", frames: [168, 440], },
	{ key: "ArrowRight", frames: [167, 439], },
	{ key: "ArrowLeft", frames: [169, 441], },

	// [ ] { } \
	{ key: "[", frames: [95, 367], },
	{ key: "]", frames: [96, 368], },
	{ key: "{", frames: [97, 369], },
	{ key: "}", frames: [98, 370], },
	{ key: "\\", frames: [99, 371], },

	// ' " : ;
	{ key: "'", frames: [129, 401], },
	{ key: "\"", frames: [130, 402], },
	{ key: ":", frames: [131, 403], },
	{ key: ";", frames: [132, 404], },

	// Space Meta Control
	{ key: " ", frames: [153, 425], },
	{ key: "Meta", frames: [154, 426], },
	{ key: "Control", frames: [200, 472], },

	// < > ? /
	{ key: "<", frames: [162, 434], },
	{ key: ">", frames: [163, 435], },
	{ key: "?", frames: [164, 436], },
	{ key: "/", frames: [165, 437], },

	// . $ % ^ € ( )
	{ key: ".", frames: [197, 469], },
	{ key: "$", frames: [198, 470], },
	{ key: "%", frames: [199, 471], },
	{ key: "^", frames: [200, 472], },
	{ key: "€", frames: [201, 473], },
	{ key: "(", frames: [202, 474], },
	{ key: ")", frames: [203, 475], },

	// ,
	{ key: ",", frames: [231, 503], },
];

export const gamepadInputs = [
	{ index: 0, frames: [483, 312], }, // X / A
	{ index: 1, frames: [483, 311], }, // Circle / B
	{ index: 2, frames: [483, 313], }, // Square / X
	{ index: 3, frames: [483, 310], }, // Triangle / Y

	{ index: 13, frames: [34, 37], }, // Down
	{ index: 15, frames: [34, 36], }, // Right
	{ index: 12, frames: [34, 35], }, // Top
	{ index: 14, frames: [34, 38], }, // Left

	{ index: 4, frames: [631, 665], }, // L1
	{ index: 5, frames: [632, 666], }, // R1
	{ index: 6, frames: [633, 667], }, // L2
	{ index: 7, frames: [634, 668], }, // R2

	{ index: 10, frames: [220, 254], }, // L3
	{ index: 11, frames: [288, 322], }, // R3
];

const inputs = [...keyboard, ...mouse, ...gamepadInputs];
export default inputs;
