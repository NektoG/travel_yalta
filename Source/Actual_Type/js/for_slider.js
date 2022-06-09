new Swiper('.swiper_city', {
  effect: "fade",
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

var swiper = new Swiper(".mySwiper", {
    effect: "cube",
    grabCursor: true,
    loop:true,
    simulateTouch: true,
    allowTouchMove:true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });
