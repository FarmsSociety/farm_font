function hideDialog(){
  this.setData({
    isShow: !this.data.isShow
  })
}
function showDialog(){
  this.setData({
    isShow: !this.data.isShow
  })
}

module.exports.hideDialog = hideDialog;
module.exports.showDialog = showDialog;