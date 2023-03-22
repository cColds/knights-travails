// import Knight from "../knights-travails";

const board = document.querySelector(".board");
board.addEventListener("click", (e) => {
	const isKnightOnBoard = document.querySelector(".knight");
	if (isKnightOnBoard) return; // Prevent multiple knights from spawning

	e.target.classList.add("knight");
});

function setSquareCoordinates() {
	let i = 0;
	for (let x = 7; x >= 0; x -= 1) {
		for (let y = 0; y < 8; y += 1) {
			board.children[i].dataset.coordinates = `[${x}, ${y}]`;
			i += 1;
		}
	}
}
setSquareCoordinates();
// let jimmy = new Knight();
// console.log(jimmy.move());
