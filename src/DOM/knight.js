import Knight from "../knights-travails";

const board = document.querySelector(".board");
const knight = new Knight();

function setStartAndEndCoordinates(e) {
	knight.start = knight.currentPosition;
	knight.end = JSON.parse(e.target.dataset.coordinates);
	console.log("Set start and end coordinates");
}

async function animateKnightPath(knightPath) {
	const promises = [];

	for (let i = 0; i < knightPath.length; i += 1) {
		const currentKnightSpritePosition = document.querySelector(".knight");
		const nextKnightSpritePosition = document.querySelector(
			`[data-coordinates='[${knightPath[i]}]']`
		);
		currentKnightSpritePosition.classList.remove("knight");
		nextKnightSpritePosition.classList.add("knight");

		promises.push(
			await new Promise((resolve) => setTimeout(resolve, 1000))
		);
	}
	return Promise.all(promises);
}

async function handleSquareClick(e) {
	const isKnightPlaced = document.querySelector(".knight");
	if (isKnightPlaced == null) {
		e.target.classList.add("knight");
		knight.currentPosition = JSON.parse(e.target.dataset.coordinates);
		console.log("Knight placed");
		return; // Need to click another square to get end point
	}

	board.classList.add("disable");

	setStartAndEndCoordinates(e);
	const knightPath = knight.move(knight.start, knight.end);
	await animateKnightPath(knightPath);
	Knight.logPath(knightPath);
	knight.currentPosition = knight.end;
	knight.start = null;
	knight.end = null;

	board.classList.remove("disable");
}

function setSquareCoordinates() {
	let i = 0;
	for (let x = 7; x >= 0; x -= 1) {
		for (let y = 0; y < 8; y += 1) {
			board.children[i].dataset.coordinates = `[${x},${y}]`;
			i += 1;
		}
	}
}
setSquareCoordinates();

board.addEventListener("click", (e) => handleSquareClick(e));
