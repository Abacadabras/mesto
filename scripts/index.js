import { initialCards as dataCards } from './cards.js';

const popupElem = document.querySelector('.popup');
const buttonPopupClose = popupElem.querySelector('.button.popup__btn-close');
const buttonEditProfile = document.querySelector('.button.profile__btn-edit');
const formEditProfile = document.querySelector('.form');
const formInputName = formEditProfile.querySelector('input[name=name]');
const formInputJob = formEditProfile.querySelector('input[name=job]');
const profileElem = document.querySelector('.profile__info');
const profileName = profileElem.querySelector('.profile__title');
const profileJob = profileElem.querySelector('.profile__subtitle');

const onOpen = (popup) => popup.classList.add('popup_active');
const onClose = (popup) => popup.classList.remove('popup_active');

const onSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileJob.textContent = formInputJob.value;
  onClose(popupElem);
};

buttonEditProfile.addEventListener('click', () => {
  formInputName.value = profileName.textContent;
  formInputJob.value = profileJob.textContent;
  onOpen(popupElem);
});

buttonPopupClose.addEventListener('click', () => {
  onClose(popupElem)
});

popupElem.addEventListener('submit', onSubmit);

const placeElem = document.querySelector('#place').content.querySelector('.place');
const placesElem = document.querySelector('.places');

const generatePlaceCard = (dataPlace) => {
  const newCardPlace = placeElem.cloneNode(true);

  const titleCard = newCardPlace.querySelector('.place__title');
  titleCard.textContent = dataPlace.name;
  const imgCard = newCardPlace.querySelector('.place__image');
  imgCard.src = dataPlace.link;

  return newCardPlace;
};

const renderCardPlace = (place) => placesElem.append(generatePlaceCard(place));

dataCards.forEach((card) => renderCardPlace(card));
