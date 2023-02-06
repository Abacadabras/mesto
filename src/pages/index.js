import './index.css';
import { dataCards, validationConfig, cardConfig, apiConfig, userConfig } from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';


//Popups profile
const popupProfileSelector = '.popup.popup_type_profile';
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
const user = new UserInfo(userConfig);
const api = new Api(apiConfig);

const handleImgCard = (name, link) => {
  popupImg.open(name, link);
};

const addNewCard = (place) => {
  const card = new Card(cardConfig, place, handleImgCard);
  const cardElement = card.generateCard();
  placesList.addItem(cardElement);
}

const handleSubmitProfile = (newUser) => {
  user.setUserInfo(newUser);
  profileFormValidator.resetSubmit();
};

const handleSubmitCard = (newPlace) => {
  addNewCard(newPlace);
  addCardFormValidator.resetSubmit();
};
const placesList = new Section({
    items: dataCards,
    renderer: addNewCard,
  },
  placesSelector
);

const popupProfile = new PopupWithForm(popupProfileSelector, handleSubmitProfile);
const popupAddCard = new PopupWithForm(popupAddCardSelector, handleSubmitCard);

buttonEditProfile.addEventListener('mousedown', () => {
  popupProfile.setInputValues(user.getUserInfo());
  profileFormValidator.resetErrors();
  popupProfile.open();
});

buttonAddPlace.addEventListener('mousedown', () => {
  popupAddCard.open();
})

placesList.renderItems();
popupImg.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

api.getUser().then((dataUser) => user.setUserInfo(dataUser)).catch((err) => console.error(err));
