import { dataCards, validationConfig, cardConfig } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'


const KEY_ESC = 'Escape';
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
const placesElem = document.querySelector('.places');
const buttonAddPlace = document.querySelector('.button.profile__btn-add');
const popupImg = popupImgElem.querySelector('.figure__img');
const popupImgTitle = popupImgElem.querySelector('.figure__title');
const popupCardInputName = popupCardElem.querySelector('input[name=place-name]');
const popupCardInputDescription = popupCardElem.querySelector('input[name=place-description]');

const formProfile = document.forms.profile;
const formAddCard = document.forms.addCard;
const profileFormValidator = new FormValidator(validationConfig, formProfile);
const addCardFormValidator = new FormValidator(validationConfig, formAddCard);

const handlePopupCloseEsc = (evt) => {
  if (evt.key === KEY_ESC) {
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

const handleImgCard = (evt) => {
  popupImg.src = evt.currentTarget.src;
  popupImgTitle.textContent = popupImg.alt = evt.currentTarget.alt;
  openPopup(popupImgElem);
};

const renderCardPlace = (place) => {
  const newCard = new Card(cardConfig, place, handleImgCard);
  placesElem.prepend(newCard.generateCard());
}

buttonEditProfile.addEventListener('click', () => {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileJob.textContent;
  profileFormValidator.resetErrors();
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
  profileFormValidator.resetSubmit();
  closePopup(evt.currentTarget);
});

popupCardElem.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCardPlace({ name: popupCardInputName.value, link: popupCardInputDescription.value, });
  addCardFormValidator.resetInputs();
  addCardFormValidator.resetSubmit();
  closePopup(evt.currentTarget);
});

dataCards.forEach(renderCardPlace);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
