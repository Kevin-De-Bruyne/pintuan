// pages/mine/fuwu/user_xieyi/user_xieyi.js
const app = getApp()
const API = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height *1.3,
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getData(){
    API._post('api/login/agreement',{
    }).then(res => {
      this.setData({
        data:res.data[2].desc
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
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