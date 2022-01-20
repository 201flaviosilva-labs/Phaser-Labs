// JS Utils
export const randomColor = () => "#" + (Math.random() * 0xFFFFFF << 0).toString(16);

// Random Number
export const randomNumber = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1) + min);
export const randomNumberDecimal = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1) + min) / 100;

// Radians and Degrees
export const radiansToDegrees = r => r * (180 / Math.PI);
export const degreesToRadians = d => d * (Math.PI / 180);

// Sort Numbers
export const sortAscending = arr => arr.sort((a, b) => a - b);
export const sortDescending = arr => arr.sort((a, b) => b - a);

export const deleteAllChildDom = (domElement) => {
	while (domElement.hasChildNodes()) {
		domElement.removeChild(domElement.firstChild);
	}
}
