import Assets from "../../Assets.js";
import { randomColor, deleteAllChildDom } from "../../util.js";
import { links, basePath } from "./link.js";

// Dom
document.getElementById("title").style.color = randomColor();
document.getElementById("assets").style.color = randomColor();
const ulList = document.getElementById("ulList");

function main() {
  deleteAllChildDom(ulList);

  links.map((link, key) => {
    printLink(link, key);
  });

  printLabel();
}

function printLink(link, key) {
  const li = document.createElement("li");
  const gameName = document.createElement("h3");
  const WebLink = document.createElement("a");
  const WebImg = document.createElement("img");

  li.style.borderColor = "#7CAE7A";
  li.style.background = "grey";

  li.title = link.name;
  gameName.innerHTML = link.name;

  const divLinks = document.createElement("div");
  divLinks.classList.add("divLinks");

  if (link.web) {
    WebLink.href = basePath + link.web;
    WebImg.src = Assets.Icons.Web;

    WebLink.appendChild(WebImg);
    divLinks.appendChild(WebLink);
  }

  li.appendChild(gameName);
  li.appendChild(divLinks);
  ulList.appendChild(li);
}

function printLabel() {
  const li = document.createElement("li");
  const h4 = document.createElement("h4");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");

  h4.innerHTML = "Descição:";
  p1.innerHTML = "- Desenvolvimento;";
  p2.innerHTML = "* Mobile;";
  p3.innerHTML = "# Estragado;";

  li.style.borderColor = "#7CAE7A";
  li.style.background = "grey";

  li.appendChild(h4);
  li.appendChild(p1);
  li.appendChild(p2);
  li.appendChild(p3);
  ulList.appendChild(li);
}

main();
