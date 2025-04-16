$(function () {
  AOS.init({
    disable: 'mobile',
    duration: 1000,
    easing: 'ease-in-out',
    delay: 300,
  });
  NProgress.done();
});

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

window.addEventListener('scroll', function () {
  const scrollY = window.scrollY || window.pageYOffset;
  if (scrollY >= 200) {
    $('.header').css({
      'padding': '0 10px',
      'background': 'rgba(0,0,0,.7)'
    })
  } else {
    $('.header').css({
      'padding': '0',
      'background': 'transparent'
    })
  }
})
