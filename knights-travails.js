// TODO ✔️: Create a Chess class

// TODO: Create an object of 8x8 adjacency matrix
// TODO: Create a method to move knight pieces two forward each direction, and left and right in four directions
// TODO: Create a method to prevent out of bound moves, or illegal moves for the knight
// TODO: Create a method to from a (start point) to b (end point), and output each move
// TODO: Create a method to get the knight's location

class Chess {
	constructor() {
		this.currentLocation = [0, 0];
		this.board = Array.from({ length: 8 }, () => Array(8).fill(0));
	}
}

const knight = new Chess();
console.log(knight);
