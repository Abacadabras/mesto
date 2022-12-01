import { dataCards } from './dataCards.js';

//Popups profile and event handling
const popupCloseBtns = document.querySelectorAll('.button.popup__btn-close');

const popupProfileElem = document.querySelector('.popup.popup_type_profile');
const popupProfileInputName = popupProfileElem.querySelector('input[name=name]');
const popupProfileInputDescription = popupProfileElem.querySelector('input[name=description]');

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

popupProfileElem.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileJob.textContent = popupProfileInputDescription.value;
  closePopup(evt.currentTarget);
});

buttonEditProfile.addEventListener('click', () => {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileJob.textContent;
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
const popupCardInputName = popupCardElem.querySelector('input[name=name]');
const popupCardInputDescription = popupCardElem.querySelector('input[name=description]');

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

buttonAddPlace.addEventListener('click', () => {
  openPopup(popupCardElem);
})

popupCardElem.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCardPlace({ name: popupCardInputName.value, link: popupCardInputDescription.value, });
  popupCardInputName.value = popupCardInputDescription.value = '';
  closePopup(evt.currentTarget);
});

dataCards.forEach(renderCardPlace);
