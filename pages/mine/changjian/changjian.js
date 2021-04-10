// pages/mine/changjian/changjian.js
const API = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.4,
    activeNames: ['1'],
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getData(){
    API._post('api/index/problem',{
      
    }).then(res => {
      this.setData({
        data:res.data
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
    console.log(this.data.activeNames)
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
    this.getData();
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