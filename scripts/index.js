import { dataCards } from './dataCards.js';
import { dataValidate } from './dataValidate.js';
import { enableValidation } from './validate.js';


//Popups profile and event handling
const popupCloseBtns = document.querySelectorAll('.button.popup__btn-close');

const popupProfileElem = document.querySelector('.popup.popup_type_profile');
const popupProfileInputName = popupProfileElem.querySelector('input[name=profile-name]');
const popupProfileInputDescription = popupProfileElem.querySelector('input[name=profile-description]');

const profileElem = document.querySelector('.profile__info');
const profileName = profileElem.querySelector('.profile__title');
const profileJob = profileElem.querySelector('.profile__subtitle');

const buttonEditProfile = document.querySelector('.button.profile__btn-edit');

const openPopup = (popup) => popup.classList.add('popup_active');
const closePopup = (popup) => popup.classList.remove('popup_active');

popupCloseBtns.forEach((btn) => {
  const popupElem = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popupElem));
});

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

popupProfileElem.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileJob.textContent = popupProfileInputDescription.value;
  resetSubmitForm(evt.currentTarget);
  closePopup(evt.currentTarget);
});

buttonEditProfile.addEventListener('click', () => {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileJob.textContent;
  clearErrors(popupProfileElem);
  openPopup(popupProfileElem);
});

//Cards places render and event handling
const popupCardElem = document.querySelector('.popup.popup_type_card');
const popupImgElem = document.querySelector('.popup.popup_type_image');
const placeElem = document.querySelector('#place').content.querySelector('.place');
const placesElem = document.querySelector('.places');
const buttonAddPlace = document.querySelector('.button.profile__btn-add');

const popupImg = popupImgElem.querySelector('.figure__img');
const popupImgTitle = popupImgElem.querySelector('.figure__title');
const popupCardInputName = popupCardElem.querySelector('input[name=place-name]');
const popupCardInputDescription = popupCardElem.querySelector('input[name=place-description]');

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

  titleCard.textContent = imgCard.alt = dataPlace.name;
  imgCard.src = dataPlace.link;

  imgCard.addEventListener('click', clickImgCard);
  btnLikeCard.addEventListener('click', clickLikeCardBtn);
  btnDeleteCard.addEventListener('click', clickDeleteCardBtn);

  return newCardPlace;
};

const renderCardPlace = (place) => placesElem.prepend(generatePlaceCard(place));

buttonAddPlace.addEventListener('click', () => {
  openPopup(popupCardElem);
})

popupCardElem.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCardPlace({ name: popupCardInputName.value, link: popupCardInputDescription.value, });
  evt.target.reset();
  resetSubmitForm(evt.currentTarget);
  closePopup(evt.currentTarget);
});

dataCards.forEach(renderCardPlace);
enableValidation(dataValidate);
