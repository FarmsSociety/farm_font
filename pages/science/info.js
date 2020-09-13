var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    info:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let id = options.id;
    let id = '1283333804202258434';
    this.setData({id: id});
    this.getScienceInfo();
  },
  getScienceInfo:function(){
    var params = {
      domain: "wxdomain",
      url: "/science/activity/info",
      method: "GET",
      data: {
        id: this.data.id,
      },
      callBack: (res) => {
        if( res.status == 0 ){
          this.setData({
            info: res.data,
          });
        }
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