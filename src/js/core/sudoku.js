// 生成数独游戏

// 生成完成的解放方案
// 随机去除部分数据--按比例

const Generate = require('./generator');

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