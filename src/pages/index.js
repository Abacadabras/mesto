import './index.css';
import { validationConfig, cardConfig, apiConfig, userConfig, popupConfig, placesClass } from '../scripts/utils/constants.js';
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
const buttonEditAvatar = document.querySelector('.profile__avatar-wrapper');

const profileFormValidator = new FormValidator(validationConfig, document.forms.profile);
const addCardFormValidator = new FormValidator(validationConfig, document.forms.addCard);
const addAvatarFormValidator = new FormValidator(validationConfig, document.forms.addAvatar);

const popupImg = new PopupWithImage(popupConfig.popupImgClass);
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
  api.deleteCard(cardId).then(() => {
    popupConfirmation.close();
    card.delete();
  })
    .catch((err) => console.error(err));
};

const popupConfirmation = new PopupWithConfirmation(popupConfig.popupConfirmationClass, handleSubmitConfirmation);

const handleLikeCard = (isLike, card) => {
  const cardId = card.getId();
  if (isLike) {
    api.likeCard(cardId).then(({ likes }) => card.setCountLike(likes.length)).catch((err) => console.error(err));
  } else {
    api.dislikeCard(cardId).then(({ likes }) => card.setCountLike(likes.length)).catch((err) => console.error(err));
  }
};

const createCard = (dataCard) => {
  const card = new Card(cardConfig, dataCard, handleImgCard, handlePopupConfirmation, handleLikeCard);
  return card.generateCard();
}

const addNewCard = (place) => {
  const userId = user.getUserId();
  const placeWithOwner = { ...place, userId };
  const cardElement = createCard(placeWithOwner);
  placesList.addItem(cardElement);
}

const handleSubmitProfile = (newUser) => {
  return api.setUser(newUser).then(({ name, about }) => {
    user.setUserInfo({ name, about });
    profileFormValidator.resetSubmit();
  });
};

const handleSubmitCard = (newPlace) => {
  return api.setDataCards(newPlace).then((dataPlace) => {
    addNewCard(dataPlace);
    addCardFormValidator.resetSubmit();
  });
};

const handleSubmitAvatar = (newAvatar) => {
  return api.setAvatar(newAvatar).then(({ avatar }) => {
    user.setUserInfo({ avatar });
    addAvatarFormValidator.resetSubmit();
  });
};

const placesList = new Section(addNewCard, placesClass);
const popupProfile = new PopupWithForm(popupConfig.popupProfileClass, handleSubmitProfile);
const popupAddCard = new PopupWithForm(popupConfig.popupAddCardClass, handleSubmitCard);
const popupAvatar = new PopupWithForm(popupConfig.popupAvatarClass, handleSubmitAvatar);

buttonEditProfile.addEventListener('mousedown', () => {
  popupProfile.setInputValues(user.getUserInfo());
  profileFormValidator.resetErrors();
  popupProfile.open();
});

buttonAddPlace.addEventListener('mousedown', () => {
  popupAddCard.open();
})

buttonEditAvatar.addEventListener('mousedown', () => {
  popupAvatar.open();
})

popupImg.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupConfirmation.setEventListeners();
popupAvatar.setEventListeners();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
addAvatarFormValidator.enableValidation();

Promise.all([api.getUser(), api.getDataCards()])
  .then(([ dataUser, dataCards ]) => {
    user.setUserInfo(dataUser);
    placesList.renderItems(dataCards);
  })
  .catch((err) => console.error(err));
