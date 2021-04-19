// pages/order_list/order_list.js
const API = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.3,
    active: '',
    order:[],
    order_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active:options.active
    })
  },
  getData(){
    let token=wx.getStorageSync('token')
    API._post('api/user/team_order_list',{
      token:token
    }).then(res => {
      this.setData({
        order:res.order
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  orderClick(e){
    const {index}=e.currentTarget.dataset
    console.log(this.data.order[index].follow_id)
    let follow_id=this.data.order[index].follow_id
    wx.navigateTo({
      url: `/pages/order_detail/order_detail?follow_id=${follow_id}`,
    })
  },
  onChange(event) {
    console.log(event)
    
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index}`,
    //   icon: 'none',
    // });
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