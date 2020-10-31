var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp()
Page({
  data: {
    nowActiveItem:[],
    nowPage:{
      total : 0,
      page : 1,
      size: 10,
    },
    oldActiveItem: [],
    oldPage: {
      total: 0,
      page: 1,
      size: 10,
    },

    scienceItem: [],
    scienceItem1: [],
    pageTotal: 0,
    pageNum: 1,
    pageSize: 10,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取正在进行的活动
    this.getNowActive();
    //获取已经结束的活动
    this.getOldActive();
  },
  //获取正在进行的活动
  getNowActive() {
    let that = this;
    //加载轮播图
    var params = {
      domain: "wxdomain",
      url: "/science/activity/list",
      method: "GET",
      data: {
        pageNo: that.nowPage.page,
        pageSize: that.nowPage.size,
        activityStatus: 1,
      },
      callBack: (res) => {
        if (res.status == 0) {
          let list = that._formatListData(res.data.records);
          console.log(JSON.stringify( list ) );
          // that.setData({
          //   pageTotal: res.data.total
          // });
        }
      }
    };
    http.request(params);
  },
  //详情条状
  toScienceDetail(e) {
    wx.navigateTo({
      url: '/pages/science/info?id=' + e.currentTarget.dataset.id,
    })
  },
  _formatListData(list) {
    return list.map((item) => {
      var preacherIdentity = item.preacherIdentity;
      item.preacherIdentity = preacherIdentity == 1 ? '专家' : (preacherIdentity == 1 ? '教授' : '普通人员');
      return item;
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