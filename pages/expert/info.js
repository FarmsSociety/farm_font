var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp()
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur:0,
    tabNav: ['详情介绍', '评论'],

    info:{},
    id: 0,
    commentItem:[],
  },
  tabSelect(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.id);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    // let id = '1';
    this.setData({id: id});
    this.getExpertInfo();
    this.getExpertComment();
  },
  getExpertInfo:function(){
    var params = {
      domain: "wxdomain",
      url: "/science/expert/infoById",
      method: "GET",
      data: {
        id: this.data.id,
      },
      callBack: (res) => {
          var data = res.data;
          var img = data['iconUrl'];
          data['iconUrl'] = img.split(",");
          this.setData({
            info: data,
          });
      }
    };
    http.request(params);
  },
  //评论列表
  getExpertComment:function(){
    var params = {
      domain: "wxdomain",
      url: "/science/expert/expertEvaluatelist",
      method: "GET",
      data: {
        id: this.data.id,
      },
      callBack: (res) => {
          var data = res.data.records;
          this.setData({
            commentItem: data,
          });
      }
    };
    http.request(params);
  }


})