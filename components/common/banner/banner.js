function swiperCurrent(e){
    console.log(e.detail.current  );
    this.setData({
        swiperCurrent: e.detail.current
    })
}
module.exports.swiperCurrent = swiperCurrent;