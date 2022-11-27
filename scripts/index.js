const popupElem = document.querySelector('.popup');
const editButton = document.querySelector('.button.profile__btn-edit');
const editProfileForm = document.querySelector('.form');
const profile = document.querySelector('.profile__info');

const onOpen = (popup) => popup.classList.add('popup_active');
const onClose = (popup) => popup.classList.remove('popup_active');

const onSubmit = (form) => {
  profile.children[0].textContent = form[0].value;
  profile.children[1].textContent = form[1].value;
  onClose(popupElem);
};

editButton.addEventListener('click', () => {
  editProfileForm[0].value = profile.children[0].textContent;
  editProfileForm[1].value = profile.children[1].textContent;
  onOpen(popupElem);
});

popupElem.addEventListener('click', (event) => {
  const isClose = event.target.classList.contains('popup__btn-close');
  const isSave = event.target.classList.contains('popup__btn-save');

  if (isClose) onClose(popupElem);

  if (isSave) {
    event.preventDefault();
    onSubmit(editProfileForm);
  }
});
