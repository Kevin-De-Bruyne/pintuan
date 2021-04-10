// pages/category/category.js
const API = require('../../utils/util.js');
const app = getApp();
const token = wx.getStorageSync('token');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.3,
    cateIndex:0,
    data:{},
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goodsClick(e){
    const {index}=e.currentTarget.dataset
    let id=this.data.goods[index].goods_id
    wx.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${id}`,
    })
  },
  getData(){
    let token=wx.getStorageSync('token')
    API._post('api/index/classification',{
      token:token
    }).then(res => {
      this.setData({
        data:res.data,
        goods:res.data.goods_list
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  cateClick(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      cateIndex:index
    })
    // console.log(this.data.data.category1[index].id)
    API._post('api/index/classification',{
      token:token,
      id:this.data.data.category1[index].id
    }).then(res => {
      this.setData({
        goods:res.data.goods_list
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
    this.getData()
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