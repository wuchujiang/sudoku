/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Grid = __webpack_require__(1);
	
	new Grid($('#container')).build();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Toolkit = __webpack_require__(2);
	const Generate = __webpack_require__(3);
	const Sudoku = __webpack_require__(4);
	module.exports = class Grid {
	  constructor(container) {
	    this._$container = container;
	  }
	  build() {
	    const sudoku = new Sudoku();
	    sudoku.make();
	    const matrix = sudoku.puzzleMatrix;
	    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
	    const colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right'];
	
	    const $cells = matrix.map(rowValues => rowValues.map((cellValue, cellIndex) => {
	      return $('<span>')
	        .addClass('lat')
	        .addClass(cellValue === 0 ? 'empty' : '')
	        .addClass(colGroupClasses[cellIndex % 3])
	        .text(cellValue);
	    }));
	
	    const $divArrays = $cells.map(($spanArray, rowIndex) => {
	      return $('<div>')
	        .addClass('column')
	        .addClass(rowGroupClasses[rowIndex % 3])
	        .append($spanArray);
	    });
	    this._$container.append($divArrays);
	  }
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// 宫坐标系工具
	const boxToolit = {
	  converToBoxIndex(rowIndex, colIndex) {
	    return {
	      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
	      cellIndex: rowIndex % 3 * 3 + colIndex % 3,
	    }
	  },
	
	  convertFromBoxIndex(boxIndex, cellIndex) {
	    return {
	      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
	      colIndex: boxIndex % 3 * 3 + cellIndex % 3,
	    }
	  },
	  getBoxCells(matrix, boxIndex) {
	    const startRowIndex = Math.floor(boxIndex / 3) * 3;
	    const startColIndex = boxIndex % 3 * 3;
	    const result = [];
	    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
	      const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
	      const colIndex = startColIndex + cellIndex % 3;
	      result.push(matrix[rowIndex][colIndex]);
	    }
	    return result;
	  }
	
	};
	
	const matriToolkit = {
	  makeRow(v = 0) {
	    const array = new Array(9);
	    array.fill(v);
	    return array;
	  },
	
	  makeMatrix(v = 0) {
	    const array = Array.from({ length: 9 }, () => this.makeRow(v));
	    return array;
	  },
	
	  // 数组洗牌算法-数组随机排序
	  shuffle(array) {
	    const endIndex = array.length - 2;
	    for (let i = 0; i < endIndex; i++) {
	      const j = i + Math.floor(Math.random() * (array.length - i));
	      [array[i], array[j]] = [array[j], array[i]];
	    }
	    return array;
	  },
	
	  // 检查制定位置可以填写数字n
	  checkFillable(matrix, n, rowIndex, colIndex) {
	    const row = matrix[rowIndex];
	    const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
	    const { boxIndex } = boxToolit.converToBoxIndex(rowIndex, colIndex);
	    const box = boxToolit.getBoxCells(matrix, boxIndex);
	    for (let i = 0; i < 9; i++) {
	      if (row[i] === n || column[i] === n || box[i] === n) {
	        return false;
	      }
	    }
	    return true;
	  }
	
	};
	
	
	module.exports = class Toolkit {
	
	  // 矩阵和数据相关工具
	  static get matrix() {
	    return matriToolkit;
	  };
	
	  // 宫坐标系相关工具
	  static get box() {
	    return boxToolit;
	  }
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	// 生成数独解决方案
	const Toolkit = __webpack_require__(2);
	
	class Generator {
	  gernerate() {
	    while (!this.internalGernerate()) {
	      console.warn('try again');
	    }
	  }
	
	  internalGernerate() {
	    // todo入口方案
	    this.matrix = Toolkit.matrix.makeMatrix();
	    this.orders = this.matrix
	      .map(row => row.map((v, i) => i))
	      .map(m => Toolkit.matrix.shuffle(m));
	    return Toolkit.matrix.makeRow().every((item, i) => this.fillNumber(i + 1));
	  }
	
	  fillNumber(n) {
	    return this.fillRow(n, 0);
	  }
	
	  fillRow(n, rowIndex) {
	    // 当前行填写成功，递归调用fillRow填写下一行
	    if (rowIndex > 8) {
	      return true;
	    }
	
	    const row = this.matrix[rowIndex];
	    const orders = this.orders[rowIndex];
	    for (let i = 0; i < 9; i++) {
	      const colIndex = orders[i];
	      // 如果这个位置有值
	      if (row[colIndex]) {
	        continue;
	      }
	
	      // 检查这个位置是否可以填写n
	      if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
	        continue;
	      }
	
	      row[colIndex] = n;
	
	      // 去下一行填写n，如没有填进去，就继续寻找当前行下一个位置
	      if (!this.fillRow(n, rowIndex + 1)) {
	        row[colIndex] = 0;
	        continue;
	      }
	
	      return true;
	    }
	
	    return false;
	  }
	}
	
	const generate = new Generator();
	generate.gernerate();
	console.log(generate.matrix);
	
	module.exports = Generator;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	// 生成数独游戏
	
	// 生成完成的解放方案
	// 随机去除部分数据--按比例
	
	const Generate = __webpack_require__(3);
	
	module.exports = class Sudoku {
	  constructor() {
	    // 生成完成解决方案
	    const generator = new Generate();
	    generator.gernerate();
	    this.solutionMatrix = generator.matrix;
	  }
	
	  make(level = 5) {
	    const shouldRid = Math.random() * 9 < level;
	    // 生成密盘
	    this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => {
	      return Math.random() * 9 < level ? 0 : cell;
	    }));
	  }
	}

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map