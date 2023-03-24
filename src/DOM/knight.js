import Knight from "../knights-travails";

const board = document.querySelector(".board");
const knight = new Knight();
const knightMove = new Audio("../../dist/assets/knight-move.mp3");
const kingInCheck = new Audio("../../dist/assets/piano-check.mp3");
const capture = new Audio("../../dist/assets/piano-capture.mp3");

function setStartAndEndCoordinates(e) {
	knight.start = knight.currentPosition;
	knight.end = JSON.parse(e.target.dataset.coordinates);
	console.log("Set start and end coordinates");
}

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function playSound(soundEffect) {
	return new Promise((resolve) => {
		soundEffect.onended = () => resolve();
		soundEffect.play();
	});
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

		const isEndPoint = i === knightPath.length - 1;
		const isKingInCheck = i === knightPath.length - 2;

		if (isKingInCheck) {
			await playSound(kingInCheck);
			playSound(capture);
		} else if (!isEndPoint) {
			promises.push(await sleep(500));
			await playSound(knightMove);
		}
	}
	return Promise.all(promises);
}

async function handleSquareClick(e) {
	if (!e.target.classList.contains("square")) return;
	if (e.target.classList.contains("knight")) return;

	const isKnightPlaced = document.querySelector(".knight");
	if (isKnightPlaced == null) {
		e.target.classList.add("knight");
		knight.currentPosition = JSON.parse(e.target.dataset.coordinates);
		console.log("Knight placed");
		return; // Need to click another square to get end point
	}

	board.classList.add("disable");

	setStartAndEndCoordinates(e);
	const endPoint = document.querySelector(
		`[data-coordinates='[${knight.end}]']`
	);
	endPoint.classList.add("king");

	const knightPath = knight.move(knight.start, knight.end);
	animateKnightPath(knightPath).then(() => {
		endPoint.classList.remove("king");
		Knight.logPath(knightPath);
		knight.currentPosition = knight.end;
		knight.start = null;
		knight.end = null;

		board.classList.remove("disable");
	});
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
