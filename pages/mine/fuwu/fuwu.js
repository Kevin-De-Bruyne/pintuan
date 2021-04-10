// pages/mine/fuwu/fuwu.js
const app = getApp()
const API = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.4
  },
  goUser(){
    wx.navigateTo({
      url: '/pages/mine/fuwu/user_xieyi/user_xieyi',
    })
  },
  goyinsi(){
    wx.navigateTo({
      url: '/pages/mine/fuwu/yinsi_xieyi/yinsi_xieyi',
    }) 
  },
  gopintuan(){
    wx.navigateTo({
      url: '/pages/mine/fuwu/pintuan_xieyi/pintuan_xieyi',
    }) 
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