var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp()
Page({
  data: {
    expertItem:[],
    pageTotal:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExpertList();
  },
  //获取科技服务
  getExpertList() {
    //加载轮播图
    var params = {
      domain: "wxdomain",
      url: "/science/expert/list",
      method: "GET",
      data: {
        pageNo: 1,
        pageSize: 10
      },
      callBack: (res) => {
        this.setData({
          expertItem: res.data.records,
          pageTotal: res.data.total
        });
      }
    };
    http.request(params);
  },
  //详情条状
  toExpertDetail(e){
    wx.navigateTo({
      url: '/pages/expert/info?id=' + e.currentTarget.dataset.id,
    })
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