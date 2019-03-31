



$('.fullPage-wra').fullPage({
    slideColorArr: [["#123456", "#123444", "#123333", "233333"],
                    ["#535353", "ffdd33", "#434343"],
                    ["#eeeeee", "red"],
                    ["#aaaaaa", "#456566", "#001122"],
                    ["#555000"]],
    sectionColorArr: ['red', "blue", "yellow", "block", "glay"],    
    // sectionBgArr: ["./src/img/timg1.jpeg", "./src/img/timg2.jpeg", "./src/img/timg3.jpeg", "./src/img/timg4.jpeg", "./src/img/timg5.jpeg"],
    // slideLoop: true,
    scrollEvent: true,
    keydownEvent: true,
    onLeave: function (index, ele, direction) {
        // console.log(index, ele);
    },
    onShow: function (index, ele, direction) {
        // console.log(index, ele)
    },
    onSlideIn: function (index, ele, direction) {
        // console.log(index, ele);
    },
    onSlideOut: function (index, ele, direction) {
        // console.log(direction);
    }

}).addSlide();
