export default class Card {
  #class
  #cardName
  #cardLink
  #newCardElement
  #imgCardElement
  #btnLikeCard
  #btnDeleteCard
  #handleImgCard
  #countLikes
  #countLikesElem
  #handleConfirmation
  #userId
  #ownerId
  #cardId

  constructor(cardConfig, { _id, name, link, likes, userId, owner }, openPopup, openConfirmation) {
    this.#class = cardConfig;
    this.#cardName = name;
    this.#cardLink = link;
    this.#handleImgCard = openPopup;
    this.#countLikes = likes.length;
    this.#handleConfirmation = openConfirmation;
    this.#userId = userId;
    this.#ownerId = owner._id;
    this.#cardId = _id;
  }

  #getTemplate() {
    return document
      .querySelector(this.#class.templateId)
      .content
      .querySelector(this.#class.cardClass)
      .cloneNode(true);
  }

  #handleLikeCardBtn() {
    if (this.#btnLikeCard.classList.toggle(this.#class.btnLikeCardActive)) {
      this.#countLikes += 1;
    } else {
      this.#countLikes -= 1;
    }
    this.#countLikesElem.textContent = this.#countLikes;
  }

  #setEventListeners() {
    this.#btnLikeCard.addEventListener('click', this.#handleLikeCardBtn.bind(this));
    if (this.#btnDeleteCard !== null) {
      this.#btnDeleteCard.addEventListener('click', this.#handleConfirmation.bind(this, this));
    }
    this.#imgCardElement.addEventListener('click', this.#handleImgCard.bind(this, this.#cardName, this.#cardLink));
  }

  #isOwner() {
    if (this.#userId !== this.#ownerId) {
      this.#btnDeleteCard.remove();
      this.#btnDeleteCard = null;
    }
  }

  delete() {
    this.#newCardElement.remove();
    this.#newCardElement = null;
  }

  generateCard() {
    this.#newCardElement = this.#getTemplate();

    this.#imgCardElement = this.#newCardElement.querySelector(this.#class.imageCardClass);
    this.#btnLikeCard = this.#newCardElement.querySelector(this.#class.btnLikeCardClass);
    this.#btnDeleteCard = this.#newCardElement.querySelector(this.#class.btnDeleteCardClass);
    this.#countLikesElem = this.#newCardElement.querySelector(this.#class.countLikesClass);

    this.#newCardElement.querySelector(this.#class.titleCardClass).textContent = this.#cardName;
    this.#imgCardElement.alt = this.#cardName;
    this.#imgCardElement.src = this.#cardLink;
    this.#countLikesElem.textContent = this.#countLikes;

    this.#isOwner();
    this.#setEventListeners();

    return this.#newCardElement;
  }

  getId() {
    return this.#cardId;
  }
}
