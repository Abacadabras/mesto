import { dataCards } from './cards.js';
import { dataForms } from "./forms.js";

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

const onOpen = (popup) => popup.classList.add('popup_active');
const onClose = (popup) => popup.classList.remove('popup_active');

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
  onClose(popupElem);
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
  onOpen(popupElem);
});

buttonAddPlace.addEventListener('click', () => {
  fillPopup(dataForms.formCard);
  popupInputName.value = '';
  popupInputDescription.value = '';
  onOpen(popupElem);
})

popupCloseBtn.addEventListener('click', () => {
  onClose(popupElem)
});

popupElem.addEventListener('submit', onSubmit);

const placeElem = document.querySelector('#place').content.querySelector('.place');
const placesElem = document.querySelector('.places');

const clickCardPlace = (evt) => {
  if (evt.target.classList.contains('place__btn-like')) {
    evt.target.classList.toggle('place__btn-like_active');
  }
};

const generatePlaceCard = (dataPlace) => {
  const newCardPlace = placeElem.cloneNode(true);

  const titleCard = newCardPlace.querySelector('.place__title');
  titleCard.textContent = dataPlace.name;
  const imgCard = newCardPlace.querySelector('.place__image');
  imgCard.src = dataPlace.link;

  newCardPlace.addEventListener('click', clickCardPlace);
  return newCardPlace;
};

const renderCardPlace = (place) => placesElem.prepend(generatePlaceCard(place));

dataCards.forEach((card) => renderCardPlace(card));
