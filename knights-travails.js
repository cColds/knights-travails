// TODO ✔️: Create a Knight class
// TODO ✔️: Create an object of 8x8 adjacency matrix
// TODO ✔️: Create a method to move knight pieces two forward each direction, and left and right in four directions
// TODO ✔️: Create a method to prevent out of bound moves, or illegal moves for the knight

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

	move(start, end) {}
}

const knight = new Knight();
console.log(knight.isValidMove([-1, 2]));

// knight.board[knight.currentPosition[0]][knight.currentPosition[0]]
