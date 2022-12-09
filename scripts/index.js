import { dataCards, dataValidate } from './constant.js';
import { enableValidation } from './validate.js';


const KEYESC = 'Escape';
//Popups profile
const popups = document.querySelectorAll('.popup');
const popupProfileElem = document.querySelector('.popup.popup_type_profile');
const popupProfileInputName = popupProfileElem.querySelector('input[name=profile-name]');
const popupProfileInputDescription = popupProfileElem.querySelector('input[name=profile-description]');
const profileElem = document.querySelector('.profile__info');
const profileName = profileElem.querySelector('.profile__title');
const profileJob = profileElem.querySelector('.profile__subtitle');
const buttonEditProfile = document.querySelector('.button.profile__btn-edit');
//Cards places
const popupCardElem = document.querySelector('.popup.popup_type_card');
const popupImgElem = document.querySelector('.popup.popup_type_image');
const placeElem = document.querySelector('#place').content.querySelector('.place');
const placesElem = document.querySelector('.places');
const buttonAddPlace = document.querySelector('.button.profile__btn-add');
const popupImg = popupImgElem.querySelector('.figure__img');
const popupImgTitle = popupImgElem.querySelector('.figure__title');
const popupCardInputName = popupCardElem.querySelector('input[name=place-name]');
const popupCardInputDescription = popupCardElem.querySelector('input[name=place-description]');

const handlePopupCloseEsc = (evt) => {
  if (evt.key === KEYESC) {
    closePopup(document.querySelector(`.popup_active`));
  }
};

const openPopup = (popup) => {
  document.addEventListener('keydown', handlePopupCloseEsc);
  popup.classList.add('popup_active');
};

const closePopup = (popup) => {
  document.removeEventListener('keydown', handlePopupCloseEsc);
  popup.classList.remove('popup_active');
};

const handlePopupClose = (evt) => {
  const isOverlay = evt.target.classList.contains('popup');
  const isClose = evt.target.classList.contains('popup__btn-close');
  if (isOverlay || isClose) closePopup(evt.currentTarget);
};

const clearErrors = (popup) => {
  const errorElements = popup.querySelectorAll('.form__input-error');
  errorElements.forEach((elem) => elem.textContent = '');
  const inputElements = popup.querySelectorAll('.form__input');
  inputElements.forEach((elem) => elem.classList.remove('form__input_error'));
};

const resetSubmitForm = (popup) => {
  const btnSubmit = popup.querySelector('.form__submit');
  btnSubmit.disabled = true;
  btnSubmit.classList.add('form__submit_inactive');
};

const clickLikeCardBtn = (evt) => evt.currentTarget.classList.toggle('place__btn-like_active');
const clickDeleteCardBtn = (evt) => evt.currentTarget.closest('.place').remove();
const clickImgCard = (evt) => {
  popupImg.src = evt.currentTarget.src;
  popupImgTitle.textContent = popupImg.alt = evt.currentTarget.alt;
  openPopup(popupImgElem);
};

const generatePlaceCard = (dataPlace) => {
  const newCardPlace = placeElem.cloneNode(true);

  const btnLikeCard = newCardPlace.querySelector('.button.place__btn-like');
  const btnDeleteCard = newCardPlace.querySelector('.button.place__btn-delete');
  const titleCard = newCardPlace.querySelector('.place__title');
  const imgCard = newCardPlace.querySelector('.place__image');

  titleCard.textContent = dataPlace.name;
  imgCard.alt = dataPlace.name;
  imgCard.src = dataPlace.link;

  imgCard.addEventListener('click', clickImgCard);
  btnLikeCard.addEventListener('click', clickLikeCardBtn);
  btnDeleteCard.addEventListener('click', clickDeleteCardBtn);

  return newCardPlace;
};

const renderCardPlace = (place) => placesElem.prepend(generatePlaceCard(place));

buttonEditProfile.addEventListener('click', () => {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileJob.textContent;
  clearErrors(popupProfileElem);
  openPopup(popupProfileElem);
});

buttonAddPlace.addEventListener('click', () => {
  openPopup(popupCardElem);
})

popups.forEach((popup) => {
  popup.addEventListener('click', handlePopupClose);
});

popupProfileElem.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileJob.textContent = popupProfileInputDescription.value;
  resetSubmitForm(evt.currentTarget);
  closePopup(evt.currentTarget);
});

popupCardElem.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCardPlace({ name: popupCardInputName.value, link: popupCardInputDescription.value, });
  evt.target.reset();
  resetSubmitForm(evt.currentTarget);
  closePopup(evt.currentTarget);
});

dataCards.forEach(renderCardPlace);
enableValidation(dataValidate);
