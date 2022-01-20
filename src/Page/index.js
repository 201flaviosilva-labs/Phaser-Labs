import { randomColor } from "../util.js";

// Dom


setInterval(randomTitlesColor, 2.5 * 1000);

randomTitlesColor()
function randomTitlesColor() {
  document.getElementById("title").style.color = randomColor();
  document.getElementById("assets").style.color = randomColor();
  document.getElementById("repLink").style.color = randomColor();
}
