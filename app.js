//app.js
var http   = require("utils/http.js");
var config = require("utils/config.js");
App({
  onLaunch: function () {
    http.getToken();
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  globalData: {
    // 定义全局请求队列
    requestQueue: [],
    // 是否正在进行登陆
    isLanding: true,
    // 购物车商品数量
    totalCartCount: 0
  },

  // 图片上传
  wxUploadImg: function (cb) {
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var _that = this;
      wx.chooseImage({
          count: count,
          success: function success(res) {
              wx.showLoading({
                  title: '图片上传中'
              });
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                  var _loop = function _loop() {
                      var v = _step2.value;
                      wx.uploadFile({
                          url: config.upload,
                          filePath: v,
                          name: 'file',
                          formData: {
                              key: wx.getStorageSync('token'),
                              file: 'file'
                          },
                          success: function success(res) {
                              console.log(JSON.stringify(res))
                              wx.hideLoading();
                              // var parseData = JSON.parse(res.data);
                              if (res.statusCode === 200) {
                                  if (cb) {
                                      cb(res.data, v);
                                  }
                              }
                          }
                      });
                  };
                  for (var _iterator2 = res.tempFilePaths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      _loop();
                  }
              } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
              } finally {
                  try {
                      if (!_iteratorNormalCompletion2 && _iterator2.return) {
                          _iterator2.return();
                      }
                  } finally {
                      if (_didIteratorError2) {
                          throw _iteratorError2;
                      }
                  }
              }
          }
      });
  }
})