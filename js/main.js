const headerNav = document.querySelector('.header__nav');
const sticky = headerNav.offsetTop;
const burgerBtn = document.querySelector('.header-menu__burger');
const burgerMenu = document.querySelector('.burger-menu');

//window.screen.lockOrientation('portrait');

document.addEventListener('scroll', function () {
  if (window.pageYOffset >= sticky) {
    headerNav.classList.add('header__nav--fixed')
  } else {
    headerNav.classList.remove('header__nav--fixed')
  }

  if (window.pageYOffset == 0 && burgerMenu.classList.contains("open-menu") == true) {
    burgerMenu.classList.toggle("open-menu");
    if (burgerBtn.classList.contains("open-menu") == true) {
      burgerBtn.classList.toggle("open-menu");
    }
  }
})


if (window.innerWidth <= 640) {
  const burgerMenuLink = document.querySelectorAll('.burger-menu__link');

  for (let i = 0; i < burgerMenuLink.length; i++) {
    burgerMenuLink[i].addEventListener('click', e => {
      if (burgerBtn.classList.contains("open-menu") == true) {
        burgerBtn.classList.toggle("open-menu");
      }
      burgerMenu.classList.toggle("open-menu");
      e.target.closest('.burger-menu').blur()

      if (document.querySelector('body').style.overflowY == 'hidden') {
        document.querySelector('body').style.overflowY = ''
      } else {
        document.querySelector('body').style.overflowY = 'hidden'
      }
    });
  }
}


function burgerBtnToggle(e) {
  e.classList.toggle("open-menu");
  burgerMenu.classList.toggle("open-menu");

  if (window.innerWidth <= 640) {
    if (document.querySelector('body').style.overflowY == 'hidden') {
      document.querySelector('body').style.overflowY = ''
    } else {
      document.querySelector('body').style.overflowY = 'hidden'
    }
  }
}


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
  width: '1110px',
  gap: 60,
  speed: 500,
  keyboard: true,

  breakpoints: {
    1280: {
      fixedWidth: '300px',
      gap: 34,
      width: '968px',
    },
    1024: {
      fixedWidth: '369px',
      width: '768px',
      gap: 30,
    },
    960: {
      fixedWidth: '285px',
      width: '600px',
      gap: 30,
    },
    640: {
      perPage: 1,
      perMove: 1,
      fixedWidth: '290px',
      width: '290px',
      gap: 30,
    },
  }
}).mount();


/*
const headerMenuList = document.querySelectorAll('.header-menu__list');
const headerLogo = document.querySelector('.header-logo');
let headerMenuLink;

for (let i = 0; i < headerMenuList.length; i++) {
  const currentLink = headerMenuList[i];
  let prevLink = currentLink;

  currentLink.addEventListener('click', e => {

    if (e.target.className === 'header-menu__link') {
      prevLink.classList.remove('header-menu__link--active');
      e.target.classList.add('header-menu__link--active');
      prevLink = e.target;
      headerMenuLink = e.target;
    }
  })
}

headerLogo.addEventListener('click', e => {
  if(headerMenuLink) {
    headerMenuLink.classList.remove('header-menu__link--active');
  }
})
 */