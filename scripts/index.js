const popupElem = document.querySelector('.popup');
const buttonPopupClose = popupElem.querySelector('.button.popup__btn-close');
const buttonEditProfile = document.querySelector('.button.profile__btn-edit');
const formEditProfile = document.querySelector('.form');
const formInputName = formEditProfile.querySelector('input[name=name]');
const formInputJob = formEditProfile.querySelector('input[name=job]');
const profile = document.querySelector('.profile__info');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');

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
