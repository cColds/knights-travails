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
	}

	isValidMove(move) {
		return move >= 0 && move <= 7;
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

		const filterPossibleMoves = possibleMoves.filter(
			(move) => this.isValidMove(move[0]) && this.isValidMove(move[1])
		);

		return filterPossibleMoves;
	}

	move(destination = this.currentPosition) {
		this.currentPosition = destination;
	}
}

const knight = new Knight();
knight.move([1, 2]);
console.log(knight.currentPosition);
