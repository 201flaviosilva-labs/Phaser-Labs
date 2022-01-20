import Assets from "../../../Assets.js";

// Objeto de configuração do jogo
const config = {
	// type -> tipo de tecnologia
	type: Phaser.AUTO, // O Phaser irá ver se o browser suporta WEBGL se não ele automáticamente irá convertar para Canvas
	// Phaser.WEBGL // obriga a usar o WEBGL
	// Phaser.CANVAS // Obriga a usar o Canvas
	width: 800, // Lasgura da tela
	height: 600, // Altura da tela
	// Estamos a dizer ao Phaser que vamos usar uma fisica já pré feita
	physics: {
		default: 'arcade', // O nome da fisica, a fisica arcade
		arcade: {
			gravity: {
				y: 300
			},
			debug: false
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

// Uma instância de um objeto Phaser.Game;
// Objeto de configuração é passado para ela.
// Isso iniciará o processo de dar vida ao Phaser.
const game = new Phaser.Game(config); // Inicia o jogo

let score = 0;
let scoreText;
let gameOver;
let cursors;

function preload() { // O Phase ao inicioar irá procurar por esta função em primeiro lugar
	this.load.image("sky", Assets.Background.Skys.Sky); // Indica ao Phaser que esta imagem existe, e ele a carrega para dentro dele
	this.load.image("ground", Assets.Sprites.Platforms.Platform); // O Phaser não irá exibir a imagem
	this.load.image("star", Assets.Sprites.Star.Star); // O primiero parametro é como se fosse o nome de uma variavel
	this.load.image("bomb", Assets.Sprites.Bomb.Bomba); // O segundo parametro é a localização
	this.load.spritesheet('dude', // O Phaser tambem disponimiliza a opção de spritesheet
		Assets.Sprites.Dude.png, { // A localização
		frameWidth: Assets.Sprites.Dude.size.frameWidth, // A largura de cada frame
		frameHeight: Assets.Sprites.Dude.size.frameHeight // A altura de cada frame
	});
	// O phaser suporta rodar a imagem para poupar sprites, mas neste toturial ser á moda antiga
}

let platforms;
let player;
let stars;
let bombs;

function create() { // Após o preload o Phaser irá procurar a função creat
	this.add.image(400, 300, "sky"); // Esta linha de código irá apresentar na tela de jogo a iamgem
	// O primeiro parametro é a cordenada x(400) o outro parametro é a cordenada y (300) em reação á tela
	// Por fim o terceiro paremetro é o nome da imagem

	// Porque por no meio da tela a imagem, quando a imagem é para servir de fundo?
	// Porque o Phaser 3 vai procurar o centro das imagem, ou seja o x:0, y:0 da imagem é exatamente no centro da iamgem sky
	// Sendo assim se ela fosse posiciona no x:0, y:0 (da tela) apenas se iria ver 1/4 da imagem
	// Para reverter esta situação para não ficar tão confuso, poderia-se usar:
	// this.add.image(0, 0, 'sky').setOrigin( 0, 0); // Isto posiciona a iamgem na cordenada x:0, y:0, procura a imagem com este nome
	// setOrigin(0, 0); => Faz a origem da imagem ser no canto superior esquerdo

	// // As imagems subrepõem-se umas com as outras tendo em conta a que vier depois é a que fica mais á frente
	// this.add.image(200, 300, "star"); // Não se irá ver
	// this.add.image(400, 300, "sky"); // cêu está a ocupar todo os espaço da tela
	// this.add.image(400, 300, "star"); // Por cima da imagem "Sky"
	// this.add.image(450, 300, "star");
	// this.add.image(850, 300, "star"); // Embora esteja lá não se vê porque pssou os limites da camara
	// // o cenário em si não tem limites, ele é infinito em todas as direções, mas a o que nós vemos é o que a camara grava



	// Algo para rever
	platforms = this.physics.add.staticGroup(); // Cria um grupo de fisica estática, e atribui á variavel (platforms);
	// this.physics -> estamos  a usar uma biblioteca externa de fisica;
	// Sendo assim temos que dizer ao Phaser que ele tem que a ir buscar, dentro das configurações de jogo (a variavel config);
	// Gruop -> É uma forma de agrupar objetos semelhantes e controlá-los como uma única unidade;
	// add.staticGroup() -> Vamos adicionar uma fisica estática, ou seja que não se mexe por nada;
	// Na fisica "Arcade Physics" exestem dois tipos de fisicas:
	// Estaticas -> O objeto não se move, de forma alguma, outros objetos podem lhe tocar, mas ele fica parado, exemplo:
	// Platafromas, chão, pedras, paredes, etc... (Estático por nome, estático por natureza.);
	// Dinâmico -> Um corpo dinâmico é aquele que pode se movimentar por meio de forças como velocidade ou aceleração;
	// Ou seja que se mexe e pode ser mexido em colisões, exemplo:
	// Uma personagem, uma caixa, uma bola, ect...

	// Plataforma de mais a baixo
	platforms.create(400, 568, 'ground').setScale(2).refreshBody();
	// Com o grupo de plataformas, podemos criar as plataformas que quiseremos (platforms.create());
	// Dentro da função passamos as cordenadas, o nome da imagem
	// .setScale(2) -> Duplica o tamanho da plataforma
	// .refreshBody() -> Como o corpo é statico temos de dizer ao "physics world" que ele sofreu mudanças

	// Plataformas flotuantes
	platforms.create(600, 400, 'ground'); // Posição na tela e qual é a imagem
	platforms.create(50, 250, 'ground');
	platforms.create(750, 220, 'ground');



	// Criação de um Sprite
	// Ao criar um Physics Sprite ele recebe uma propriedade "body" (referencia ao Arcade Physics Body)
	// player.body.setGravityY() -> Simula o peso do objeto;
	// player.body.setGravityY(300) -> Quanto maior o númeor maior o peso, maior a velocidade de queda

	player = this.physics.add.sprite(10, 275, 'dude'); // isto cria um sprite nas cordenadas 10 x 275 (na parte inferior do jogo)
	// Ele foi criado apartir do "Factory Physics Game Object" o que o torna um corpo dinamico por padrão;

	player.setBounce(0.5); // O resalto do player, ou seja depois de um salto quando
	// Ele bater no chão ele dá uns pulos de replica, de 0.5 cada um

	player.setCollideWorldBounds(true); // Isto impede o player de saltar fora do jogo
	// Quando ele bater em alguma das formas do jogo, em cima, em baixo, esquerda ou direita, ele não anda mais


	// Animação
	// this.anims -> Gerenciador de animações
	this.anims.create({
		key: 'left', // Nome da Animação
		frames: this.anims.generateFrameNumbers('dude', {
			start: 0, // Onde é o primeiro quadro
			end: 3 // Qual é o ultimo
		}), // Usa o 0, 1, 2 e 3 da imagem
		frameRate: 10, // Número de quadros por segundo
		repeat: -1 // Para a nimação repetir para sempre
	});

	this.anims.create({
		key: 'turn',
		frames: [{
			key: 'dude',
			frame: 4
		}],
		frameRate: 20
	});
	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers('dude', {
			start: 5,
			end: 8
		}),
		frameRate: 10,
		repeat: -1
	});

	// Colisão
	this.physics.add.collider(player, platforms); // Cria um objeto de colisão com todas as plataformas
	// Assim o jogador não passado chão
	cursors = this.input.keyboard.createCursorKeys();


	// Estrela
	stars = this.physics.add.group({ // Criamos um grupo de estrelas
		key: 'star',
		repeat: 11, // Criamos 11 filhos (+1)
		setXY: {
			x: 12, // O primeiro filho começa na coordenada x: 12
			y: 0, // Coordenada y: y
			stepX: 70 // A cada novo filho criado ele irá ter mais 70 X que o anteior
		}
	});

	stars.children.iterate(function (child) {
		child.setBounceY(Phaser.Math.FloatBetween(0.9, 1)); // Manda um valor aleaótio ente os dois valores escolhidos
		// isto fará com que o resalto ao bater no chão seja tendo em conta os valores
	});

	// Estrelas colisões
	this.physics.add.collider(stars, platforms); // Nas Plataformas
	this.physics.add.overlap(player, stars, collectStar, null, this); // Quando o jogador e a estrela estiverem subrepostos a estrela desaparece

	// Aciona uma Label com o score
	scoreText = this.add.text(16, 16, 'Pontos: 0', { // As cordenadas conde apresentar, e o texto a apresenatar
		fontSize: '32px', // Tamanho da fonte
		fill: '#000' // Cor do texto
	});

	//Tutorial
	this.add.text(400, 24, 'Usa as setas para movimentar', {
		fontSize: '16px',
		fill: '#000'
	});

	// Bombas
	bombs = this.physics.add.group(); // poem as bombas em grupo
	this.physics.add.collider(bombs, platforms); // Colisão das bomas e as plataformas
	this.physics.add.collider(player, bombs, hitBomb, null, this); // Bombas e jogador
}

function update() {
	if (cursors.left.isDown) { // Se a tecla da esquerda estiver a ser pressionada
		// Quando não for mais pressionada deixa de fazer a animação
		player.setVelocityX(-100); // O Jogador anda para  a esquerda -> px/seg, 100 pixeis por segundo
		player.anims.play('left', true); // Executa a animação

	} else if (cursors.right.isDown) {
		player.setVelocityX(100);
		player.anims.play('right', true);

	} else {
		player.setVelocityX(0); // Retira a velocidade
		player.anims.play('turn'); // Animação de estar parado
	}

	if (cursors.up.isDown && player.body.touching.down) { // Salto
		player.setVelocityY(-350); // O jogador adiciona cordenadas no y
	}

	// O jogador volta para baixo por causa da gravidade
}

function collectStar(player, star) {
	star.disableBody(true, true);

	// Verificar pontuação
	score += 10;
	scoreText.setText('Pontos: ' + score);

	if (stars.countActive(true) === 0) {
		stars.children.iterate(function (child) {
			child.enableBody(true, child.x, 0, true, true);
		});
		const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
		let bomb = bombs.create(x, 16, 'bomb');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

	}
}

function hitBomb(player, bomb) {
	this.physics.pause(); // Pausa a fisica
	player.setTint(0xff0000); // Pinta o jogador
	player.anims.play('turn'); // Chama a animação de parado do jogador
	gameOver = true; // Silaniza o fim do jogo
}

        // As animações no Phaser são global, ou seja qualquer objeto pode usar as mesmas animações;
        // O Phaser suporta 3 fisicas: Arcade Physics, Impact Physics e Matter.js Physics;
