const modal = document.querySelector(".modal-container");
const checkmateInNumberMoves = document.querySelector(".modal-heading-text");
const closeModalBtn = document.querySelector(".close-modal");
const pathCoordinates = document.querySelector(".path");
const newGame = document.querySelector(".new-game");
const resumeGame = document.querySelector(".resume-game");

function openModal() {
	modal.classList.add("active");
}

function closeModal() {
	modal.classList.remove("active");
}

function convertToChessNotation([x, y]) {
	const files = "abcdefgh";
	const ranks = "12345678";

	return files[x] + ranks[y];
}

function setCheckmateInNumberMoves(moves) {
	const isMovePlural = moves === 1 ? "move" : "moves";
	checkmateInNumberMoves.textContent = `Checkmate in ${moves} ${isMovePlural}`;
}

function setPathText(path) {
	let pathInChessNotation = "";
	for (let i = 0; i < path.length; i += 1) {
		const isEndPoint = i === path.length - 1;
		const isKingInCheck = i === path.length - 2;

		if (isKingInCheck) {
			pathInChessNotation += `${i + 1}. N${convertToChessNotation(
				path[i]
			)}+ `;
		} else if (isEndPoint) {
			pathInChessNotation += `${i + 1}. Nx${convertToChessNotation(
				path[i]
			)}# `;
		} else
			pathInChessNotation += `${i + 1}. N${convertToChessNotation(
				path[i]
			)} `;
	}

	pathCoordinates.textContent = pathInChessNotation;
}

function removeKnight() {
	const knight = document.querySelector(".knight");
	knight.classList.remove("knight");
}

closeModalBtn.addEventListener("click", () => {
	removeKnight();
	closeModal();
});

newGame.addEventListener("click", () => {
	removeKnight();
	closeModal();
});

resumeGame.addEventListener("click", closeModal);

export default function viewStats(moves, path) {
	openModal();
	setCheckmateInNumberMoves(moves);
	setPathText(path);
}
