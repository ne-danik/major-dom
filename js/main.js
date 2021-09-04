const headerNav = document.querySelector('.header__nav');

document.addEventListener('scroll', function() {
  if (window.pageYOffset >= 20) {
    headerNav.classList.add('fixed')
  } else {
    headerNav.classList.remove('fixed')
  }
})

new Splide( '.splide', {
	type    : 'slide',
	perPage: 2,
	perMove: 1,
  rewind: false,
  pagination: false,
  fixedWidth: '445px',
  speed: 500,
  keyboard: true,
} ).mount();