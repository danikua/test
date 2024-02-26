"use strict"

const swiper = new Swiper('.img-slider', {
  // Optional parameters
  loop: true, 

  // Navigation arrows
  navigation: {
    nextEl: '.img__swiper-button-next',
    prevEl: '.img__swiper-button-prev',
  },

  mousewheel:{
    sensitivity: 1,
    eventsTarget: '.img-slider',
  },
  
  centeredSlides: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    991.98: {
      slidesPerView: 3.5,
    },
    479.98: {
      slidesPerView: 2.5,
    }
  }
});

const gallerySwiper = new Swiper('.gallery-slider', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.gallery__swiper-pagination',
    clickable:true,
  },

  mousewheel:{
    sensitivity: 1,
    eventsTarget: '.gallery-slider',
  },
  slidesPerView:1,
  
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  
});


document.addEventListener('click', documentClick);

function documentClick(e){
  const tartgetItem = e.target;
  if (tartgetItem.closest('.icon-menu')){
    document.documentElement.classList.toggle('menu-open');
  }
}

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
  for(let i = 0; i < popupLinks.length; i++){
    const popupLink = popupLinks[i];
    popupLink.addEventListener('click', e => {
      const curentPopup = document.getElementById('popup');
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0){
  for(let i = 0; i < popupCloseIcon.length; i++){
    const el = popupCloseIcon[i];
    el.addEventListener('click', e => {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup){
  if(curentPopup && unlock){
    const popupActive = document.querySelector('.popup.open');
    if(popupActive){
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', e => {
      if(!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive,  doUnlock = true) {
  if(unlock){
    popupActive.classList.remove('open');
    if(doUnlock){
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  for(let i = 0; i < lockPadding.length; i++){
    const el = lockPadding[i];
    el.style.paddingRight = lockPaddingValue;
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout( () => {
    unlock = true;
  }, timeout);
}

function bodyUnlock(){
  setTimeout( () => {
    for(let i = 0; i < lockPadding.length; i++){
      const el = lockPadding[i];
      el.style.paddingRight = '0px';
  }
  body.style.paddingRight = '0px';
  body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', e => {
  if(e.which === 27){
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

(function () {
  if(!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      let node = this;
      while(node) {
        if(node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();

(function(){
  if(!Element.prototype.matches){
    Element.prototype.matches = Element.prototype.MatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector;
  }
})();