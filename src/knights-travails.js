export default class Knight {
	constructor() {
		this.board = Array.from({ length: 8 }, () => Array(8).fill(0));
	}

	static isOutOfBounds = ([x, y]) => x < 0 || x > 7 || y < 0 || y > 7;

	static isPositionMatching = (positionA, positionB) =>
		JSON.stringify(positionA) === JSON.stringify(positionB);

	static logPath(backtrackMoves) {
		const isOneMove = backtrackMoves.length - 1 === 1;

		console.log(
			`You made it in ${backtrackMoves.length - 1} ${
				isOneMove ? "move" : "moves"
			}! Here's your path:`
		);

		for (let i = 0; i < backtrackMoves.length; i += 1) {
			console.log(backtrackMoves[i]);
		}
	}

	static isValidMove(start, end) {
		return (
			[start, end].every(Array.isArray) &&
			[...start, ...end].every((item) => Number.isInteger(item)) &&
			start.length === 2 &&
			end.length === 2 &&
			!Knight.isOutOfBounds(start) &&
			!Knight.isOutOfBounds(end)
		);
	}

	getPossibleMoves() {
		const [currentX, currentY] = this.currentPosition;

		const possibleMoves = [
			// top left
			[currentX + 1, currentY - 2],
			[currentX + 2, currentY - 1],
			// top right
			[currentX + 2, currentY + 1],
			[currentX + 1, currentY + 2],
			// bottom left
			[currentX - 1, currentY - 2],
			[currentX - 2, currentY - 1],
			// bottom right
			[currentX - 2, currentY + 1],
			[currentX - 1, currentY + 2],
		];

		return possibleMoves.filter(
			([x, y]) => !Knight.isOutOfBounds([x, y]) && this.board[x][y] === 0
		);
	}

	getPath(start, [endX, endY]) {
		const backtrackMoves = [[endX, endY]];
		let [currentX, currentY] = this.board[endX][endY];
		while (true) {
			if (Knight.isPositionMatching(start, [currentX, currentY])) {
				backtrackMoves.push(start);
				break;
			}

			backtrackMoves.push([currentX, currentY]);
			[currentX, currentY] = this.board[currentX][currentY];
		}

		return backtrackMoves.reverse();
	}

	move(start = [0, 0], end = [0, 0]) {
		if (!Knight.isValidMove(start, end)) {
			console.log("Invalid move");
			return;
		}

		this.resetBoard();
		const queue = [start];
		this.currentPosition = start;
		this.board[start[0]][start[1]] = start;

		while (!Knight.isPositionMatching(queue[0], end)) {
			queue.shift();
			this.getPossibleMoves().forEach(([x, y]) => {
				queue.push([x, y]);
				this.board[x][y] = this.currentPosition;
			});

			this.currentPosition = queue[0];
		}
		return this.getPath(start, end);
	}

	resetBoard() {
		this.board = Array.from({ length: 8 }, () => Array(8).fill(0));
	}
}
