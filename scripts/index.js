import { dataCards } from './cards.js';
import { dataForms } from "./forms.js";

//Popups profile, add card place and event handling
const popupElem = document.querySelector('.popup');
const popupTitle = popupElem.querySelector('.popup__title');
const popupSaveBtn = popupElem.querySelector('.popup__btn-save');
const popupCloseBtn = popupElem.querySelector('.button.popup__btn-close');
const popupInputName = popupElem.querySelector('input[name=name]');
const popupInputDescription = popupElem.querySelector('input[name=description]');

const buttonEditProfile = document.querySelector('.button.profile__btn-edit');
const buttonAddPlace = document.querySelector('.button.profile__btn-add');

const profileElem = document.querySelector('.profile__info');
const profileName = profileElem.querySelector('.profile__title');
const profileJob = profileElem.querySelector('.profile__subtitle');

const openPopup = popup => popup.classList.add('popup_active');
const closePopup = popup => popup.classList.remove('popup_active');

const onSubmit = (evt) => {
  evt.preventDefault();
  if (popupTitle.textContent === dataForms.formProfile.title) {
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputDescription.value;
  } else if (popupTitle.textContent === dataForms.formCard.title) {
    renderCardPlace({ name: popupInputName.value, link: popupInputDescription.value, });
  } else {
    //renamed the title - it's a hacker! :)
  }
  closePopup(popupElem);
};

const fillPopup = (dataPopup) => {
  popupTitle.textContent = dataPopup.title;
  popupInputName.placeholder = dataPopup.placeholder_name;
  popupInputDescription.placeholder = dataPopup.placeholder_description;
  popupSaveBtn.textContent = dataPopup.btn;
};

buttonEditProfile.addEventListener('click', () => {
  fillPopup(dataForms.formProfile);
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileJob.textContent;
  openPopup(popupElem);
});

buttonAddPlace.addEventListener('click', () => {
  fillPopup(dataForms.formCard);
  popupInputName.value = '';
  popupInputDescription.value = '';
  openPopup(popupElem);
})

popupCloseBtn.addEventListener('click', () => {
  closePopup(popupElem);
});

popupElem.addEventListener('submit', onSubmit);

//Cards places render and event handling
const placeElem = document.querySelector('#place').content.querySelector('.place');
const placesElem = document.querySelector('.places');
const popupImgElem = document.querySelector('.popup.popup_image');
const popupImg = popupImgElem.querySelector('.figure__img');
const popupImgTitle = popupImgElem.querySelector('.figure__title');
const popupImgCloseBtn = popupImgElem.querySelector('.button.popup__btn-close');

popupImgCloseBtn.addEventListener('click', () => {
  closePopup(popupImgElem);
});

const clickCardPlace = (evt) => {
  if (evt.target.classList.contains('place__btn-like')) {
    evt.target.classList.toggle('place__btn-like_active');
  } else if (evt.target.classList.contains('place__btn-delete')) {
      evt.target.closest('.place').remove();
  } else if (evt.target.classList.contains('place__image')) {
      popupImg.src = evt.target.src;
      popupImg.alt = evt.target.alt;
      popupImgTitle.textContent = evt.target.alt;
      openPopup(popupImgElem);
  }
};

const generatePlaceCard = (dataPlace) => {
  const newCardPlace = placeElem.cloneNode(true);

  const titleCard = newCardPlace.querySelector('.place__title');
  titleCard.textContent = dataPlace.name;
  const imgCard = newCardPlace.querySelector('.place__image');
  imgCard.src = dataPlace.link;
  imgCard.alt = dataPlace.name;

  newCardPlace.addEventListener('click', clickCardPlace);
  return newCardPlace;
};

const renderCardPlace = (place) => placesElem.prepend(generatePlaceCard(place));

dataCards.forEach(renderCardPlace);
