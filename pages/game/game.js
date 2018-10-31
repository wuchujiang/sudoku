// pages/game.js
const { sectionToChinese, numToMinute } = require('../../utils/util.js');
const levelData = require('./gameData.js');

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
    rowindex: '',
    pause: false,
    markHash: {}, // 用于存放标记的单元格 1x1。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const level = parseInt(options.level || 1);
    this.setData({
      level, // 关卡
      uppercaseLevel: sectionToChinese(level),
      levelData: levelData[level-1], // 游戏数据
      defaultLevelData: levelData[level - 1], // 默认数据
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
    console.log(e);
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
      this.setData({
        levelData,
      });
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

  restartAction() {
    console.log('重新开始游戏')
    this.setData({
      time: 0, 
      levelData: this.data.defaultLevelData,
      markHash: {},
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
    this.stopTiming();
    // 页面离开时存储游戏时间
    const levelRecord = wx.getStorageSync('levelRecord') || {};
    levelRecord[`level_${this.level}`].time = this.time;
    wx.setStorageSync('levelRecord', levelRecord);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})