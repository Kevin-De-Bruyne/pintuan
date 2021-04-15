// pages/mine/mine.js
const app = getApp()
const API = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:[
    {
      name:'我的收藏',
      path:'iconfont icon-shoucang',
      url:'/pages/collect/collect'
    },
    {
      name:'我的团队',
      path:'iconfont icon-wodetuandui',
      url:'/pages/team_member/team_member'
    },
    {
      name:'收货地址',
      path:'iconfont icon-shouhuodizhi',
      url:'/pages/address/address'
    },
    // {
    //   name:'联系客服',
    //   path:'iconfont icon-lianxikefu'
    // },
    {
      name:'常见问题',
      path:'iconfont icon-changjianwenti',
      url:'/pages/mine/changjian/changjian'
    },
    {
      name:'服务协议',
      path:'iconfont icon-fuwuxieyi',
      url:'/pages/mine/fuwu/fuwu'
    },
    {
      name:'商务合作',
      path:'iconfont icon-shangwu'
    }
    ],
    data:{},
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSetting({
    //   success: function(res){
    //       console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
           
    //       wx.getUserInfo({
    //         success:res=> {
              
    //         }
    //       })
    //     }else{
    //       wx.navigateTo({
    //         url: '/pages/shouquan/shouquan',
    //       })
    //       wx.showToast({
    //         title: '请授权登录',
    //         icon:'none'
    //       })
    //     }
    //   }
    // })
  },
  money_list(){
    wx.navigateTo({
      url: `/pages/account_list/account_list?type=${0}`,
    })
  },
  butie_list(){
    wx.navigateTo({
      url: `/pages/account_list/account_list?type=${2}`,
    })
  },
  shouyi(){
    wx.navigateTo({
      url: `/pages/account_list/account_list?type=${1}`,
    })
  },
  setting(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  closepop(){
    this.setData({ show: false });
  },
  popup(){
    this.setData({ show: true });
  },
  handleContact(r){
    console.log(r.detail)
},
  listClick(e){
    const {index}=e.currentTarget.dataset
    if(index==5){
      this.setData({ show: true });
    }else{
      wx.navigateTo({
        url: this.data.icon[index].url,
      })
    }
  },
  iconClick(e){
    const {index}=e.currentTarget.dataset
    let active=''
    if(this.data.data.icon[index].txt=='拼团中'){
      active=1
    }else if(this.data.data.icon[index].txt=='待发货'){
      active=2
    }else if(this.data.data.icon[index].txt=='已发货'){
      active=3
    }else{
      active=4
    }
    wx.navigateTo({
      url: `/pages/order_list/order_list?active=${active}`,
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
   copywx: function (e) {
    var that = this;
    wx.setClipboardData({
     data:this.data.data.wechat_num.value,
     success: function (res) {
       wx.showToast({
         title: '复制成功',
         icon:'none',
       })
       that.setData({
         show:false
       })
     }
    });
   },
  getData(){
    let token=wx.getStorageSync('token')
    API._post('api/user/index',{
      token:token
    }).then(res => {
      this.setData({
        data:res.data
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