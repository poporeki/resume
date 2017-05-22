
/*
    s
*/
;
(function ($,root) {
    $.fn.textTrans = function (options) {
        var defaults = {
            'speed': '200'
        }
        var settings      = $.extend(defaults, options);
        var _speed        = settings.speed;//初始化速度 _speed
        var _secWrap      = this;
        
        this.wrapAll('<div class="transition-wrapper"></div>');
        _secWrap.eq(0).siblings().css({
            'height': '1px',
            'top': '50vh',
            'width': '2px',
            'left': '50%'
        });
        _secWrap.hide();
        _secWrap.eq(0).fadeIn(1000);
        _secWrap.eq(0)
            .addClass('active')
            .siblings().removeClass('active');
        // 下一页
        $(".next-btn").click(function () {
            aniMate(this);
        });
        // 上一页
        $(".prev-btn").click(function () {
            aniMate(this);
        });
        function addTips(){
            if($('.clicked-tips').length>0){
                return console.log('have this and:'+$('.clicked-tips').length);
            }
            $("body").append('<div class="clicked-tips">没有了！</div>');
            var  t_wid=$(".clicked-tips").width();
            $(".clicked-tips").css({
                'margin-left':-t_wid/2
            });
            $("body").find('.clicked-tips')
                .hide()
                .fadeIn(1000)
                .fadeOut(1000,function(){
                $(".clicked-tips").remove();
            });
            return console.log('yes');
        }
        function aniMate(btnName) {
            switch ($(btnName).attr("class")) {/*判断按钮名称*/
                case "next-btn":
                    var _findIdx = _secWrap.index($('.active'));
                    var _thisWrapIdx = _findIdx;
                    var _nextWrapIdx = _findIdx + 1;
                    break;
                case "prev-btn":
                    var _findIdx = _secWrap.index($('.active'));
                    var _thisWrapIdx = _findIdx;
                    var _nextWrapIdx = _findIdx - 1;
                    break;
            }

            if (_nextWrapIdx < 0 || _nextWrapIdx > _secWrap.length - 1) {
                return addTips();
            }
            console.log(_nextWrapIdx);
            _secWrap.eq(_thisWrapIdx).animate({
                'height': '1px',
                'top': '50vh'
            }, _speed).animate({
                'width': '2px',
                'left': '50%'
            }, _speed * 2).fadeOut(200, function () {
                _secWrap.eq(_nextWrapIdx).addClass('active').siblings().removeClass('active');
                _secWrap.eq(_nextWrapIdx).fadeIn(200);
                _secWrap.eq(_nextWrapIdx).animate({
                    'width': '100vw',
                    'left': '0'
                }, _speed * 2).animate({
                    'height': '100vh',
                    'top': '0'
                }, _speed);
            });
        }
    }
    return this;
})(jQuery,window)