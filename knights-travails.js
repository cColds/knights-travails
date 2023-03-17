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

	isValidMove(destination) {
		const [destinationX, destinationY] = destination;
		if (
			destinationX < 0 ||
			destinationX > 7 ||
			destinationY < 0 ||
			destinationY > 7
		)
			return false;

		return true;
	}

	possibleMoves() {
		// create array
		//

		// [3,3] (current position)
		// possible moves (x, y):
		// top left: [4, 1], [5, 2]
		// top right: [5, 4], [4,5]
		// bottom left: [2, 1], [1, 2]
		// bottom right: [1, 4], [2, 5]
		const [currentX, currentY] = this.currentPosition;

		const possibleMoves = [
			// top left
			[currentX + 1, currentY - 2],
			[currentX + 2, currentY - 1],
			// top right
			[Math.abs(currentX + 2, currentY + 1)],
			[currentX + 1, currentY + 2],
			// bottom left
			[currentX - 1, currentY - 2],
			[currentX - 2, currentY - 1],
			// bottom right
			[currentX - 2, currentY + 1],
			[currentX - 1, currentY + 2],
		];

		return possibleMoves;
	}

	move(start, end) {}
}

const knight = new Knight();
console.log(knight.possibleMoves());

// knight.board[knight.currentPosition[0]][knight.currentPosition[0]]

// const [currentX, currentY] = this.currentPosition;
// const xPositionDifference = Math.abs(currentX - destinationX);
// const yPositionDifference = Math.abs(currentY - destinationY);

// if (xPositionDifference === 1 && yPositionDifference === 2) return true;
// if (yPositionDifference === 1 && xPositionDifference === 2) return true;

// return false;
