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

const validationConfig = {
   formClass: '.form',
   inputClass: '.form__input',
   submitButtonClass: '.form__submit',
   inactiveButton: 'form__submit_inactive',
   inputError: 'form__input_error',
   inputErrorClass: '.form__input-error',
};

const cardConfig = {
  templateId: '#place',
  cardClass: '.place',
  titleCardClass: '.place__title',
  imageCardClass: '.place__image',
  btnLikeCardClass: '.button.place__btn-like',
  btnDeleteCardClass: '.button.place__btn-delete',
  btnLikeCardActive: 'place__btn-like_active',
};

export {
  dataCards,
  validationConfig,
  cardConfig,
}
