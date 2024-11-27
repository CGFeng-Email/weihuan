
  AOS.init();
  NProgress.done();


// h5导航菜单栏
$('.header .menu').click(function () {
  $(this).stop().toggleClass('active');
  $('.h5_nav').stop().toggleClass('h5_nav_active');
})

// h5导航栏二级栏目
$('.h5_nav .child_li .head_title').click(function () {
  $(this).children('.iconfont').toggleClass('rotateIcon');
  $(this).parent().next().stop().toggleClass('childActive');
})

