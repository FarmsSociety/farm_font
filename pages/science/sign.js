var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp();
Page({
  data: {
    serviceId:"",
    avatar:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let serviceId = options.id;
    // let serviceId = '1304429312810778625';
    this.setData({ serviceId: serviceId });
    // this.getScienceInfo();
  },
  formSubmit: function (e){
    let _this = this;
    let signInfo = e.detail.value;
    signInfo.sex = signInfo.sex ? 0 : 1;
    signInfo.serviceId = this.data.serviceId;
    signInfo.avatar     = this.data.avatar;
    if (signInfo.name == "") {
      this.showMessModal("请输入您的姓名");
      return false;
    }
    if (signInfo.identity == "") {
      this.showMessModal("请输入您的身份证号");
      return false;
    }
    if (signInfo.phoneNum == "") {
      this.showMessModal("请输入您的联系电话");
      return false;
    }
    if (signInfo.email == "") {
      this.showMessModal("请输入您的邮箱");
      return false;
    }
    if (signInfo.addr == "") {
      this.showMessModal("请输入您的联系地址");
      return false;
    }
    var params = {
      domain: "wxdomain",
      url: "/science/service/scienceSignUp",
      method: "POST",
      data: signInfo,
      callBack: (res) => {
        if (res.status == 0) {
          wx.showToast({
            title: '报名成功！',
            icon: 'success',
            duration: 2000
          });
          setTimeout(function(){
            _this.toUserActive();
          }, 1200);
        } else {
          wx.showToast({
            title: '失败',
            icon: 'error',
            duration: 2000
          });
        }
      }
    };
    http.request(params);
  },
  toUserActive:function(){
    wx.redirectTo({
      url: '/pages/user/user',
    })
  },
  ChooseImage() {
    let that = this;
    app.wxUploadImg(function (res, v) {
        that.setData({
            avatar: res
        });
    });
  },
  showMessModal:function(str){
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: str
    });
  },
})