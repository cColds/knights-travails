// TODO ✔️: Create a Knight class
// TODO ✔️: Create an object of 8x8 adjacency matrix
// TODO ✔️: Create a method to move knight pieces two forward each direction, and left and right in four directions
// TODO ✔️: Create a method to prevent out of bound moves for the knight

// TODO: Create a method to from a (start point) to b (end point), and output each move
// TODO: Store the knight's moves in a graph

class Knight {
	constructor() {
		this.currentPosition = [0, 0];
		this.board = Array.from({ length: 8 }, () => Array(8).fill(0));
		this.board[0][0] = 1; // Mark edge of default current position to 1
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
			(move) => this.isValidMove(move[0]) && this.isValidMove(move[1])
		);
	}

	logPath(moves) {
		console.log(
			`You made it in ${moves.length - 1} moves! Here's your path:`
		);
		let i = 0;
		moves.forEach((move) => console.log(move, `${i++}`));
	}

	move(destination = this.currentPosition) {
		const queue = [this.currentPosition];
		const moves = [];
		while (!this.isDestination(queue[0], destination)) {
			const [x, y] = queue[0];
			this.possibleMoves().forEach((move) => queue.push(move));
			this.currentPosition = queue[0];
			this.board[x][y] = 1;
			moves.push(queue[0]);
			queue.shift();
		}

		this.currentPosition = queue[0];
		moves.push(this.currentPosition);
		this.logPath(moves);

		return true;
	}
}

const knight = new Knight();
knight.move([0, 2]);
console.log(knight.currentPosition);
