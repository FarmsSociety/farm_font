var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp()
Page({
  data: {
    scienceItem:[],
    scienceItem1:[],
    pageTotal:0,
    pageNum:1,
    pageSize:10,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScienceList();
  },
  //获取科技服务
  getScienceList() {
    let that = this;
    //加载轮播图
    var params = {
      domain: "wxdomain",
      url: "/science/service/list",
      method: "GET",
      data: {
        pageNo: 1,
        pageSize: 10
      },
      callBack: (res) => {
        if( res.status == 0 ){
          let list = that._formatListData(res.data.records);
          for (var i = 0; i < list.length; i++) {
            if( list[i]['serviceStatus'] == 1 ){
              that.data.scienceItem.push( list[i] );
              that.setData({
                scienceItem: that.data.scienceItem,
              });
            }else if( list[i]['serviceStatus'] == 2 ){
              that.data.scienceItem1.push( list[i] );
              that.setData({
                scienceItem1: that.data.scienceItem1,
              });
            }
          }
          that.setData({
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