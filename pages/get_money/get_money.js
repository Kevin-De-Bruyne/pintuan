// pages/get_money/get_money.js
const app = getApp()
const API = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  tuiguang(){
    wx.navigateTo({
      url: '/pages/qr_code/qr_code',
    })
  },
  copy: function (e) {
    var that = this;
    wx.setClipboardData({
     data: this.data.data.invite,
     success: function (res) {
       wx.showToast({
         title: '复制成功',
         icon:'none',
       })
     }
    });
   },
  getData(){
    let token=wx.getStorageSync('token')
    API._post('api/user/making_money',{
      token:token
    }).then(res => {
      this.setData({
        data:res
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  tx_now(){
    wx.navigateTo({
      url: `/pages/withdraw/withdraw?type=${1}`,
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