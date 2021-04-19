// pages/withdraw/withdraw.js
const app = getApp()
const API = require('../../utils/util.js');
const token = wx.getStorageSync('token');
import Dialog from '../../vant/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height * 1.3,
    withdraw: [],
		money: null,
		bank_list:[],
		show:false,
		bank_select:null,
		bank_id:null,
		type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.setData({
			type:options.type
		})
		// let token=wx.getStorageSync('token')
	},
	bankList(){
		wx.navigateTo({
			url: '/pages/withdraw/bank/bank',
		})
	},
	onCancel() {
		this.setData({ show: false });
	},
	onClose(){
		this.setData({ show: false });
	},
	banklist(){
		this.setData({ show: true });
	},
	onShow(){
		let token=wx.getStorageSync('token')
		API._post('api/user/tx',{
			token: token,
		}).then(res => {
			this.setData({
				withdraw: res.data
			})
		})
		API._post('api/user/card', {
			token:  token,
		}).then(res => {
			if(res.data.data.length == 0){
				Dialog.confirm({
					title: '提示',
					message: '您暂无银行卡,是否前往添加银行卡',
				})
				.then(() => {
					wx.navigateTo({
						url: '/pages/withdraw/add_bank/add_bank'
					})
				})
				.catch(() => {
					
				});
				return false;
			}
			for (var i in res.data.data){
				res.data.data[i]["text"] = res.data.data[i]["bank_name"]+'  '+res.data.data[i]["bank_num"].substr(-4);
			}
			console.log(res.data.data)
			this.setData({
				bank_list: res.data.data
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},
	onConfirm(event){
		this.setData({ show: false ,bank_select: event.detail.value.text,bank_id: event.detail.value.bank_id});
	},
	inmoney(e){
		console.log(e)
		this.setData({ money: e.detail.value});
	},
	saveres(){
		if (!this.data.money) { wx.showToast({ title: "请输入要提现的金额", icon: 'none'}); return false;}
		if (!this.data.bank_id) { wx.showToast({ title:"请选择银行卡", icon: 'none'}); return false; }
		if (this.data.money<this.data.withdraw.config.min) { wx.showToast({ title: "单笔金额必须大于"+this.data.withdraw.config.min+"元", icon: 'none'}); return false;}
		if (this.data.money>this.data.withdraw.config.max) { wx.showToast({ title: "单笔金额必须小于"+this.data.withdraw.config.max+"元", icon: 'none'}); return false;}
		let token=wx.getStorageSync('token')
		API._post('api/user/cashs', {
			token:token,
			type:this.data.type,
			bank_id:this.data.bank_id,
			money:this.data.money
		}).then(res => {
			wx.showToast({ title: res.msg, icon: 'none' })
			if (res.code == 200){
				setTimeout(()=>{
					wx.navigateBack();
				},700)
			}
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	}
})