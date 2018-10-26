// 生成数独游戏

// 生成完成的解放方案
// 随机去除部分数据--按比例

const Generate = require('./generator');
const fs = require('fs');

class Sudoku {
  constructor() {
    // 生成完成解决方案
    const generator = new Generate();
    generator.gernerate();
    this.solutionMatrix = generator.matrix;
  }

  make(level = 5) {
    // 生成密盘
    this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => {
      return Math.random() * 9 < level ? 0 : cell;
    }));
    return this.puzzleMatrix;
  }
}

const sudoku = new Sudoku();
const result = [];
for (let i = 0; i < 20; i++) {
  const level = (7 - 3) / 20 * i + 3;
  result.push(sudoku.make(level));
}

console.log(result);