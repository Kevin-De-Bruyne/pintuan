// components/goodsList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Array,
      value: []
  },
  name:{
    type:String,
    value:''
  }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    aa(){
      this.triggerEvent('aa','杨家禧好骚啊')
    },
    goodsClick(e){
      const {index}=e.currentTarget.dataset
      this.triggerEvent('goodsClick',this.data.goods[index].goods_id)
    }
  }
})
