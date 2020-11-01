var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp()
Page({
  data: {
    nowActiveItem:[],
    total1: 0,
    page1: 1,
    size1: 10,



    oldActiveItem: [],
    total2: 0,
    page2: 1,
    size2: 10,
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
        pageNo: that.data.page1,
        pageSize: that.data.size1,
        activityStatus: 1,
      },
      callBack: (res) => {
        if (res.status == 0) {
          let list = that._formatListData(res.data.records);
          console.log(JSON.stringify( list ) );
          that.setData({
            nowActiveItem: list,
            page1: res.data.total,
            size1: res.data.size,
          });
        }
      }
    };
    http.request(params);
  },
  //获取正在进行的活动
  getOldActive() {
    let that = this;
    //加载轮播图
    var params = {
      domain: "wxdomain",
      url: "/science/activity/list",
      method: "GET",
      data: {
        pageNo: that.data.page2,
        pageSize: that.data.size2,
        activityStatus: 2,
      },
      callBack: (res) => {
        if (res.status == 0) {
          let list = that._formatListData(res.data.records);
          console.log(JSON.stringify( list ) );
          that.setData({
            oldActiveItem: list,
            page2: res.data.total,
            size2: res.data.size,
          });
        }
      }
    };
    http.request(params);
  },
  //详情条状
  toActiveDetail(e) {
    wx.navigateTo({
      url: '/pages/active/info?id=' + e.currentTarget.dataset.id,
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
})