/**
 * 返回顶部
 */

;(function($,NAME){
    var __DEFAULTS__={
        speed:600
    }
    $.fn[NAME]=function(options){
        var option =$.extends({},__DEFAULTS__,options);
        add_con(option);
    }
    var add_con=function(option){
        var addCon='<a href="##" class="btn btn-default back-to-top" id="back_to_top"><span class="glyphicon glyphicon-chevron-up"></span>TOP</a>';
        $this.append(addCon);
        var $btn=$('#back_to_top');
        addEvents($btn,option);
    }
    var addEvents=function($btn,option){
        var _speed=option.speed;
        $.on('click',function(){
            $('html,body').animate({
			    scrollTop: 0
		    }, _speed);
        });
        $(window).on('scroll', function () {//判断滚动隐藏按钮
		    if ($(window).scrollTop() > 10) {
			    $this.fadeIn();
		    } else {
			    $this.fadeOut();
		    }
	    });
    }
    return this;
})(jQuery,'backToTop');