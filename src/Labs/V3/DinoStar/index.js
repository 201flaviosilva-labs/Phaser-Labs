import Assets from "../../../Assets.js";
import { randomNumber } from "../../../util.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
const game = new Phaser.Game(config);

let player;
let groundLayer;
let tempoText, pontosText;
let tempo = 60, pontos = 0;
let cursors;
let star;
const style = { font: "bold 32px monospace", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

function preload() {
  this.load.image("BG", Assets.Background.Skys.Sky);
  this.load.image("Dino", Assets.Sprites.Dino.Idle[0]);
  this.load.image("Plataforma", Assets.Sprites.Platforms.Platform);
  this.load.image("Star", Assets.Sprites.Star.Star);
}

function create() {
  this.add.image(400, 300, "BG");

  tempoText = this.add.text(0, 0, tempo, style);
  pontosText = this.add.text(750, 0, pontos, style);

  player = this.physics.add.sprite(400, 300, "Dino");
  player.setScale(0.25);
  player.body.setGravityY(50);
  player.setBounce(0.1); // saltar ao bater no items
  player.setCollideWorldBounds(true); // Não sair do mapa

  groundLayer = this.physics.add.staticGroup();
  groundLayer.create(750, 200, 'Plataforma');
  groundLayer.create(600, 400, 'Plataforma');
  groundLayer.create(400, 585, 'Plataforma').setScale(10, 1).refreshBody();
  groundLayer.create(200, 400, 'Plataforma');
  groundLayer.create(50, 200, 'Plataforma');

  star = this.physics.add.sprite(400, 300, "Star");
  console.log(star);
  star.body.setGravityY(25);
  star.setBounce(0.99); // saltar ao bater no items
  star.setCollideWorldBounds(true); // Não sair do mapa

  this.physics.add.collider(player, groundLayer); // Colisão com as plataformas
  this.physics.add.collider(star, groundLayer); // Colisão com as plataformas
  this.physics.add.overlap(player, star, colecionarEstrelas, null, this);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.flipX = true;
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.flipX = false;
  }
  else player.setVelocityX(0);

  if (cursors.up.isDown && player.body.touching.down) player.setVelocityY(-330);
}

function colecionarEstrelas(player, star) {
  star.x = randomNumber(800);
  star.y = randomNumber(500);
  if (tempo) pontos++;
  pontosText.setText(pontos);
}

let timer = setInterval(() => {
  tempo--;
  if (tempoText) tempoText.setText(tempo);
  if (!tempo || tempo < 0) {
    clearTimeout(timer);
  }
}, 1000);
