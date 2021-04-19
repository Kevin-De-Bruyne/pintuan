// pages/pwd_setting/pwd_setting.js
const app = getApp()
const API = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.3,
    oldpwd:'',
    newpwd:'',
    confirmpwd:'',
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    this.setData({
      type:options.type
    })
  },
  submit(){
    let token=wx.getStorageSync('token')
    API._post('api/user/paypwd',{
      token:token,
      old_password:this.data.oldpwd,
      new_password:this.data.newpwd,
      confirm_password:this.data.confirmpwd
    }).then(res => {
      if(res.code==200){
       wx.navigateBack();
       }
      wx.showToast({
        title: res.msg,
        icon:'none'
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