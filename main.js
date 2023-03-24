/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM/knight.js":
/*!***************************!*\
  !*** ./src/DOM/knight.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _knights_travails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../knights-travails */ \"./src/knights-travails.js\");\n\n\nconst board = document.querySelector(\".board\");\nconst knight = new _knights_travails__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst knightMove = new Audio(\"../../dist/assets/knight-move.mp3\");\n\nfunction setStartAndEndCoordinates(e) {\n\tknight.start = knight.currentPosition;\n\tknight.end = JSON.parse(e.target.dataset.coordinates);\n\tconsole.log(\"Set start and end coordinates\");\n}\n\nconst sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\nfunction playChessSounds() {\n\treturn new Promise((resolve) => {\n\t\tknightMove.onended = () => resolve();\n\t\tknightMove.play();\n\t});\n}\n\nasync function animateKnightPath(knightPath) {\n\tconst promises = [];\n\n\tfor (let i = 0; i < knightPath.length; i += 1) {\n\t\tconst currentKnightSpritePosition = document.querySelector(\".knight\");\n\t\tconst nextKnightSpritePosition = document.querySelector(\n\t\t\t`[data-coordinates='[${knightPath[i]}]']`\n\t\t);\n\t\tcurrentKnightSpritePosition.classList.remove(\"knight\");\n\t\tnextKnightSpritePosition.classList.add(\"knight\");\n\n\t\tconst isLastStep = i === knightPath.length - 1;\n\t\tif (!isLastStep) {\n\t\t\tpromises.push(await sleep(500));\n\t\t\tawait playChessSounds();\n\t\t}\n\t}\n\treturn Promise.all(promises);\n}\n\nasync function handleSquareClick(e) {\n\tif (!e.target.classList.contains(\"square\")) return;\n\tif (e.target.classList.contains(\"knight\")) return;\n\n\tconst isKnightPlaced = document.querySelector(\".knight\");\n\tif (isKnightPlaced == null) {\n\t\te.target.classList.add(\"knight\");\n\t\tknight.currentPosition = JSON.parse(e.target.dataset.coordinates);\n\t\tconsole.log(\"Knight placed\");\n\t\treturn; // Need to click another square to get end point\n\t}\n\n\tboard.classList.add(\"disable\");\n\n\tsetStartAndEndCoordinates(e);\n\tconst endPoint = document.querySelector(\n\t\t`[data-coordinates='[${knight.end}]']`\n\t);\n\tendPoint.classList.add(\"king\");\n\n\tconst knightPath = knight.move(knight.start, knight.end);\n\tanimateKnightPath(knightPath).then(() => {\n\t\tendPoint.classList.remove(\"king\");\n\t\t_knights_travails__WEBPACK_IMPORTED_MODULE_0__[\"default\"].logPath(knightPath);\n\t\tknight.currentPosition = knight.end;\n\t\tknight.start = null;\n\t\tknight.end = null;\n\n\t\tboard.classList.remove(\"disable\");\n\t});\n}\n\nfunction setSquareCoordinates() {\n\tlet i = 0;\n\tfor (let x = 7; x >= 0; x -= 1) {\n\t\tfor (let y = 0; y < 8; y += 1) {\n\t\t\tboard.children[i].dataset.coordinates = `[${x},${y}]`;\n\t\t\ti += 1;\n\t\t}\n\t}\n}\nsetSquareCoordinates();\n\nboard.addEventListener(\"click\", (e) => handleSquareClick(e));\n\n\n//# sourceURL=webpack://knights-travails/./src/DOM/knight.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _knights_travails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knights-travails */ \"./src/knights-travails.js\");\n/* harmony import */ var _DOM_knight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM/knight */ \"./src/DOM/knight.js\");\n\n\n\n\n//# sourceURL=webpack://knights-travails/./src/index.js?");

/***/ }),

/***/ "./src/knights-travails.js":
/*!*********************************!*\
  !*** ./src/knights-travails.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Knight)\n/* harmony export */ });\nclass Knight {\n\tconstructor() {\n\t\tthis.board = Array.from({ length: 8 }, () => Array(8).fill(0));\n\t}\n\n\tstatic isOutOfBounds = ([x, y]) => x < 0 || x > 7 || y < 0 || y > 7;\n\n\tstatic isPositionMatching = (positionA, positionB) =>\n\t\tJSON.stringify(positionA) === JSON.stringify(positionB);\n\n\tstatic logPath(backtrackMoves) {\n\t\tconst isOneMove = backtrackMoves.length - 1 === 1;\n\n\t\tconsole.log(\n\t\t\t`You made it in ${backtrackMoves.length - 1} ${\n\t\t\t\tisOneMove ? \"move\" : \"moves\"\n\t\t\t}! Here's your path:`\n\t\t);\n\n\t\tfor (let i = 0; i < backtrackMoves.length; i += 1) {\n\t\t\tconsole.log(backtrackMoves[i]);\n\t\t}\n\t}\n\n\tstatic isValidMove(start, end) {\n\t\treturn (\n\t\t\t[start, end].every(Array.isArray) &&\n\t\t\t[...start, ...end].every((item) => Number.isInteger(item)) &&\n\t\t\tstart.length === 2 &&\n\t\t\tend.length === 2 &&\n\t\t\t!Knight.isOutOfBounds(start) &&\n\t\t\t!Knight.isOutOfBounds(end)\n\t\t); // there is bug if you nest arrays\n\t}\n\n\tgetPossibleMoves() {\n\t\tconst [currentX, currentY] = this.currentPosition;\n\n\t\tconst possibleMoves = [\n\t\t\t// top left\n\t\t\t[currentX + 1, currentY - 2],\n\t\t\t[currentX + 2, currentY - 1],\n\t\t\t// top right\n\t\t\t[currentX + 2, currentY + 1],\n\t\t\t[currentX + 1, currentY + 2],\n\t\t\t// bottom left\n\t\t\t[currentX - 1, currentY - 2],\n\t\t\t[currentX - 2, currentY - 1],\n\t\t\t// bottom right\n\t\t\t[currentX - 2, currentY + 1],\n\t\t\t[currentX - 1, currentY + 2],\n\t\t];\n\n\t\treturn possibleMoves.filter(\n\t\t\t([x, y]) => !Knight.isOutOfBounds([x, y]) && this.board[x][y] === 0\n\t\t);\n\t}\n\n\tgetPath(start, [endX, endY]) {\n\t\tconst backtrackMoves = [[endX, endY]];\n\t\tlet [currentX, currentY] = this.board[endX][endY];\n\t\twhile (true) {\n\t\t\tif (Knight.isPositionMatching(start, [currentX, currentY])) {\n\t\t\t\tbacktrackMoves.push(start);\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tbacktrackMoves.push([currentX, currentY]);\n\t\t\t[currentX, currentY] = this.board[currentX][currentY];\n\t\t}\n\n\t\treturn backtrackMoves.reverse();\n\t}\n\n\tmove(start = [0, 0], end = [0, 0]) {\n\t\tif (!Knight.isValidMove(start, end)) {\n\t\t\tconsole.log(\"Invalid move\");\n\t\t\treturn;\n\t\t}\n\n\t\tthis.resetBoard();\n\t\tconst queue = [start];\n\t\tthis.currentPosition = start;\n\t\tthis.board[start[0]][start[1]] = start;\n\n\t\twhile (!Knight.isPositionMatching(queue[0], end)) {\n\t\t\tqueue.shift();\n\t\t\tthis.getPossibleMoves().forEach(([x, y]) => {\n\t\t\t\tqueue.push([x, y]);\n\t\t\t\tthis.board[x][y] = this.currentPosition;\n\t\t\t});\n\n\t\t\tthis.currentPosition = queue[0];\n\t\t}\n\t\treturn this.getPath(start, end);\n\t}\n\n\tresetBoard() {\n\t\tthis.board = Array.from({ length: 8 }, () => Array(8).fill(0));\n\t}\n}\n\n\n//# sourceURL=webpack://knights-travails/./src/knights-travails.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;