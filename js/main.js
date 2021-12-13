const headerNav = document.querySelector('.header__nav');
const sticky = headerNav.offsetTop;
const burgerBtn = document.querySelector('[data-btn="burger-menu"]');
const burgerMenu = document.querySelector('.burger-menu');


// Get Rooms JSON

let rooms = [];
const roomsRequest = new XMLHttpRequest();
roomsRequest.open("GET", "js/rooms.json", false); // async=true
roomsRequest.onload = function (e) {
  if (roomsRequest.readyState == 4 && roomsRequest.status == 200) {
    rooms = JSON.parse(roomsRequest.responseText);
  }
};
roomsRequest.send(null);


//window.screen.lockOrientation('portrait');

document.addEventListener('scroll', function () {
  if (window.pageYOffset >= sticky) {
    headerNav.classList.add('header__nav--fixed');
  } else {
    headerNav.classList.remove('header__nav--fixed');
  }

  if (window.pageYOffset == 0 && burgerMenu.classList.contains("open-menu") == true) {
    burgerMenu.classList.toggle("open-menu");
    if (burgerBtn.classList.contains("open-menu") == true) {
      burgerBtn.classList.toggle("open-menu");
    }
  }
});


if (window.innerWidth <= 640) {
  const burgerMenuLink = document.querySelectorAll('.burger-menu__link');

  for (let i = 0; i < burgerMenuLink.length; i++) {
    burgerMenuLink[i].addEventListener('click', e => {
      if (burgerBtn.classList.contains("open-menu") == true) {
        burgerBtn.classList.toggle("open-menu");
      }
      burgerMenu.classList.toggle("open-menu");
      e.target.closest('.burger-menu').blur();

      if (document.querySelector('body').style.overflowY == 'hidden') {
        document.querySelector('body').style.overflowY = '';
      } else {
        document.querySelector('body').style.overflowY = 'hidden';
      }
    });
  }
}

burgerBtn.addEventListener("click", (e) => {
  e.target.classList.toggle("open-menu");
  burgerMenu.classList.toggle("open-menu");

  if (window.innerWidth <= 640) {
    if (document.querySelector('body').style.overflowY == 'hidden') {
      document.querySelector('body').style.overflowY = '';
    } else {
      document.querySelector('body').style.overflowY = 'hidden';
    }
  }
});


// Class RoomsSlide

class RoomsSlide {
  constructor(title, price, tags, thumb) {
    this._title = title;
    this._price = price;
    this._tags = tags;
    this._thumb = thumb;
  }
  render() {
    const roomsSlider = document.querySelector('[data-slider="rooms"]');
    const slide = document.createElement('div');
    slide.classList.add('splide__slide');
    slide.setAttribute('data-slide', "room");
    slide.innerHTML = `
      <div class="room__image">
        <img src='${this._thumb}' alt='${this._title}'>
      </div>
      <div class="room__content">
        <h5 class="room__content-title">${this._title}</h5>
        <p class="room__content-features">${this._tags.join(' • ')}</p>
        <div class="room__footer">
          <a class="link-btn room-btn" href="#" data-modal="room">Подробнее</a>
          <p class="room__price">от <span>${this._price} ₽</span><br/>сутки/чел.</p>
        </div>
      </div>
    `;
    roomsSlider.append(slide);
  }
}


// Promise

const roomsSliderPromise = new Promise(function (resolve) {
  for (let i = 0; i < rooms.length; i++) {
    new RoomsSlide(rooms[i].title, rooms[i].price, rooms[i].tags, rooms[i].thumb[0]).render();
  }
  resolve();
}).then(() => {
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
      1366: {
        fixedWidth: '340px',
        gap: 60,
        width: '968px',
      },
      1024: {
        fixedWidth: '320px',
        width: '768px',
        gap: 45,
      },
      960: {
        focus: 'center',
        perPage: 1,
        perMove: 1,
        fixedWidth: '340px',
        width: '600px',
        gap: 60,
      },
      640: {
        perPage: 1,
        fixedWidth: '280px',
        width: '290px',
        gap: 30,
      },
    }
  }).mount();
});



const headerSlider = new Splide('.header__slider', {
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
// ------------------------------ //


// Modal

class Modal {
  constructor(params) {
    this._hidePrevModals();
    this._title = params['title'];
    this._subtitle = params['subtitle'];
    this._content = params['content'];
    this._width = params['width'] || 600;
    this._create();
    this._el.addEventListener("click", e => {
      if (e.target.dataset.modalBtn === 'close' || e.target === this._el) {
        this._hide();
      }
    });
  }
  _hidePrevModals() {
    let modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.remove();
    });
  }
  _hide() {
    this._el.remove();
    document.body.style.overflow = '';
    const event = new CustomEvent("hide.modal", {
      detail: {
        target: this._el
      }
    });
    document.dispatchEvent(event);
  }
  _create() {
    const modal = document.createElement('div');
    const modalTitle = this._title !== false ? `<h3 class="modal__title">${this._title}</h3>` : "";
    const modalSubtitle = this._subtitle !== false ? `<p class="modal__subtitle">${this._subtitle}</p>` : "";
    const modalContent = this._content !== false ? `<div class="modal__content">${this._content}</div>` : "";
    modal.classList.add('modal');
    const width = typeof (this._width) != 'string' ? this._width + "px" : this._width;
    modal.innerHTML = `
      <div class="modal__dialog" style="max-width:${width};">
        <button class="modal__btn-close" data-modal-btn="close"></button>
        <div class="modal__header">
          ${modalTitle}
          ${modalSubtitle}
        </div>
        ${modalContent}
      </div>
    `;
    this._el = modal;
    document.body.style.overflow = 'hidden';
    document.body.append(modal);
  }
}


// Open Feedback From in Modal
document.addEventListener("click", (e) => {

  if (e.target.dataset.modal) {
    e.preventDefault();
  }

  if (e.target.dataset.modal === 'feedback') {
    new Modal({
      title: 'Оставьте заявку',
      subtitle: false,
      content: `
        <form class="feedback__modal-form" method="post" action="#">
          <input type="text" name="fristname" id="fristname" placeholder="Имя" required>
          <input type="tel" name="phone" id="phone" placeholder="+7 (123) 456-78-90" required>
          <div class="feedback__modal-privacy">
          <input type="checkbox" name="privacy" id="modal-privacy" required>
          <label for="modal-privacy">
              Отправляя нам свои данные, Вы соглашаетесь с 
              <a href="#" class="feedback__modal-privacy-text">
                политикой конфиденциальности
              </a>
              </label>
            </div>
            <button class="link-btn" type="submit">Отправить</button>
        </form>`
    });
  }
});
/*
const modalTrigger = document.querySelectorAll('[data-modal]');
for (let i = 0; i < modalTrigger.length; i++) {
  modalTrigger[i].addEventListener('click', (e) => {
    document.body.style.overflow = 'hidden';

    if (e.target.dataset.modal === 'feedback') {
      new Modal({
        title: 'Оставьте заявку',
        subtitle: false,
        content: `
          <form class="feedback__modal-form" method="post" action="#">
            <input type="text" name="fristname" id="fristname" placeholder="Имя" required>
            <input type="tel" name="phone" id="phone" placeholder="+7 (123) 456-78-90" required>
            <div class="feedback__modal-privacy">
            <input type="checkbox" name="privacy" id="modal-privacy" required>
            <label for="modal-privacy">
                Отправляя нам свои данные, Вы соглашаетесь с 
                <a href="#" class="feedback__modal-privacy-text">
                  политикой конфиденциальности
                </a>
                </label>
              </div>
              <button class="link-btn" type="submit">Отправить</button>
          </form>`
      });
    } else {
      document.body.style.overflow = '';
    }
  });
}*/


// Forms

const message = {
  loading: `<p class="send send--wait">Отправляется...</p>`,
  success: `<p class="send send--success">Успешно отправлено!</p>`,
  failure: `<p class="send send--error">Ошибка!</p>`
};

document.addEventListener('submit', (e) => {
  let forms = document.querySelectorAll('form');

  forms.forEach(form => {
    e.preventDefault();
    new Modal({
      title: false,
      subtitle: false,
      content: message.loading
    });
    const request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json');
    const formData = new FormData(form);
    const object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    const json = JSON.stringify(object);
    request.send(json);
    request.addEventListener('load', () => {
      if (request.status === 200) {
        form.reset();
        new Modal({
          title: 'Успех',
          subtitle: false,
          content: message.success
        });
      } else {
        new Modal({
          title: 'Не отправлено',
          subtitle: false,
          content: message.failure
        });
      }
    });
  });
});

/*
function postData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    new Modal({
      title: false,
      subtitle: false,
      content: message.loading
    });

    const request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json');
    const formData = new FormData(form);

    const object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    const json = JSON.stringify(object);

    request.send(json);

    request.addEventListener('load', () => {
      if (request.status === 200) {
        console.log(request.response);
        form.reset();
        new Modal({
          title: 'Успех',
          subtitle: false,
          content: message.success
        });
      } else {
        new Modal({
          title: 'Не отправлено',
          subtitle: false,
          content: message.failure
        });
      }
    });
  });
}
*/

////////////////////////////////////////////////

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

// Open Room in Modal & Thumbnail-Slider for Room in Modal

const roomSlides = document.querySelectorAll('[data-slide="room"]');
for (let i = 0; i < roomSlides.length; i++) {
  roomSlides[i].addEventListener('click', (e) => {
    if (e.target.dataset.modal === 'room') {
      let servicesList = "";
      rooms[i].services.forEach(service => {
        servicesList += `<li class="service__item">${service}</li>`;
      });
      let roomMainThumb = "";
      rooms[i].thumb.forEach(thumb => {
        roomMainThumb += `
            <li class="splide__slide">
              <img src="${thumb}" alt="${thumb}" />
            </li>
        `;
      });
      let roomThumbs = "";
      rooms[i].thumb.forEach(thumb => {
        roomThumbs += `
            <li class="thumbnail">
              <img src="${thumb}" alt="${thumb}" />
            </li>
        `;
      });

      new Modal({
        title: rooms[i].title,
        subtitle: false,
        content: `
          <div id="main-slider" class="splide">
            <div class="splide__arrows rooms__slider-arrows">
              <button class="splide__arrow splide__arrow--prev"></button>
              <button class="splide__arrow splide__arrow--next"></button>
            </div>
            <div class="splide__track">
              <ul class="splide__list">
                ${roomMainThumb}
              </ul>
            </div>
          </div>
          <ul id="thumbnails" class="thumbnails">
            ${roomThumbs}
          </ul>
          <div class="room-modal__content-btn">
            <div class="room-modal__content-price">
              <p>от <span>${rooms[i].price} ₽</span></p>
              <p>сутки/чел.</p>
            </div>
            <button class="link-btn" type="submit" data-modal="feedback">Забронировать</button>
          </div>

          <div class="room-modal__content">
            <div>
              <ul class="room-modal__benefits">
                <li class="room-modal__benefits-item">
                  <img src='images/icons/wifi.svg' alt='Бесплатный Wi-Fi'> Бесплатный Wi-Fi
                </li>
                <li class="room-modal__benefits-item">
                  <img src='images/icons/parking.svg' alt='Бесплатная парковка'> Бесплатная парковка
                </li>
              </ul>
            </div>
            <div><strong>Площадь номера</strong> ${rooms[i].area} м²</div>
            <div><strong>Курение:</strong> ${rooms[i].smoking}</div>
            <div>
              <p><strong>Услуги и удобства:</strong></p>
              <ul class="room-modal__services-list">${servicesList}</ul>
            </div>
          </div>
          `,
        width: 968,
      });
      createThumbSlider();
    }
  });
}

function createThumbSlider() {
  const splide = new Splide("#main-slider", {
    width: 600,
    height: 400,
    pagination: false,
    cover: true,
    breakpoints: {
      960: {
        height: 320,
      },
      640: {
        height: 240,
      },
    }
  });
  let thumbnails = document.querySelectorAll(".thumbnail");
  let current;
  for (var y = 0; y < thumbnails.length; y++) {
    initThumbnail(thumbnails[y], y);
  }

  function initThumbnail(thumbnail, index) {
    thumbnail.addEventListener("click", function () {
      splide.go(index);
    });
  }
  splide.on("mounted moved", function () {
    var thumbnail = thumbnails[splide.index];
    if (thumbnail) {
      if (current) {
        current.classList.remove("is-active");
      }
      thumbnail.classList.add("is-active");
      current = thumbnail;
    }
  });
  splide.mount();
}
// ----- //