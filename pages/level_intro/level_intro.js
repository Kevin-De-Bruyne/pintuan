// pages/level_intro/level_intro.js
const API = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.3,
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  invite(){
    wx.navigateTo({
      url: '/pages/qr_code/qr_code',
    })
  },
  getData(){
    let token=wx.getStorageSync('token')
    API._post('api/user/level_detail',{
      token:token
    }).then(res => {
      this.setData({
        data:res
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
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