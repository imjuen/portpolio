$(function () {
  const $aniEl = $('[data-aos]');

  $('#fullpage').fullpage({
    menu: '.indicator',
    anchors: ['RWD', 'Redesign', 'App-Design', 'Microsite', 'Graphic-design'],
    scrollingSpeed: 1000,

    // 섹션 영여의 콘텐츠 세로 정렬
    verticalCentered: false,

    // 영역에 진입한 후
    afterLoad: function (anchorkLink, index) {
      console.log('영역에 진입한 후');
      console.log(anchorkLink, index);

      if (anchorkLink === 'Graphic-design') {
        $('body').css('background', 'none');
      }

      AOS.init();
      $aniEl.addClass('aos-animate');
    },

    // 영역에 떠나갈 때
    onLeave: function (index, nextIndex, direction) {
      console.log('영역에 떠나갈 떄');
      console.log(index, nextIndex, direction);

      if (index === 5) {
        $('body').css(
          'background',
          'url(img/project-bg.png)no-repeat 100% 170% / contain'
        );
      }

      $aniEl.removeClass('aos-animate');
    },

    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
      console.log(anchorLink, index, slideAnchor, slideIndex);
    },
  });

  $(function () {
    const $window = $(window);
    const $cursor = $('.cursor');

    $window.on('mousemove', function (e) {
      // console.log(e);
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      $cursor.css({
        left: mouseX,
        top: mouseY,
      });
    });
  });
});
