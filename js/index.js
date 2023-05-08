$(function () {
  $('.colorful').hide()
  $('.colorful-btn').on("click", function () {
    $(this).parents('.wrap').find('.colorful').fadeToggle()
  })
  var toggleVideo = setTimeout(() => {
    $('.topwrap .videi_hl1 video').hide()
  }, 8000);
  //导航栏样式转换
  // $('em.spr').on('click', function () {
  //   $(this).parent().siblings('a').find('i').css('display', 'none')
  //   $(this).parent().siblings('a').find('i').removeClass('on')
  //   $(this).siblings('i').addClass('on')
  // })

  $('em.spr').hover(function () {
    $(this).siblings('i').css('display', 'block')
  }, function () {
    if (!$(this).siblings('i').hasClass('on'))
      $(this).siblings('i').css('display', 'none')
  })
  //展示导航nav
  function showNav() {
    $('.sidenav').stop().animate({
      'right': '0px'
    }, 200)
  }
  //影藏导航nav
  function hideNav() {
    $('.sidenav').stop().animate({
      'right': '-233px'
    }, 200)
    $('em.spr').siblings('i').removeClass('on').css('display', 'none')
  }
  //滚动展示目标导航
  function activeLi(index) {
    !$('#nav i.spr:eq(' + index + ')').hasClass('on') ?
      $('#nav i.spr:eq(' + index + ')').addClass('on').css('display', 'block') : false
  }
  //滚动影藏目标导航
  function deactiveLi(index) {
    $('#nav i.spr:eq(' + index + ')').removeClass('on').css('display', 'none')
  }
  let time = null
  let i = 1
  $(window).scroll(function () {
    let currentTime = Date.now()
    let top = $(document).scrollTop()
    $('em.spr').siblings('i').removeClass('on').css('display', 'none')
    if (currentTime - time >= 10) {
      i++
      // console.log('次数' + i);
      // console.log($(document).scrollTop() >= 1000);
      top >= 1000 ? showNav() : hideNav()
      time = currentTime;
      //主体移动 ==> 导航图标样式
      $('.topwrap ~ div[class*=wrap]').each(function (index) {
        if ($(this).next().is('div')) {
          ($(this).offset().top - 100 <= top && top <= $(this).next('div').offset().top - 100) ? activeLi(index): deactiveLi(index)
        } else {
          $(this).offset().top - 100 <= top ? activeLi(index) : deactiveLi(index)
        }
      })
      //导航图标样式 ==> 主体移动
      $('#nav  em.spr').each(function (index) {
        $(this).on('click', function () {
          $(this).parent().siblings('a').find('i').css('display', 'none')
          $(this).parent().siblings('a').find('i').removeClass('on')
          $(this).siblings('i').addClass('on')
          //平滑滚动
          $('html,body').stop().animate({
            scrollTop: $('.topwrap ~ div[class*=wrap]:eq(' + index + ')').offset().top + 'px'
          }, 100)
        })
      })
    }
  })

})