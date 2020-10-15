var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp()
Page({
  data: {
    indicatorDots: true,
    indicatorColor: '#d1e5fb',
    indicatorActiveColor: '#1b7dec',
    autoplay: true,
    interval: 2000,
    duration: 1000,
    indexImgs: [{imgUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg"}],

    mItem:[
      {name:"科技服务", img:"../../images/icon/everydaySale.png", link:""},
      {name:"活动招募", img:"../../images/icon/everydaySale.png", link:""},
      {name:"会员风采", img:"../../images/icon/everydaySale.png", link:""},
      {name:"会员商城", img:"../../images/icon/everydaySale.png", link:""}
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndexImgs();
  },
  //加载轮播图
  getIndexImgs() {
    //加载轮播图
    var params = {
      url: "/indexImgs",
      method: "GET",
      data: {},
      callBack: (res) => {
        this.setData({
          indexImgs: res,
          seq: res
        });
      }
    };
    http.request(params);
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