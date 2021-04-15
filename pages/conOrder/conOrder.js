// pages/conOrder/conOrder.js
const app = getApp()
const API = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    yuchecked:true,
    goods_id:'',
    data:{},
    address:{},
    user_note:'',
    yue_show:true,
    pay_type:1,
    pwd:'',
    spec_id:'',
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
    this.setData({
      goods_id:options.goods_id,
      spec_id:options.spec_id
    })
    console.log(this.data.goods_id)
    // this.getData();
  },
  closepop(){
    this.setData({
      show:false
    })
  },
  showpay_pop(){
    this.setData({
      show:true
    })
  },
  onClose(){
    this.setData({
      show:false
    })
  },
  pay(){
    this.setData({
      show:false
    })
    let token=wx.getStorageSync('token')
      API._post('api/goods/join_team',{
        token:token,
        goods_id:this.data.goods_id,
        spec_key:'',
        user_note:this.data.user_note,
        address_id:this.data.data.address.address_id,
        pay_type:this.data.pay_type,
        pay_pwd:this.data.pwd
      }).then(res => {
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
        if(this.data.data.is_pay_pwd==0){
          let type=this.data.data.is_pay_pwd
          wx.navigateTo({
            url: `/pages/pwd_setting/pwd_setting?type=${type}`,
          })
          wx.showToast({
            title: '请先设置交易密码',
            icon:'none'
          })
        }
        if(res.code==200){
          wx.showToast({
            title: res.msg,
            icon:'none',
            success: function () {
              setTimeout(function(){
                wx.navigateTo({
                  url: '/pages/order_list/order_list'
                })
              },2000)
            
            }
          })
       
        
        }
      }).catch(res => {
          //wx.showToast({ title:"网络访问错误", icon: 'none' })
      });
    
  
  },
  onInput(e){
    this.setData({
      user_note:e.detail.value
    })
  },
  getData(){
    let token=wx.getStorageSync('token')
    API._post('api/goods/join_team_page',{
      token:token,
      goods_id:this.data.goods_id,
      spec_key:this.data.spec_id
    }).then(res => {
      this.setData({
        data:res
      })
      this.data.data.address.forEach((item,index)=>{
        if(item.is_default==1){
          this.data.address=item
        }
      })
      console.log(this.data.address)
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  add_address(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  onChange(event) {
    this.setData({
      checked:!this.data.checked,
      yuchecked:!this.data.yuchecked
    });
    if(this.data.checked==true){
      this.setData({
        yue_show:false,
        pay_type:0
      })
    }else{
      this.setData({
        yue_show:true,
        pay_type:1
      })
    }
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
    this.setData({
      shoew:false
    })
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