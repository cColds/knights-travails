const squares = document.querySelectorAll(".square");

squares.forEach((square) =>
	square.addEventListener("click", (e) => console.log(e.target))
);
