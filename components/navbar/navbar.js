Component({
  // 组件的属性列表
  properties: {
      //  导航文字
      navigationBarTitle: {
          type: String,
          value: ''
      },
      // 返回上一页
      back: {
          type: Boolean,
          value: false
      },
      // 返回首页
      home: {
          type: Boolean,
          value: false
      },
      // 背景色
      bg: {
          type: String,
          value: ''
      }
  },
  // 组件的初始数据
  data: {
      // 获取状态栏的高度statusBarHeight
      statusBarHeight: wx.getSystemInfoSync()['statusBarHeight']
  },
  // 组件的方法列表
  methods: {
      // 返回首页
      backHome: function () {
          wx.reLaunch({
              url: '/pages/index/index',
          })
      },
      // 返回上一页
      back: function () {
          wx.navigateBack({
              delta: 1
          })
      }
  }
})