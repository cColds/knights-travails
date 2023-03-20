class Knight {
	constructor() {
		this.board = Array.from({ length: 8 }, () => Array(8).fill(0));
	}

	isValidMove = ([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7;

	isPositionMatching(positionA, positionB) {
		return JSON.stringify(positionA) === JSON.stringify(positionB);
	}

	getPossibleMoves() {
		const [x, y] = this.currentPosition;

		const possibleMoves = [
			// top left
			[x + 1, y - 2],
			[x + 2, y - 1],
			// top right
			[x + 2, y + 1],
			[x + 1, y + 2],
			// bottom left
			[x - 1, y - 2],
			[x - 2, y - 1],
			// bottom right
			[x - 2, y + 1],
			[x - 1, y + 2],
		];

		return possibleMoves.filter(
			([x, y]) => this.isValidMove([x, y]) && this.board[x][y] === 0
		);
	}

	logPath(start, [endX, endY]) {
		const backtrackMoves = [[endX, endY]];
		let [currentX, currentY] = this.board[endX][endY];
		while (true) {
			if (this.isPositionMatching(start, [currentX, currentY])) {
				backtrackMoves.push(start);
				const isMoveSingular = backtrackMoves.length - 1 === 1;

				console.log(
					`You made it in ${backtrackMoves.length - 1} ${
						isMoveSingular ? "move" : "moves"
					}! Here's your path:`
				);
				break;
			}

			backtrackMoves.push([currentX, currentY]);
			[currentX, currentY] = this.board[currentX][currentY];
		}

		let i = backtrackMoves.length - 1;
		while (i >= 0) {
			console.log(backtrackMoves[i]);
			i--;
		}
	}

	isInvalidMove(start, end) {
		return (
			!Array.isArray(start) ||
			!Array.isArray(end) ||
			start.length !== 2 ||
			end.length !== 2 ||
			start.every((item) => !Number.isInteger(item)) ||
			end.every((item) => !Number.isInteger(item)) ||
			!this.isValidMove(start) ||
			!this.isValidMove(end)
		);
	}

	move(start = [0, 0], end = [0, 0]) {
		if (this.isInvalidMove(start, end)) {
			console.log("Invalid move");
			return;
		}

		const queue = [start];
		this.currentPosition = start;
		this.board[start[0]][start[1]] = start;

		while (!this.isPositionMatching(queue[0], end)) {
			queue.shift();

			this.getPossibleMoves().forEach(([x, y]) => {
				queue.push([x, y]);
				this.board[x][y] = this.currentPosition;
			});

			this.currentPosition = queue[0];
		}
		this.logPath(start, end);
	}
}

const knight = new Knight();
knight.move();

// TODO: Error handling
// TODO: Clean code
// TODO (optional): add UI
