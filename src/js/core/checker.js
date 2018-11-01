// 检查数据解决方案
function checkArray(array) {
  const length = array.length;
  const marks = new Array(length);
  marks.fill(true);
  for (let i = 0; i < length - 1; i++) {
    if (!marks[i]) {
      continue;
    }
    const v = array[i];

    // 跳过对0的检查
    // if (!v) {
    //   marks[i] = false;
    //   continue;
    // }

    // 是否有重复
    // 跳过对0的检查
    for (let j = i + 1; j < length; j++) {
      if (v === array[j] && v !== 0) {
        marks[i] = marks[j] = false;
      }
    }
  }
  return marks;
}

// console.log(checkArray([1, 2, 3, 4, 5, 4, 5, 4, 7, 8]));

// 输入matrix,用户完成的数据 9*9；
// 对matrix处理，检查每行每列每宫， 并填写marks
// 输出检查是否成功
const Toolkit = require('./toolkit');
class Checker {
  constructor(matrix) {
    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  get matrixMarks() {
    return this._matrixMarks;
  }

  get isSuccess() {
    return this._success;
  }

  check() {
    this.checkRows();
    this.checkCols();
    this.checkBoxes();

    // 检查是否成功
    this._success = this._matrixMarks.every(row => row.every(mark => mark));
    return this._success;
  }

  checkRows() {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this._matrix[rowIndex];
      const marks = checkArray(row);
      for (let colIndex = 0; colIndex < marks.length; colIndex++) {
        if (!marks[colIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkCols() {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cols = [];
      for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        cols[rowIndex] = this._matrix[rowIndex][colIndex];
      }
      const marks = checkArray(cols);
      for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
        if (!marks[rowIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkBoxes() {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
      const marks = checkArray(boxes);
      for (let cellIndex = 0; cellIndex < marks.length; cellIndex++) {
        if (!marks[cellIndex]) {
          const { rowIndex, colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }
}

module.exports = Checker;

// 测试代码

// const Generate = require('./generator');
// console.log(Generate)
// const gen = new Generate();
// gen.gernerate();
// const matrix = gen.matrix;
// const checker = new Checker(matrix);
// console.log(checker.check());
// console.log(checker.matrixMarks);
// matrix[1][2] = 1;
// matrix[7][9] = 3;
// matrix[1][4] = 2
// console.log(matrix);
// console.log(checker.check());
// console.log(checker.matrixMarks);