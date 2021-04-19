// pages/qr_code/qr_code.js
const app = getApp()
const API = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData(){
    let token=wx.getStorageSync('token')
    API._post('api/user/qr_code',{
      token:token
    }).then(res => {
      this.setData({
        data:res.qrcode
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
    return {
      title: '拼购小程序',
      path: '/pages/index/index', // 好友点击分享之后跳转到的小程序的页面
      desc: '推广赚钱',  // 看你需要不需要，不需要不加
      imageUrl: '../../images/goods.png'
    }

  }
})