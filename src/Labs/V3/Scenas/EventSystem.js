// https://blog.ourcade.co/posts/2020/phaser3-how-to-communicate-between-scenes/

export const EVENTS_NAMES = {
	addScoreSceneA: "addScoreSceneA",
	addScoreSceneB: "addScoreSceneB",
	addScoreSceneC: "addScoreSceneC",
}

const EventSystem = new Phaser.Events.EventEmitter();
export default EventSystem;
