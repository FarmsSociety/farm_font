var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    info:{},
    commentItem:[],

    uploadImg:"",
    content:"",

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    // let id = '1304429312810778625';
    this.setData({id: id});
    this.getActiveInfo();
    this.getActiveComment();
  },
  getActiveInfo:function(){
    var params = {
      domain: "wxdomain",
      url: "/science/service/info",
      method: "GET",
      data: {
        id: this.data.id,
      },
      callBack: (res) => {
        if( res.status == 0 ){
          //图片设置
          var data = res.data;
          var img = data['imgUrl'];
          if( img ){
            data['imgUrl'] = img.split(",");
          }
          data['preacherIdentity'] = data['preacherIdentity'] == 1 ? "专家" : ( (data['preacherIdentity'] == 2) ? "教授" : "普通人员" );
          this.setData({
            info: data,
          });
        }
      }
    };
    http.request(params);
  },
  getActiveComment:function(){
    var params = {
      domain: "wxdomain",
      url: "/science/service/listByScienceId",
      method: "GET",
      data: {
        scienceId: this.data.id,
      },
      callBack: (res) => {
        if( res.status == 0 ){
          this.setData({
            commentItem: res.data.records,
          });
        }
      }
    };
    http.request(params);
  },
  toJoinActive:function(){
    wx.navigateTo({
      url: '/pages/science/sign?id=' + this.data.id,
    })
  },
  ChooseImage() {
    let that = this;
    app.wxUploadImg(function (res, v) {
        that.setData({
            uploadImg: res
        });
    });
  },
  formSubmit: function (e){
    let _this = this;
    let signInfo = e.detail.value;
    signInfo.serviceId = this.data.id;
    signInfo.userId = wx.getStorageSync("userId");
    if (signInfo.content == "") {
      this.showMessModal("输入评论不能为空！");
      return false;
    }
    var params = {
      domain: "wxdomain",
      url: "/science/service/addScienceEvaluation",
      method: "POST",
      data: signInfo,
      callBack: (res) => {
        if (res.status == 0) {
          wx.showToast({
            title: '发表成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(function(){
            _this.getActiveComment();
          }, 1200);
        } else {
          wx.showToast({
            title: '发表失败',
            icon: 'error',
            duration: 2000
          });
        }
      }
    };
    http.request(params);
  },
  showMessModal:function(str){
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: str
    });
  },
})