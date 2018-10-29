// pages/game.js
const { sectionToChinese } = require('../../utils/util.js');
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const level = parseInt(options.level || 1);
    this.setData({
      level: level,
      uppercaseLevel: sectionToChinese(level),
      levelData: levelData[level-1],
    });
  },

  // 开始游戏计时
  startTiming() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      let {time} = this.data;
      this.setData({
        time: ++time,
      });
    }, 1000);
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
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})