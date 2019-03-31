/* 
    作者: 赖乔锋,
    主要功能: 页面切换(ps: 简单仿写fullPage.js),
    依赖jQuery, 是jQuery的实例方法,
    日期: 2019.3.31
*/


(function (window, $) {
    $.fn.extend({
        fullPage: function (config) {
            //初始化, 定义变量
            var $Wrapper = this,
                $Section = this.find('.section'),
                slideColorArr = config.slideColorArr,
                sectionColorArr = config.sectionColorArr,
                slideBgArr = config.slideBgArr,
                sectionBgArr = config.sectionBgArr,
                slideLoop = config.slideLoop,
                scrollEvent = config.scrollEvent,
                keydownEvent = config.keydownEvent,
                commonSize = {
                    width: "100%",
                    height: "100%",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center center"
                }
            addStyle();
            // 添加样式
            function addStyle() {
                $Wrapper.css({
                        position: "relative",
                        overflow: "hidden",
                        top: 0,
                        left:0
                    })
                    .find('.section').css({
                        position: "absolute",
                        left: 0,
                    })
                    .end().find('.show').css({
                        top: 0
                    })
                    .end().find('.prev').css({
                        top: "-100%",
                        display: "none"
                    })
                    .end().find('.next').css({
                        top: "100%",
                        display: "none"
                    });


                $Section.find('.slide').css({
                    position: "absolute",
                    top: 0,
                })
                .end().find(".slide-show").css({
                    left: 0
                })
                .end().find(".slide-next").css({
                    left: "100%"
                })
                .end().find(".slide-prev").css({
                    left: "-100%"
                })
                $Wrapper.add($Section).add($Section.find(".slide"))
                        .css(commonSize);

                // 添加颜色, 添加背景图片
                $Section.each(function (index, ele) {
                    if(sectionBgArr) {
                        $(ele).css("backgroundImage", sectionBgArr[index])
                            .find('.slide').each(function (index1, ele) {
                                
                                slideBgArr != undefined ? 
                                        $(ele).css("backgroundImage", slideBgArr[index][index1] || "" )
                                         :
                                        $(ele).css("backgroundColor", slideColorArr[index][index1] || "#fff");
                            });
                    }else {
                        $(ele).css("backgroundColor", sectionColorArr[index])
                            .find('.slide').each(function (index1, ele) {
                                slideBgArr != undefined ? 
                                        $(ele).css("backgroundImage", slideBgArr[index][index1] || "")
                                         :
                                        $(ele).css("backgroundColor", slideColorArr[index][index1] || "#fff");
                            });
                    }
                    
                })
            }

            // 绑定点击事件

            keydownEvent && $(document).on("keydown", function (e) {
                // top 38 bottom 40 left 37 right 39
                switch (e.keyCode) {
                    case 40:
                        topSlide();
                        break;
                    case 38:
                        bottomSlide();
                        break;
                    case 37:
                        leftSlide();
                        break;
                    case 39:
                        rightSlide();
                        break;
                    default:
                        console.log('其他');
                        break;
                }
            });

            //绑定鼠标滚动事件
            scrollEvent && $(document).on("mousewheel", function (e) {
                console.log(e);
            })
            $Wrapper.scroll(function (e) {
                console.log(e);
            })
            //定义移动事件函数

            function topSlide() {
                
                if ($(".show", $Wrapper).next('.next').get(0)) {
                    config.onLeave && config.onLeave($('.show', $Wrapper).index(), $('.show', $Wrapper).get(0));
                    config.onShow && config.onShow($('.show', $Wrapper).index() + 1, $('.show', $Wrapper).next().get(0))
                    $(".show", $Wrapper).animate({
                        top: "-100%"
                    }, function () {
                        $(this).removeClass("show").addClass('prev').css('display', "none");
                    }).next('.next').css('display', "block").animate({
                        top: 0
                    }, function () {
                        $(this).removeClass('next').addClass('show');
                    });
                } else {
                   $('.show', $Wrapper).animate({top: "-20%"}, function () {
                       $(this).animate({top: "0"})
                   })
                }
            }
            function bottomSlide() {
                
                if ($(".show", $Wrapper).prev('.prev').get(0)) {
                    config.onLeave && config.onLeave($('.show', $Wrapper).index(), $('.show', $Wrapper).get(0));
                    config.onShow && config.onShow($('.show', $Wrapper).index() - 1, $('.show', $Wrapper).next().get(0))
                    $(".show", $Wrapper).animate({
                        top: "100%"
                    }, function () {
                        $(this).removeClass("show").addClass('next').css('display', 'none');
                    }).prev('.prev').css('display', "block").animate({
                        top: "0%"
                    }, function () {
                        $(this).removeClass('prev').addClass('show');
                    });
                } else {
                    $('.show', $Wrapper).animate({top: "20%"}, function () {
                        $(this).animate({top: 0});
                    })
                }
            }

            function leftSlide() {
                if ($('.show > .slide-show', $Wrapper).prev('.slide').get(0)) {
                    $('.show > .slide-show', $Wrapper).animate({left: "100%"}, function () {
                        $(this).removeClass('slide-show').addClass('slide-next');
                    }).prev('.slide-prev').animate({left: 0}, function () {
                        $(this).removeClass('slide-prev').addClass('slide-show');
                    });
                }else {

                    if(slideLoop) {
                        $('.show > .slide-show', $Wrapper).animate({left: "100%"}, function () {
                            $(this).removeClass("slide-show").addClass('slide-prev')
                                    .siblings('.slide').removeClass('slide-next').addClass('slide-prev');
                        });
                        $('.show > .slide:last-child').animate({left: "0"}, function () {
                            $(this).removeClass("slide-prev").addClass("slide-show");
                        })
                    }else {
                        $('.show > .slide-show', $Wrapper).animate({left: "20%"}, function () {
                            $(this).animate({left: 0});
                        });
                    }
                    
                }
            }

            function rightSlide() {
                if ($('.show > .slide-show', $Wrapper).next('.slide').get(0)) {
                    $('.show > .slide-show', $Wrapper).animate({left: "-100%"}, function () {
                        $(this).removeClass('slide-show').addClass('slide-prev');
                    }).next('.slide-next').animate({left: 0}, function () {
                        $(this).removeClass('slide-next').addClass('slide-show')
                    });
                }else {
                    if(slideLoop) {
                        $('.show > .slide-show', $Wrapper).animate({left: "-100%"}, function () {
                            $(this).removeClass("slide-show").addClass('slide-next')
                                    .siblings('.slide').removeClass('slide-prev').addClass('slide-next');
                        });
                        $('.show > .slide:first-child').animate({left: "0"}, function () {
                            $(this).removeClass("slide-next").addClass("slide-show");
                        })
                    }else {
                        $('.show > .slide-show', $Wrapper).animate({left: "-20%"}, function () {
                            $(this).animate({left: 0});
                        });
                    }
                    
                }
            }
            // 返回一个对象, 包含拓展该页面的方法

            var expend = {
                addSection: function (config) {
                    console.log('addSection');
                    return expend;
                },
                addSlide: function (config) {
                    console.log('addSlide');
                    return expend;
                },

            }
            return expend;

        }
    })
}(window, $))