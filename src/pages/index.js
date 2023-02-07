import './index.css';
import { validationConfig, cardConfig, apiConfig, userConfig } from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';


const buttonAddPlace = document.querySelector('.button.profile__btn-add');
const buttonEditProfile = document.querySelector('.button.profile__btn-edit');
const popupProfileSelector = '.popup.popup_type_profile';
const popupAddCardSelector = '.popup.popup_type_card';
const popupImgSelector = '.popup.popup_type_image';
const popupConfirmationSelector = '.popup_type_confirmation';
const placesSelector = '.places';

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

const handlePopupConfirmation = (card) => {
  popupConfirmation.open(card);
}

const handleSubmitConfirmation = (card) => {
  const cardId = card.getId();
  api.deleteCard(cardId).then(() => card.delete()).catch((err) => console.error(err));
};

const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector, handleSubmitConfirmation);

const handleLikeCard = (isLike, card) => {
  const cardId = card.getId();
  if (isLike) {
    api.likeCard(cardId).then(({ likes }) => card.setCountLike(likes.length)).catch((err) => console.error(err));
  } else {
    api.dislikeCard(cardId).then(({ likes }) => card.setCountLike(likes.length)).catch((err) => console.error(err));
  }
};

const addNewCard = (place) => {
  const placeWithOwner = { ...place, userId: user.getUserId() };
  const card = new Card(cardConfig, placeWithOwner, handleImgCard, handlePopupConfirmation, handleLikeCard);
  const cardElement = card.generateCard();
  placesList.addItem(cardElement);
}

const handleSubmitProfile = (newUser) => {
  api.setUser(newUser).then((dataUser) => user.setUserInfo(dataUser)).catch((err) => console.error(err));
  profileFormValidator.resetSubmit();
};

const handleSubmitCard = (newPlace) => {
  api.setDataCards(newPlace).then((dataPlace) => addNewCard(dataPlace)).catch((err) => console.error(err));
  addCardFormValidator.resetSubmit();
};

const placesList = new Section(addNewCard, placesSelector);
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

popupImg.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupConfirmation.setEventListeners();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

Promise.all([api.getUser(), api.getDataCards()])
  .then(([ dataUser, dataCards ]) => {
    user.setUserInfo(dataUser);
    placesList.renderItems(dataCards);
  })
  .catch((err) => console.error(err));
