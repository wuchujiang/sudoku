// 生成数独解决方案
const Toolkit = require('./toolkit');

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