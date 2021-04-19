// index.js
// 获取应用实例
const app = getApp()
const API = require('../../utils/util.js');
Page({
  data: {
    show_index:1,
    data:{},
    goodstab_index:3,
    goods:[],
    goods_sort:[],
    jingxuan_index:1,
    search:'',
    home_nav:{},
    sell_up_active:true,
    sell_down_active:false,
    num_up_active:true,
    num_down_active:false,
    price_up_active:true,
    price_down_active:false,
    sort_index:1,
    sort:'desc',
    type:0,
    show:true
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad:function(options) {
    wx.setStorageSync('uid', options.uid)
    this.getData();
  },
  closepop(){
    this.setData({ show: false });
  },
  system(){
    wx.navigateTo({
      url: '/pages/read/read',
    })
  },
  copywx(){
    this.setData({
      show:false
    })
  },
  xinshou(){
    wx.navigateTo({
      url: '/pages/xinshou/xinshou',
    })
  },
  sell(){
    this.setData({
      sell_up_active:!this.data.sell_up_active,
      sell_down_active:!this.data.sell_down_active,
    })
  if(this.data.sell_up_active==true){
    API._post('api/index/home_nav_type_sort',{
      type:this.data.type,
      sort:'desc',
      nav_id:this.data.goodstab_index
    }).then(res => {
      this.setData({
        goods_sort:res.data
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  }else{
    API._post('api/index/home_nav_type_sort',{
      type:this.data.type,
      sort:'asc',
      nav_id:this.data.goodstab_index
    }).then(res => {
      this.setData({
        goods_sort:res.data
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  }
  },
  sell_sort(){
    this.setData({
      sort_index:2,
      type:1
    })
    API._post('api/index/home_nav_type_sort',{
      type:this.data.type,
      sort:this.data.sort,
      nav_id:this.data.goodstab_index
    }).then(res => {
      this.setData({
        goods_sort:res.data
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });

  },
  num_sort(){
    this.setData({
      sort_index:3,
      type:2
    })
    API._post('api/index/home_nav_type_sort',{
      type:this.data.type,
      sort:this.data.sort,
      nav_id:this.data.goodstab_index
    }).then(res => {
      this.setData({
        goods_sort:res.data
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  price_sort(){
    this.setData({
      sort_index:4,
      type:3
    })
    API._post('api/index/home_nav_type_sort',{
      type:this.data.type,
      sort:this.data.sort,
      nav_id:this.data.goodstab_index
    }).then(res => {
      this.setData({
        goods_sort:res.data
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  zonghe(){
    this.setData({
      sort_index:1
    })
    API._post('api/index/home_nav_type_sort',{
      type:0,
      sort:'desc',
      nav_id:this.data.goodstab_index
    }).then(res => {
      this.setData({
        goods_sort:res.data
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  num(){
    this.setData({
      num_up_active:!this.data.num_up_active,
      num_down_active:!this.data.num_down_active
    })
    if(this.data.num_up_active==true){
      API._post('api/index/home_nav_type_sort',{
        type:this.data.type,
        sort:'desc',
        nav_id:this.data.goodstab_index
      }).then(res => {
        this.setData({
          goods_sort:res.data
        })
      }).catch(res => {
          //wx.showToast({ title:"网络访问错误", icon: 'none' })
      });
    }else{
      API._post('api/index/home_nav_type_sort',{
        type:this.data.type,
        sort:'asc',
        nav_id:this.data.goodstab_index
      }).then(res => {
        this.setData({
          goods_sort:res.data
        })
      }).catch(res => {
          //wx.showToast({ title:"网络访问错误", icon: 'none' })
      });
    }
  },
  price(){
    this.setData({
      price_up_active:!this.data.price_up_active,
      price_down_active:!this.data.price_down_active
    })
    if(this.data.price_up_active==true){
      API._post('api/index/home_nav_type_sort',{
        type:this.data.type,
        sort:'desc',
        nav_id:this.data.goodstab_index
      }).then(res => {
        this.setData({
          goods_sort:res.data
        })
      }).catch(res => {
          //wx.showToast({ title:"网络访问错误", icon: 'none' })
      });
    }else{
      API._post('api/index/home_nav_type_sort',{
        type:this.data.type,
        sort:'asc',
        nav_id:this.data.goodstab_index
      }).then(res => {
        this.setData({
          goods_sort:res.data
        })
      }).catch(res => {
          //wx.showToast({ title:"网络访问错误", icon: 'none' })
      });
    }
  },
  onInput(e){
    // console.log(e.detail.value)
    this.setData({
      search:e.detail.value
    })
  },
  search(){
    API._post('api/goods/search_goods',{
      goods_name:this.data.search
    }).then(res => {
      this.setData({
        goods_sort:res.data,
        show_index:2
      })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    });
  },
  goCate(){
    wx.navigateTo({
      url: '/pages/category/category',
    })
  },
  reqiClick(e){
    const {index}=e.currentTarget.dataset
    let id=this.data.data.hot_goods[index].goods_id
    wx.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${id}`,
    })
  },
  titleClick(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      goods:this.data.data.partition[index].goods,
      jingxuan_index:this.data.data.partition[index].id
    })
    console.log(this.data.goods)
    wx.pageScrollTo({
      scrollTop: 589,
      duration: 300,
    });
  },
  goodsClick(e){
    console.log(e.detail)
    wx.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${e.detail}`,
    })
  },
  getData(){
    API._post('api/index/index',{
      
  }).then(res => {
    this.setData({
      data:res.data,
      goods:res.data.partition[0].goods
    })
    console.log(this.data.goods)
  }).catch(res => {
      //wx.showToast({ title:"网络访问错误", icon: 'none' })
  });
  },
  goodstab_click(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      goodstab_index:this.data.data.home_nav[index].menu_id,
      
    })

    if(index!=0){
      this.setData({
        // goods:this.data.data.home_nav[index].goods,
        show_index:2
      })
      API._post('api/index/home_nav_type_sort',{
        type:this.data.type,
        sort:this.data.sort,
        nav_id:this.data.goodstab_index
      }).then(res => {
        this.setData({
          goods_sort:res.data
        })
      }).catch(res => {
          //wx.showToast({ title:"网络访问错误", icon: 'none' })
      });
    }else{
      this.setData({
        show_index:1
      })
      this.getData();
    }

  },
  goodstab_clicks(e){
    // const {index}=e.currentTarget.dataset
    this.setData({
      goodstab_index:this.data.data.home_nav[1].menu_id,
      
    })
      API._post('api/index/home_nav_type_sort',{
        type:this.data.type,
        sort:this.data.sort,
        nav_id:this.data.goodstab_index
      }).then(res => {
        this.setData({
          goods_sort:res.data
        })
      }).catch(res => {
          //wx.showToast({ title:"网络访问错误", icon: 'none' })
      });
      this.setData({
        // goods:this.data.data.home_nav[index].goods,
        show_index:2
      })
  },
  aa(e){
    console.log(e.detail)
  },
  bb(){
    this.setData({
      index:2
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow(){
    let token=wx.getStorageSync('token')
    console.log(token)
    this.setData({
      show_index:1,
      goodstab_index:3
    })
  },
  onPageScroll: function(e) {
    // 监听用户滑动页面事件。
    console.log(e.scrollTop)
  }
})
