var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp()
Page({
  data: {
    memberItem:[],
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
    let that = this;
    //加载轮播图
    var params = {
      domain: "wxdomain",
      url: "/science/member/list",
      method: "GET",
      data: {
        pageNo: 1,
        pageSize: 10
      },
      callBack: (res) => {
        let list = that._formatListData( res.data.records );
        console.log(JSON.stringify( list ) );
        this.setData({
          memberItem: list,
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
  _formatListData(list) {
    return list.map((item) => {
      var imgs = item.imgUrl;
      if( imgs ){
        item.imgUrl = imgs.split(',');
      }else{
        item.imgUrl = [];
      }
      return item;
    })
  },
})