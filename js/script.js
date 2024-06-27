$(function () {
  const $header = $('#header');
  const TL = gsap.timeline();

  TL.from('.gnb li ', {
    y: -100,
    autoAlpha: 0,
    duration: 0.5,
    stagger: 0.2,
  });
  TL.from(
    '.logo',
    {
      y: -100,
      autoAlpha: 0,
      duration: 0.5,
      ease: 'bounce.out',
      // delay: 1,
    },
    '+=0.5 '
  );

  $('#fullpage').fullpage({
    menu: '.gnb',
    anchors: ['visual', 'profile', 'project', 'process', 'contact'],

    scrollingSpeed: 1000,

    // 섹션 영여의 콘텐츠 세로 정렬
    verticalCentered: false,

    autoScrolling: true,
    loopHorizontal: true,

    // 영역에 진입한 후
    afterLoad: function (anchorkLink, index) {
      // console.log('영역에 진입한 후');
      // console.log(anchorkLink, index);

      if (anchorkLink === 'project') {
        gsap.to('.wrap ul', {
          opacity: 1,
          y: 100,
          duration: 2,
          ease: 'power2.out',
          // stagger: 0.1,
        });
      }

      // if (anchorkLink === 'process') {
      //   $('.logo a').css('color', 'var(--main3-color)');
      //   $('.gnb li a ').css('color', 'var(--main3-color)');
      //   $('.gnb li a:hover').css('color', 'var(--main2-color)');
      // }

      if (anchorkLink === 'process') {
        $('#header').addClass('active');
      }
      if (anchorkLink === 'process') {
        $('.logo').addClass('active');
        $('.logo:hover').addClass('active');
      }
      if (anchorkLink === 'process') {
        $('.gnb li a').addClass('active');
        $('.gnb li a:hover').addClass('active');
      }

      if (anchorkLink === 'contact') {
        $header.fadeOut();
      } else {
        $header.fadeIn();
      }
    },

    // 영역에 떠나갈 때
    onLeave: function (index, nextIndex, direction) {
      // console.log('영역에 떠나갈 떄');
      console.log(index, nextIndex, direction);
      if (index === 3) {
        gsap.to('.wrap ul', {
          opacity: 0,
          y: -100,
          duration: 2,
          ease: 'power2.out',
          // stagger: 0.1,
        });
      }

      // if (index === 4) {
      //   $('.logo a').css('color', 'var(--main-color)');
      //   $('.gnb li a').css('color', 'var(--main-color)');
      // }

      if (index === 4) {
        $('#header').removeClass('active');
        $('.logo').removeClass('active');
        $('.logo:hover').addClass('active');
      }
      if (index === 4) {
        $('.gnb li a').removeClass('active');
        $('.gnb li a:hover').addClass('active');
      }
    },

    // 슬라이드 영역에 진입한 후
    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
      console.log(anchorLink, index, slideAnchor, slideIndex);

      const skillCircle = document.querySelectorAll('.circle');

      skillCircle.forEach((circle, index) => {
        const skillValue = circle.getAttribute('data-skill');
        const delayTime = index * 0.4;

        const waves = circle.querySelectorAll('.wave');
        waves.forEach((wave) => {
          gsap.to(wave, {
            top: `-${skillValue - 30}%`,
            duration: 1,
            delay: delayTime,
          });
        });
      });

      if (anchorLink == 'profile' && slideAnchor == 'slide1') {
        gsap.to('.wrap-info-text strong', {
          // y: 15,
          autoAlpha: 1,
          duration: 3,
          ease: 'power4.out',
        });
      }
      if (anchorLink == 'profile' && slideAnchor == 'slide2') {
        gsap.to('.wrap-info-text2 dl dd', {
          autoAlpha: 1,
          duration: 2,
          ease: 'power2.in',
        });
      }
      if (anchorLink == 'profile' && slideAnchor == 'slide3') {
        gsap.to('.info dl dd', {
          x: 5,
          autoAlpha: 1,
          duration: 1,
          ease: 'power2.out',
        });

        $('.info dl dt').addClass('filled');
      }

      // 슬라이드 활성화
      $('.menu > li').removeClass('on').eq(slideIndex).addClass('on');

      // 슬라이드 번호 표시
      $('.slide-num').text(slideIndex + 1);
    },

    // 슬라이드 영역에 떠나갈 때
    onSlideLeave: function (
      anchorLink,
      index,
      slideIndex,
      direction,
      nextSlideIndex
    ) {
      console.log(anchorLink, index, slideIndex, direction, nextSlideIndex);

      const waves = document.querySelectorAll('.wave');
      waves.forEach((wave) => {
        gsap.to(wave, {
          top: '3%',
        });
      });

      if (slideIndex == 0) {
        gsap.to('.wrap-info-text strong', {
          // y: -15,
          autoAlpha: 0,
          duration: 3,
          ease: 'power4.out',
        });
      }
      if (slideIndex == 1) {
        gsap.to('.wrap-info-text2 dl dd', {
          autoAlpha: 0,
          duration: 2,
          ease: 'power2.in',
        });
      }
      if (slideIndex == 2) {
        gsap.to('.info dl dd', {
          x: -5,
          autoAlpha: 0,
          duration: 1,
          ease: 'power2.out',
        });
      }
      $('.info dl dt').removeClass('filled');
    },
  });

  //profile 서브 메뉴
  $('.menu > li').on('click', function () {
    const menuIdx = $(this).index();
    // console.log(menuIdx);
    $.fn.fullpage.moveTo('profile', menuIdx);
  });

  // 마우스 움직임

  const $window = $(window);
  const $me = $('.visual figure');
  const $cursor = $('.cursor');

  let x = 0;
  let y = 0;
  let mx = 0;
  let my = 0;
  const speed = 0.03;

  initAnimation();
  function initAnimation() {
    getOffset();
    moving();
  }

  function getOffset() {
    $window.on('mousemove', function (e) {
      x = e.pageX;
      y = e.pageY;
      // 조정된 값 구하기
      mx = ($window.outerWidth() / 2 - x) * speed;
      my = ($window.outerHeight() / 2 - y) * speed;

      $cursor.css({
        left: x,
        top: y,
      });
    });
  }

  function moving() {
    $me.css({
      transform: `translate(${mx * 10}px, ${my * 0}px)`,
    });

    // 부드럽게 반복
    raf = requestAnimationFrame(moving);
  }
});
