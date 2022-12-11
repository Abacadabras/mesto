const dataCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const dataValidateSelectors = {
   formSelector: '.form',
   inputSelector: '.form__input',
   submitButtonSelector: '.form__submit',
   inactiveButtonClass: 'form__submit_inactive',
   inputErrorClass: 'form__input_error',
};

const dataCardSelectors = {
  template: '#place',
  card: '.place',
  titleCard: '.place__title',
  imageCard: '.place__image',
  btnLikeCard: '.button.place__btn-like',
  btnDeleteCard: '.button.place__btn-delete',
  btnLikeCardActive: 'place__btn-like_active',
};

export {
  dataCards,
  dataValidateSelectors,
  dataCardSelectors,
}
