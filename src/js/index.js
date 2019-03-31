



$('.fullPage-wra').fullPage({
    slideColorArr: [["#123456", "#123444", "#123333", "233333"],
                    ["#535353", "ffdd33", "#434343"],
                    ["#eeeeee", "red"],
                    ["#aaaaaa", "#456566", "#001122"],
                    ["#555000"]],
    sectionColorArr: ['red', "blue", "yellow", "block", "glay"],

    // slideLoop: true,
    scrollEvent: true,
    keydownEvent: true,
    onLeave: function (index, ele) {
        console.log(index, ele);
    },
    onShow: function (index, ele) {
        console.log(index, ele)
    },
    onSlideIn: function (index, ele) {
        console.log(index, ele);
    }

}).addSlide();
