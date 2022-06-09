new Swiper('#slider_swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  simulateTouch: false,
  allowTouchMove:false,

  autoplay: {
    delay: 5000,
    stopOnLastSlide: false,
    disableOnInteraction: false
  }
});

new Swiper('.swipers', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  grabCursor: true,

  autoHeight:true,

  simulateTouch: true,
  allowTouchMove: true,

  autoplay: {
    delay: 5000,
    stopOnLastSlide: false,
    disableOnInteraction: false
  }
});

new Swiper('.swiper_img', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  simulateTouch: false,
  allowTouchMove:false,

  autoplay: {
    delay: 10000,
    stopOnLastSlide: false,
    disableOnInteraction: false
  }
});

var swiper = new Swiper(".mySwiper", {
  effect: "cube",
  grabCursor: true,
  simulateTouch: true,
  allowTouchMove: true,
  loop:true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
});
