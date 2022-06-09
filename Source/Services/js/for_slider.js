new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  simulateTouch: false,
  allowTouchMove:false,
  
  autoplay: {
    delay: 5000,
    stopOnLastSlide: false,
    disableOnInteraction: false
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  }
});
