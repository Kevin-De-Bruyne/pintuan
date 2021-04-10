// pages/shouquan/shouquan.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.4,
    checked:true,
    canIUseGetUserProfile: false,
    code:'',
    uid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
        wx.login({
          success: res => {
              console.log(res)
              this.setData({
                code:res.code
              })
            }
          })
  },
  getUserProfile(e) {
    let uid=wx.getStorageSync('uid')
    this.setData({
      uid:uid
    })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (ress) => {
        // this.setData({
        //   userInfo: res.userInfo,
        //   hasUserInfo: true
        // })
        console.log(ress)
        // wx.login({
        //   success: res => {
        //       console.log(res)
        //       var code=res.code
        //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //       if(res.code!=''){
                  // this.getuserinfo().then(res=>{
                      url._post('api/login/wx_login',{
                          code: this.data.code,
                          userInfo:ress.userInfo,
                          iv:ress.iv,
                          signature:ress.signature,
                          rawData:ress.rawData,
                          encryptedData:ress.encryptedData,
                          uid:this.data.uid
                      }).then(data => {
                          if(data.code == 200){
                            wx.setStorageSync("token",data.token)
                            wx.switchTab({
                              url: '/pages/index/index',
                            })
                            wx.showToast({
                              title: '授权成功',
                              icon:'none'
                            })
                          }else{
                              
                          }
                      }).catch(res => {
                          wx.showToast({ title:"获取用户信息失败，请重新访问！", icon: 'none' })
                      })
                  // })
      //         }
             
      //     }
          
      // })
      }
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
    let uid=wx.getStorageSync('uid')
    this.setData({
      uid:uid
    })
    console.log(e.detail)
    if(this.data.checked==false){
      wx.showToast({
        title: '请勾选协议',
        icon:'none'
      })
    }else{
      if (e.detail.userInfo){
        console.log(this.data.uid)
        //用户按了允许授权按钮
        wx.login({
          success: res => {
              console.log(res)
              var code=res.code
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              if(res.code!=''){
                  // this.getuserinfo().then(res=>{
                      console.log(res)
                      url._post('api/login/wx_login',{
                          code: code,
                          userInfo:e.detail.userInfo,
                          iv:e.detail.iv,
                          signature:e.detail.signature,
                          rawData:e.detail.rawData,
                          encryptedData:e.detail.encryptedData,
                          uid:this.data.uid
                      }).then(data => {
                          if(data.code == 200){
                            wx.setStorageSync("token",data.token)
                            wx.switchTab({
                              url: '/pages/index/index',
                            })
                            wx.showToast({
                              title: '授权成功',
                              icon:'none'
                            })
                          }else{
                              
                          }
                      }).catch(res => {
                          wx.showToast({ title:"获取用户信息失败，请重新访问！", icon: 'none' })
                      })
                  // })
              }
             
          }
          
      })
                            
                    
      } else {
        //用户按了拒绝按钮
      }
    }
    
  },
  check(){
    this.setData({
      checked:!this.data.checked
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