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
  countLikesClass: '.place__likes-counter',
};

const apiConfig = {
  url: 'https://nomoreparties.co/v1/cohort-58/',
  headers: {
    authorization: '304f2533-a0f4-4995-ab0c-ee526874092a',
    'Content-Type': 'application/json',
  },
}

const userConfig = {
  nameClass: '.profile__title',
  aboutClass: '.profile__subtitle',
  imgClass: '.profile__avatar',
}

export {
  validationConfig,
  cardConfig,
  apiConfig,
  userConfig,
}
