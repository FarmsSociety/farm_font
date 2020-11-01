function cardSwiper(e){
    console.log(e.detail.current  );
    this.setData({
        cardCur: e.detail.current
    })
}
module.exports.cardSwiper = cardSwiper;
