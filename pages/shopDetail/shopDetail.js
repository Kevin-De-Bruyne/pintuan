// pages/shopDetail/shopDetail.js
const app = getApp()
const API = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '首',   // 名片
      type: '1',
      showlist: '3',
      goods_id:'',
      spec:[],
      show:false,
    },
    spec_index:0,
    spec_id:1,
    active:'',
    spec_id:'',
    active:false,
    price:'',
    data:{},
    team_list:[],
    shenglv_show:false,
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.spec_index)
    console.log(options.id)
    this.setData({
      goods_id:options.id,
    })
    
  },
  gopin(){
    wx.navigateTo({
      url: `/pages/team_list/team_list?id=${this.data.goods_id}`,
    })
  },
  collect(){
    let token=wx.getStorageSync('token')
    this.setData({
      active:!this.data.active
    })
    API._post('api/goods/collect',{
      token:token,
      goods_id:this.data.goods_id
    }).then(res => {
     wx.showToast({
       title: res.msg,
       icon:'none'
     })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  spec_item_click(e){
    const index=e.currentTarget.dataset.index
    const indexs=e.currentTarget.dataset.indexs
    this.data.data.spec_list[indexs].spec_item.forEach((item,indexss)=>{
      if(indexss==index){
        this.data.data.spec_list[indexs].spec_item[indexss].checked=true
        
        this.setData({
          spec:this.data.data.spec_list
        })
        console.log(this.data.spec)
      }else{
        this.data.data.spec_list[indexs].spec_item[indexss].checked=false
        this.setData({
          spec: this.data.data.spec_list
        })
      }
    })
        let arr=[]
      this.data.spec.forEach((item,index)=>{
        console.log(item.spec_item)
        item.spec_item.map((items,inds)=>{
          console.log(items)
          if(items.checked==true){
            
            arr.push(items.id)
            this.data.spec_id=arr.sort(function(a,b){
              return a-b
            })
            this.data.spec_id=arr.join('_')
            this.setData({
              spec_id:this.data.spec_id
            })
            console.log(this.data.spec_id)
            this.data.data.spec_goods_price.forEach((item,index)=>{
              if(item.key==this.data.spec_id){
                this.setData({
                  price:item.price
                })
              }
            })
          }
        })
      })
      
  },
  close(){
    this.setData({
      show:false
    })
  },
  goConorder(){
    let token=wx.getStorageSync('token')
    console.log(this.data.data.sql.goods_id)
    API._post('api/goods/join_team_page',{
      token:token,
      goods_id:this.data.data.sql.goods_id,
      spec_key:this.data.spec_id
    }).then(res => {
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
      if(res.msg=='成功'){
        wx.navigateTo({
          url: `/pages/conOrder/conOrder?goods_id=${this.data.goods_id}&spec_id=${this.data.spec_id}`
        })
      }
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  cantuan(){
    this.setData({
      show:true
    })
  },
  onClose(){
    this.setData({
      show:false
    })
  },
  getData(){
    let token=wx.getStorageSync('token')
    API._post('api/goods/goodsinfo',{
      token:token,
      goods_id:this.data.goods_id
    }).then(res => {
      if(res.is_collect==0){
        this.setData({
          active:false
        })
      }else{
        this.setData({
          active:true
        })
      }
      this.setData({
        data:res,
        spec:res.spec_list,
        team_list:res.team_list.slice(0,3)
      })
      this.setData({
        content:this.data.data.sql.goods_content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
      })
      console.log(this.data.spec[0].spec_item[0].id)
      console.log(this.data.spec[1].spec_item[0].id)
      this.setData({
        spec_id:this.data.spec[0].spec_item[0].id+'_'+this.data.spec[1].spec_item[0].id
      })
      this.data.data.spec_goods_price.forEach((item,index)=>{
        if(item.key==this.data.spec_id){
          this.setData({
            price:item.price
          })
        }
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
    this.setData({
      show:false
    })
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
    return{
      title:this.data.data.sql.goods_name,
      path:`pages/shopDetail/shopDetail?id=${this.data.data.sql.goods_id}`,
      imageUrl:this.data.data.sql.original_img
    }
  }
})