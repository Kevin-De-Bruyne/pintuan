// pages/order_detail/order_detail.js
const API = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.3,
    follow_id:'',
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.follow_id)
    this.setData({
      follow_id:options.follow_id
    })
  },
  confirm(){
    let token=wx.getStorageSync('token')
    API._post('api/user/team_order_confirm',{
      token:token,
      follow_id:this.data.data.order.follow_id
    }).then(res => {
     if(res.code==200){
       wx.showToast({
         title: res.msg,
         icon:'none'
       })
       wx.navigateBack()
     }
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
  },
  getData(){
    let token=wx.getStorageSync('token')
    API._post('api/user/team_order_list_detail',{
      token:token,
      follow_id:this.data.follow_id
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