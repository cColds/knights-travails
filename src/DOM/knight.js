import Knight from "../knights-travails";

const board = document.querySelector(".board");
const knight = new Knight();
async function handleSquareClick(e) {
	if (knight.currentPosition) {
		knight.start = knight.currentPosition;
		knight.end = JSON.parse(e.target.dataset.coordinates);
	}
	if (knight.start == null) {
		knight.start = JSON.parse(e.target.dataset.coordinates);
		e.target.classList.add("knight");
		console.log("start");
		return;
	}

	if (knight.end == null) {
		knight.end = JSON.parse(e.target.dataset.coordinates);
		console.log("end");
	}

	const path = knight.move(knight.start, knight.end);
	console.log(path);
	let i = 0;
	while (i < path.length) {
		const knightSprite = document.querySelector(".knight");
		knightSprite.classList.remove("knight");

		const nextPosition = document.querySelector(
			`[data-coordinates='${JSON.stringify(path[i])}']`
		);
		nextPosition.classList.add("knight");
		await new Promise((resolve) => setTimeout(resolve, 1000));
		nextPosition.classList.add("knight");

		i += 1;
		console.log(i);
	}
	knight.currentPosition = knight.end;
	knight.resetStartAndEnd();
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
