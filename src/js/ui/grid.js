const Toolkit = require('../core/toolkit');
const Generate = require('../core/generator');
const Sudoku = require('../core/sudoku');
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