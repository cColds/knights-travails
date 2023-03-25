import Knight from "../knights-travails";
import { move, check, capture, victory, playSound } from "./audio";
import viewStats from "./modal";

const board = document.querySelector(".board");
const knight = new Knight();

function setStartAndEndCoordinates(e) {
	knight.start = knight.currentPosition;
	knight.end = JSON.parse(e.target.dataset.coordinates);
}

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function animateKnightPath(knightPath) {
	const promises = [];
	const getNextPosition = (i) =>
		document.querySelector(`[data-coordinates='[${knightPath[i]}]']`);

	for (let i = 0; i < knightPath.length; i += 1) {
		const currentPosition = document.querySelector(".knight");
		const nextPosition = getNextPosition(i);
		const isKingInCheck = i === knightPath.length - 2;

		currentPosition.classList.remove("knight");
		nextPosition.classList.add("knight", "trail");

		if (isKingInCheck) {
			const endPoint = getNextPosition(i + 1);
			endPoint.classList.add("check");
			await playSound(check);
			playSound(capture);

			nextPosition.classList.remove("knight");
			endPoint.classList.add("knight", "trail");

			sleep(500).then(() => {
				playSound(victory);
			});

			break;
		} else {
			promises.push(await sleep(500));
			await playSound(move);
		}
	}
	return Promise.all(promises);
}

function clearTrail() {
	const squaresTrailed = document.querySelectorAll(".trail");
	squaresTrailed.forEach((square) => square.classList.remove("trail"));
}

function resetState() {
	knight.currentPosition = knight.end;
	knight.start = null;
	knight.end = null;
}

function updateUI(moves, knightPath, endPoint) {
	clearTrail();
	viewStats(moves, knightPath);
	endPoint.classList.remove("check");
	board.classList.remove("disable");
}

function handleSquareClick(e) {
	if (!e.target.classList.contains("square")) return;
	if (e.target.classList.contains("knight")) return;

	const isKnightPlaced = document.querySelector(".knight");
	if (isKnightPlaced == null) {
		e.target.classList.add("knight");
		knight.currentPosition = JSON.parse(e.target.dataset.coordinates);
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
		await sleep(500);
		resetState();
		updateUI(moves, knightPath, endPoint);
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
