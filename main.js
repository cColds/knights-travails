/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM/knight.js":
/*!***************************!*\
  !*** ./src/DOM/knight.js ***!
  \***************************/
/***/ (() => {

eval("const squares = document.querySelectorAll(\".square\");\n\nsquares.forEach((square) =>\n\tsquare.addEventListener(\"click\", (e) => console.log(e.target))\n);\n\n//\n\n\n//# sourceURL=webpack://knights-travails/./src/DOM/knight.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _knights_travails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knights-travails */ \"./src/knights-travails.js\");\n/* harmony import */ var _DOM_knight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM/knight */ \"./src/DOM/knight.js\");\n/* harmony import */ var _DOM_knight__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_DOM_knight__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n//# sourceURL=webpack://knights-travails/./src/index.js?");

/***/ }),

/***/ "./src/knights-travails.js":
/*!*********************************!*\
  !*** ./src/knights-travails.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Knight)\n/* harmony export */ });\nclass Knight {\n\tconstructor() {\n\t\tthis.board = Array.from({ length: 8 }, () => Array(8).fill(0));\n\t}\n\n\tstatic isOutOfBounds = ([x, y]) => x < 0 || x > 7 || y < 0 || y > 7;\n\n\tstatic isPositionMatching = (positionA, positionB) =>\n\t\tJSON.stringify(positionA) === JSON.stringify(positionB);\n\n\tgetPossibleMoves() {\n\t\tconst [currentX, currentY] = this.currentPosition;\n\n\t\tconst possibleMoves = [\n\t\t\t// top left\n\t\t\t[currentX + 1, currentY - 2],\n\t\t\t[currentX + 2, currentY - 1],\n\t\t\t// top right\n\t\t\t[currentX + 2, currentY + 1],\n\t\t\t[currentX + 1, currentY + 2],\n\t\t\t// bottom left\n\t\t\t[currentX - 1, currentY - 2],\n\t\t\t[currentX - 2, currentY - 1],\n\t\t\t// bottom right\n\t\t\t[currentX - 2, currentY + 1],\n\t\t\t[currentX - 1, currentY + 2],\n\t\t];\n\n\t\treturn possibleMoves.filter(\n\t\t\t([x, y]) => !Knight.isOutOfBounds([x, y]) && this.board[x][y] === 0\n\t\t);\n\t}\n\n\tlogPath(start, [endX, endY]) {\n\t\tconst backtrackMoves = [[endX, endY]];\n\t\tlet [currentX, currentY] = this.board[endX][endY];\n\t\twhile (true) {\n\t\t\tif (Knight.isPositionMatching(start, [currentX, currentY])) {\n\t\t\t\tbacktrackMoves.push(start);\n\t\t\t\tconst isOneMove = backtrackMoves.length - 1 === 1;\n\n\t\t\t\tconsole.log(\n\t\t\t\t\t`You made it in ${backtrackMoves.length - 1} ${\n\t\t\t\t\t\tisOneMove ? \"move\" : \"moves\"\n\t\t\t\t\t}! Here's your path:`\n\t\t\t\t);\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tbacktrackMoves.push([currentX, currentY]);\n\t\t\t[currentX, currentY] = this.board[currentX][currentY];\n\t\t}\n\n\t\tlet i = backtrackMoves.length - 1;\n\t\twhile (i >= 0) {\n\t\t\tconsole.log(backtrackMoves[i]);\n\t\t\ti -= 1;\n\t\t}\n\t}\n\n\tstatic isValidMove(start, end) {\n\t\treturn (\n\t\t\tArray.isArray(start) &&\n\t\t\tArray.isArray(end) &&\n\t\t\tstart.length === 2 &&\n\t\t\tend.length === 2 &&\n\t\t\t[...start, ...end].some((item) => Number.isInteger(item)) &&\n\t\t\t!Knight.isOutOfBounds(start) &&\n\t\t\t!Knight.isOutOfBounds(end)\n\t\t);\n\t}\n\n\tmove(start = [0, 0], end = [0, 0]) {\n\t\tif (!Knight.isValidMove(start, end)) {\n\t\t\tconsole.log(\"Invalid move\");\n\t\t\treturn;\n\t\t}\n\n\t\tconst queue = [start];\n\t\tthis.currentPosition = start;\n\t\tthis.board[start[0]][start[1]] = start;\n\n\t\twhile (!Knight.isPositionMatching(queue[0], end)) {\n\t\t\tqueue.shift();\n\n\t\t\tthis.getPossibleMoves().forEach(([x, y]) => {\n\t\t\t\tqueue.push([x, y]);\n\t\t\t\tthis.board[x][y] = this.currentPosition;\n\t\t\t});\n\n\t\t\tthis.currentPosition = queue[0];\n\t\t}\n\t\tthis.logPath(start, end);\n\t}\n}\n\n\n//# sourceURL=webpack://knights-travails/./src/knights-travails.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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