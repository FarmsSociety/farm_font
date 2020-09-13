var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp()
Page({
  data: {
    scienceItem:[],
    pageTotal:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScienceList();
  },
  //获取科技服务
  getScienceList() {
    //加载轮播图
    var params = {
      domain: "wxdomain",
      url: "/science/activity/list",
      method: "GET",
      data: {
        pageNo: 1,
        pageSize: 10
      },
      callBack: (res) => {
        if( res.status == 0 ){
          this.setData({
            scienceItem: res.data.records,
            pageTotal: res.data.total
          });
        }
      }
    };
    http.request(params);
  },
  //详情条状
  toScienceDetail(e){
    wx.navigateTo({
      url: '/pages/science/info?id=' + e.currentTarget.dataset.id,
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