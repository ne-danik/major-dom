const headerNav = document.querySelector('.header__nav');

document.addEventListener('scroll', function () {
  if (window.pageYOffset >= 20) {
    headerNav.classList.add('fixed')
  } else {
    headerNav.classList.remove('fixed')
  }
})


new Splide('.header__slider', {
  type: 'fade',
  rewind: true,
  arrows: false,
  pagination: true,
  width: '100%',
  autoplay: true,
  interval: 10000,
  speed: 2000,
  pauseOnHover: false,
  pauseOnFocus: false,
}).mount();


new Splide('.splide', {
  type: 'slide',
  perPage: 2,
  perMove: 2,
  rewind: false,
  pagination: false,
  fixedWidth: '445px',
  speed: 500,
  keyboard: true,

  breakpoints: {
    1440: {
      fixedWidth: '360px',
    },
  }
}).mount();
