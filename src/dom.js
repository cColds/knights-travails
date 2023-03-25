import Knight from "./knights-travails";
import { move, check, capture, victory, playSound } from "./audio";
import viewStats from "./modal";

const board = document.querySelector(".board");
const knight = new Knight();

function setStartAndEndCoordinates(e) {
	knight.start = knight.currentPosition;
	knight.end = JSON.parse(e.target.dataset.coordinates);
	console.log("Set start and end coordinates");
}

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
			const knightSpriteEndPoint = document.querySelector(
				`[data-coordinates='[${knightPath[i + 1]}]']`
			);
			knightSpriteEndPoint.classList.add("check");
			await playSound(check);
			playSound(capture);

			nextKnightSpritePosition.classList.remove("knight");
			knightSpriteEndPoint.classList.add("knight");

			sleep(500).then(() => {
				playSound(victory);
			});

			break;
		} else if (!isEndPoint) {
			promises.push(await sleep(500));
			await playSound(move);
		}
	}
	return Promise.all(promises);
}

function handleSquareClick(e) {
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
	const moves = knightPath.length - 1;
	animateKnightPath(knightPath).then(async () => {
		endPoint.classList.remove("king");
		Knight.logPath(knightPath);
		knight.currentPosition = knight.end;
		knight.start = null;
		knight.end = null;

		await sleep(500);
		viewStats(moves, knightPath);
		endPoint.classList.remove("check");
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

// TODO: Clean code
// TODO: Update UI
