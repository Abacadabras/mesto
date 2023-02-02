import { dataCards, validationConfig, cardConfig } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';


//Popups profile
const popupProfileSelector = '.popup.popup_type_profile';
const profileElem = document.querySelector('.profile__info');
const profileName = profileElem.querySelector('.profile__title');
const profileJob = profileElem.querySelector('.profile__subtitle');
const buttonEditProfile = document.querySelector('.button.profile__btn-edit');
//Cards places
const popupAddCardSelector = '.popup.popup_type_card';
const popupImgSelector = '.popup.popup_type_image';
const placesSelector = '.places';
const buttonAddPlace = document.querySelector('.button.profile__btn-add');

const formProfile = document.forms.profile;
const formAddCard = document.forms.addCard;
const profileFormValidator = new FormValidator(validationConfig, formProfile);
const addCardFormValidator = new FormValidator(validationConfig, formAddCard);

const popupImg = new PopupWithImage(popupImgSelector);

const placesList = new Section({
  items: dataCards,
  renderer: (place) => {
    const card = new Card(cardConfig, place, handleImgCard);
    const cardElement = card.generateCard();
    placesList.addItem(cardElement);
  }
}, placesSelector);

const handleImgCard = (name, link) => {
  popupImg.open(name, link);
};

buttonEditProfile.addEventListener('mousedown', () => {
  popupProfile.setInputValues({ author:  profileName.textContent, description:  profileJob.textContent });
  profileFormValidator.resetErrors();
  popupProfile.open();
});

buttonAddPlace.addEventListener('mousedown', () => {
  popupAddCard.open();
})

const handleSubmitProfile = (evt) => {
  evt.preventDefault();
  const { author, description } = popupProfile.close();
  profileName.textContent = author;
  profileJob.textContent = description;
  profileFormValidator.resetSubmit();
};

const handleSubmitCard = (evt) => {
  evt.preventDefault();
  const place = popupAddCard.close();
  const card = new Card(cardConfig, place, handleImgCard);
  const cardElement = card.generateCard();
  placesList.addItem(cardElement);
  addCardFormValidator.resetSubmit();
};

const popupProfile = new PopupWithForm(popupProfileSelector, handleSubmitProfile);
const popupAddCard = new PopupWithForm(popupAddCardSelector, handleSubmitCard);

placesList.renderItems();
popupImg.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
