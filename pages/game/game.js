// pages/game.js
const { sectionToChinese, numToMinute } = require('../../utils/util.js');
const levelData = require('./gameData.js');
const Checker = require('../../src/js/core/checker');
const Toolkit = require('../../src/js/core/toolkit');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: 1,
    uppercaseLevel: '',
    levelData: [],
    time: 0,
    formatTime: '00:00',
    colIndex: '',
    rowIndex: '',
    pause: false,
    markHash: {}, // 用于存放标记的单元格 1x1。
    statusTableData: [], // 错误对照表
    success: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const level = parseInt(options.level || 1);
    const levelRecord = wx.getStorageSync('levelRecord');
    const levelRecordData = levelRecord[`level_${level}`] || {};
    const gameData = levelRecordData && levelRecordData.gameData ? levelRecordData.gameData : null;
    this.setData({
      level, // 关卡
      time: levelRecordData.time || 0,
      uppercaseLevel: sectionToChinese(level),
      levelData: gameData ? gameData.levelData : levelData[level-1], // 游戏数据
      defaultLevelData: levelData[level - 1], // 默认数据
      statusTableData: gameData ? gameData.statusTableData : Toolkit.matrix.makeMatrix(true),
      markHash: gameData ? gameData.markHash : {},
      rowIndex: gameData ? gameData.rowIndex : '',
      colIndex: gameData ? gameData.colIndex : '',
    });
  },

  // 开始游戏计时
  startTiming() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      let {time} = this.data;
      time +=1;
      this.setData({
        time: time,
        formatTime: numToMinute(time)
      });
    }, 1000);
  },
  stopTiming() {
    //清除计时器
    clearInterval(this.timer);
  },

  // 点击数独格子
  inputSudoku(e) {
    const { input, colindex, rowindex, value, selected } = e.currentTarget.dataset;
    // 允许输入
    if(input) {
      // 设置当前选择的单元格坐标
      this.setData({
        rowIndex: !selected ? rowindex : '',
        colIndex: !selected ? colindex : '',
      });
    }
  },

  // 填充数字
  inputNumber(e) {
    const {number} = e.target.dataset;
    const {rowIndex, colIndex, levelData} = this.data;
    if(rowIndex !== '' && colIndex !== '') {
      levelData[rowIndex][colIndex] = number;
      const checker = new Checker(levelData);
      checker.check();
      this.setData({
        levelData,
        statusTableData: checker._matrixMarks,
      }, () => {
        this.checkComplete();
      });
    }
  },

  // 检查所有空格是否全部填完
  checkComplete() {
    const { levelData } = this.data;
    if (levelData.every(v => v.every(k => k !== 0))) {
      // 开始检查是否填写正确
      const checker = new Checker(levelData);
      if (checker.check()) {
        console.log('完成游戏！')
        this.setData({
          success: true,
        });
        this.stopTiming();
        // 存储游戏时间和关卡
        const levelRecord = wx.getStorageSync('levelRecord');
        levelRecord[`level_${this.level}`] = {
          time: this.time,
          complete: true,
        }
        wx.setStorageSync('levelRecord', levelRecord);
      } else {
        console.log('有错误!!!');
      }
    }
  },

  // 删除
  deleteAction() {
    const {rowIndex, colIndex, levelData} = this.data;
    // 删除选中的数字
    if (rowIndex !== '' && colIndex !== '' && levelData[rowIndex][colIndex] !== '') {
      levelData[rowIndex][colIndex] = 0;
      this.setData({
        levelData,
      });
    }
  },

  // 暂停游戏
  pauseAction() {
    this.stopTiming();
    this.setData({
      pause: true,
    });
  },

  // 取消暂停游戏
  unPauseAction() {
    this.startTiming();
    this.setData({
      pause: false,
    });
  },

  // 标记单元格
  markAction() {
    const {markHash, colIndex, rowIndex} = this.data;
    if(colIndex !=='' && rowIndex !== '') {
      // 判断是否已经是标记的，如果已经标记了，那么取消标记
      let key = `${colIndex}-${rowIndex}`;
      if(markHash[key]) {
        delete markHash[key];
      }else{
        markHash[key] = true;
      }
      this.setData(markHash);
    }
  },

  // 重新开始游戏
  restartAction() {
    console.log('重新开始游戏')
    this.setData({
      time: 0, 
      levelData: this.data.defaultLevelData,
      markHash: {},
      statusTableData: Toolkit.matrix.makeMatrix(true),
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.startTiming();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.startTiming();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.stopTiming();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('页面卸载啦~~~')
    this.stopTiming();

    //判断游戏是否结束，如果没有结束， 那么存储当前游戏记录
    const levelRecord = wx.getStorageSync('levelRecord') || {};
    const { levelData, level, time, statusTableData, markHash, rowIndex, colIndex, success } = this.data;
    if (!success) {
      levelRecord[`level_${level}`] = {
        time,
        complete: false,
        gameData: {
          levelData,
          statusTableData,
          markHash,
          rowIndex,
          colIndex,
        },
      };
      wx.setStorageSync('levelRecord', levelRecord);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})