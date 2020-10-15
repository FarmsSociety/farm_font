var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp();
Page({
  data: {
    id:"",
    avatar:"123213",

    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
    multiArray: [
      ['无脊柱动物', '脊柱动物'],
      ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
      ['猪肉绦虫', '吸血虫']
    ],
    objectMultiArray: [
      [{
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ],
      [{
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ],
      [{
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2018-12-25',
    region: ['广东省', '广州市', '海珠区'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let id = options.id;
    let id = '1304429517329235969';
    this.setData({ id: id });
    // this.getScienceInfo();
  },
  formSubmit: function (e){
    let signInfo = e.detail.value;
    signInfo.sex = signInfo.sex ? 0 : 1;
    signInfo.activityId = this.data.id;
    signInfo.avatar = this.data.avatar;
    if (signInfo.name == "") {
      this.showMessModal("请输入参会人员姓名");
      return false;
    }
    if (signInfo.identity == "") {
      this.showMessModal("请输入参会人员身份证号");
      return false;
    }
    if (signInfo.phoneNum == "") {
      this.showMessModal("请输入参会人员联系电话");
      return false;
    }
    if (signInfo.email == "") {
      this.showMessModal("请输入参会人员邮箱");
      return false;
    }
    if (signInfo.addr == "") {
      this.showMessModal("请输入参会人员联系地址");
      return false;
    }
    var params = {
      domain: "wxdomain",
      url: "/science/activity/join/activity",
      method: "POST",
      data: signInfo,
      callBack: (res) => {
        if (res.status == 0) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          });
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
  showMessModal:function(str){
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: str
    });
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  }
})