// level/level.js
const { numToMinute} = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levels: [],
    contentClass: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let levelRecord = {};
    try {
      levelRecord = wx.getStorageSync('levelRecord') || {};
     
    } catch(e) {
      console.log(e);
    }
    const array = [];
    for (let i = 0; i < 24; i++) {
      const levelDataItem = levelRecord['level_' + (i + 1)];
      array.push({
        level: i + 1,
        time: levelDataItem ? numToMinute(levelDataItem.time) : '',
        complete: levelDataItem && levelDataItem.complete,
        lock: i === 0 ? false : levelDataItem ? false : true,
      });
    }
    this.setData({
      levels: array
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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