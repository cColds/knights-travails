const move = new Audio("./assets/piano-move.mp3");
const check = new Audio("./assets/piano-check.mp3");
const capture = new Audio("./assets/piano-capture.mp3");
const victory = new Audio("./assets/piano-victory.mp3");

function playSound(soundEffect) {
	return new Promise((resolve) => {
		soundEffect.volume = 0.5;
		soundEffect.onended = () => resolve();
		soundEffect.play();
	});
}

export { move, check, capture, victory, playSound };
