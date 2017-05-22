// $(function () {


// 	var w_hidth = $(window).width(),//获取窗口宽度
// 		$control_menu = $(".control-menu"),/*菜单按钮 */
// 		$menu_sidebar = $(".menu-sidebar"),
// 		$body = $("body"),
// 		$sidebar_ul = $(".sidebar-ul"),
// 		$sidebar_mask = $("#sidebar-mask");
// 		$menu_sidebar_a = $("#menu_sidebar ul li a"),
// 		_sulRight=$sidebar_ul.css('right'),
// 		$lock_pos='';

// 	//菜单
// 	$body.children().wrapAll('<div></div>');
// 	$control_menu.click(function () {//单击菜单按钮
// 		$('>div',$body).addClass('lock-position');
// 		$lock_pos=$('.lock-position');
// 		$('html').css({'overflow':'hidden'});
// 		$body.eq(0).css({"overflow": "hidden"});
// 		$menu_sidebar.fadeToggle();
// 		$sidebar_ul.css({ "right": '0' });

// 	});
// 	$sidebar_mask.click(hide_Sidebar);//单击菜单遮罩隐藏菜单
// 	$menu_sidebar_a.click(hide_Sidebar);//单击a标签隐藏菜单

// 	function hide_Sidebar() {//隐藏菜单
// 		$lock_pos.removeClass('lock-position');
// 		$('html').css({'overflow':'visible'});
// 		$body.eq(0).css({"overflow": "visible"});
// 		console.log($sidebar_ul.css('right'));
// 		$sidebar_ul.css({ "right": _sulRight });
// 		$menu_sidebar.fadeToggle();

// 	}

// 	if ($("#project_display").offset().top - $(window).scrollTop() < 55) {
// 		$(".body-bg").addClass('add-body-bg');
// 	} else {
// 		$(".body-bg").removeClass('add-body-bg');
// 	}

// });
$(function () {
	var $allImg = $('img');
	var len = $allImg.length;
	var count = 0;
	$allImg.on('load error', function () {
		count++;
		if (count >= len - 1) {

		}
	});
});

$(function () {
	console.log('本站主要用了full-page.js插件');
	var $page=$('.page-item');
	var full = $('#fullpage').fullpage({
		sectionSelector: '.page-item',
		navigation: true,
		navigationPosition: 'right',
		showActiveTooltip: true,
		navigationToolTips: ['关于我', '职业技能', '项目展示', 'sdasf'],
		controlArrowColor: 'rgba(0,0,0,.4)',
		paddingTop: 55,
		sectionsColor: ['', '', '#7B1AC3', '#404040'],
		anchors: ['page1', 'page2', 'page3', 'page4'],
		scrollOverflow: true,
		afterRender: function () {
			function _tit(n){
				return $page.eq(n).find('.page-title');
			}
			function _con(n){
				return $page.eq(n).find('.page-content');
			}
			function _panel(n){
				return $page.eq(n).find('.panel');
			}
			move('.loading-animate')
				.scale(.5).duration('.5s').end(function () {
					move('.loading-animate').translate(3000, 0).ease('in').duration('.5s').end(function () {
						$('#loading-animate').removeClass('loading-animate');
						$('#loading-animate').remove();
						move($page[0]).translate(0).duration('1s').end(function () {
							move(_tit(0)[0]).set('margin-bottom', '50px').duration('.5s').end(function () {
								move(_tit(0)[0]).scale(1).end();
							});
						});

					});
				})
		},
		afterLoad: function (i, pageNum) {
			var _idx = pageNum - 1,
				$this = $(this),
				_tit = $this.find('.page-title'),
				_con = $this.find('.page-content'),
				_panel=_con.find('.panel');
			switch (pageNum) {
				case 1:
					move(_tit[0]).scale(1).end();
					break;
				case 2:
					move(_tit[0]).scale(1).end(function () {
						move(_con[0]).translate(0).end();
						var n=0;
					$.each(_panel,function(){
						n+=100;
						move(this).scale(1).delay(n).duration('.5s').end();
					});
					});
					
					break;
				case 3:
					
					var n=0;
					$.each(_panel,function(){
						n+=100;
						move(this).scale(1).delay(n).duration('.5s').end();
					});
					move(_tit[0]).scale(1).end();
					break;


			}
		},
		onLeave: function (index, nextIndex, dire) {
			var _idx = index - 1,
				$this = $(this),
				_tit = $this.find('.page-title'),
				_con = $this.find('.page-content');
			switch (index) {
				case 1:
					switch (dire) {
						case 'down':
							move(_tit[0]).set('margin-bottom', '-100px').scale(.8).duration('1s').end();
							break;
					}
					break;
				case 2:
					move(_tit[0]).scale(.8).end();
					switch (dire) {
						case 'down':
							move('.page-content').set('bottom', '-100%').duration('1s').end();
							
							break;
						case 'up':
							
							move('#aboutMe_tit').set('margin-bottom', '50px').duration('.5s').end(function () {
								move('#aboutMe_tit').scale(1).end();
							});
							break;
					}
				case 3:
					move(_tit[0]).scale(.8).end();
					var $panel=$this.find('.panel');
					$panel.css({'transform':'scale(0)'});
					switch(dire){
						case 'down':

							break;
						case 'up':
							
							break;
					}

			}
		}
	});
});