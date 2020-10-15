const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur:0,
    tabNav: ['详情介绍', '评论']
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})