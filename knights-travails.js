class Knight {
	constructor() {
		this.currentPosition = [0, 0];
		this.board = Array.from({ length: 8 }, () => Array(8).fill(0));
		this.board[0][0] = [0, 0]; // Mark edge of default current position
	}

	isValidMove = (move) => move >= 0 && move <= 7;

	isDestination(move, destination) {
		return JSON.stringify(move) === JSON.stringify(destination);
	}

	possibleMoves() {
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
			([x, y]) =>
				this.isValidMove(x) &&
				this.isValidMove(y) &&
				this.board[x][y] === 0
		);
	}

	logPath(start, [destinationX, destinationY]) {
		const backtrackMoves = [];
		let [currentX, currentY] = this.board[destinationX][destinationY];
		while (JSON.stringify([currentX, currentY]) !== JSON.stringify(start)) {
			backtrackMoves.push([currentX, currentY]);
			[currentX, currentY] = this.board[currentX][currentY];
		}

		backtrackMoves.push(start);
		backtrackMoves.unshift([destinationX, destinationY]);

		console.log(
			`You made it in ${
				backtrackMoves.length - 1
			} moves! Here's your path:`
		);

		let i = backtrackMoves.length - 1;
		while (i >= 0) {
			console.log(backtrackMoves[i]);
			i--;
		}
	}

	move(start, destination = this.currentPosition) {
		const queue = [this.currentPosition];

		while (!this.isDestination(queue[0], destination)) {
			queue.shift();

			this.possibleMoves().forEach(([x, y]) => {
				queue.push([x, y]);
				this.board[x][y] = this.currentPosition;
			});

			this.currentPosition = queue[0];
		}
		this.logPath(start, destination);
	}
}

const knight = new Knight();
knight.move([0, 0], [7, 7]);
