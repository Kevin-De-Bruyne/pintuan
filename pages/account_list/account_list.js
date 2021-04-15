// pages/account_list/account_list.js
const API = require('../../utils/util.js');
const token = wx.getStorageSync('token');
import Dialog from '../../vant/dialog/dialog';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.6,
    type:'',
    data:{},
    show:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    })
  },
  gotx(){
    wx.navigateTo({
      url: `/pages/withdraw/withdraw?type=${this.data.type}`
    })
  },
  goduihuan(){
    Dialog.confirm({
      title: '提示',
      message: '兑换成功后，补贴金额将全部转为余额，补贴金额清零',
    })
    .then(() => {
      API._post('api/user/exchange',{
        token:token,
      }).then(res => {
        if(res.code==500){
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon:'none',
            success:()=>{
              setTimeout(()=>{
                wx.navigateBack();
              },700)
            }
          })
        }
      }).catch(res => {
          //wx.showToast({ title:"网络访问错误", icon: 'none' })
      });
    })
    .catch(() => {
      
    });

  },
  getData(){
    let token=wx.getStorageSync('token')
    API._post('api/user/account_list',{
      token:token,
      type:this.data.type
    }).then(res => {
      this.setData({
        data:res.data
      })
      if(this.data.data==''){
          this.setData({
            show:3
          })
      }else{
        if(this.data.type==2){
          this.setData({
            show:1
          })
        }else{
          this.setData({
            show:2
          })
        }
      }
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