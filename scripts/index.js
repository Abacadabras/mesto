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

const clickLikeCardBtn = (evt) => evt.currentTarget.classList.toggle('place__btn-like_active');
const clickDeleteCardBtn = (evt) => evt.currentTarget.closest('.place').remove();
const clickImgCard = (evt) => {
  popupImg.src = evt.currentTarget.src;
  popupImgTitle.textContent = popupImg.alt = evt.currentTarget.alt;
  openPopup(popupImgElem);
};

const generatePlaceCard = (dataPlace) => {
  const newCardPlace = placeElem.cloneNode(true);

  const likeCardBtn = newCardPlace.querySelector('.button.place__btn-like');
  const deleteCardBtn = newCardPlace.querySelector('.button.place__btn-delete');
  const titleCard = newCardPlace.querySelector('.place__title');
  const imgCard = newCardPlace.querySelector('.place__image');

  titleCard.textContent = imgCard.alt = dataPlace.name;
  imgCard.src = dataPlace.link;

  imgCard.addEventListener('click', clickImgCard);
  likeCardBtn.addEventListener('click', clickLikeCardBtn);
  deleteCardBtn.addEventListener('click', clickDeleteCardBtn);

  return newCardPlace;
};

const renderCardPlace = (place) => placesElem.prepend(generatePlaceCard(place));

dataCards.forEach(renderCardPlace);
