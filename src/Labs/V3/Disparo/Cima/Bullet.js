const bulletConfig = {
	Extends: Phaser.GameObjects.Image,

	initialize:
		function Bullet(scene) {
			Phaser.GameObjects.Image.call(this, scene, 0, 0, "Fire");
			this.speed = Phaser.Math.GetSpeed(400, 1);
		},

	fire: function (x, y) {
		this.setPosition(x, y - 50);
		this.setActive(true);
		this.setVisible(true);
	},

	update: function (time, delta) {
		this.y -= this.speed * delta;
		if (this.y < -50) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
};
const Bullet = new Phaser.Class(bulletConfig);

export default Bullet;