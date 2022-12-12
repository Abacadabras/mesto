export default class Card {
  #class
  #card
  #newCardElement
  #imgCardElement
  #btnLikeCard
  #btnDeleteCard
  #handleImgCard

  constructor(cardConfig, dataCard, openPopup) {
    this.#class = cardConfig;
    this.#card = dataCard;
    this.#handleImgCard = openPopup;
  }

  #getTemplate() {
    return document
      .querySelector(this.#class.templateId)
      .content
      .querySelector(this.#class.cardClass)
      .cloneNode(true);
  }

  #handleLikeCardBtn() {
    this.#btnLikeCard.classList.toggle(this.#class.btnLikeCardActive);
  }
  #handleDeleteCardBtn() {
    this.#newCardElement.remove();
  }

  #setEventListeners() {
    this.#btnLikeCard.addEventListener('click', () => {
      this.#handleLikeCardBtn();
    });
    this.#btnDeleteCard.addEventListener('click', () => {
      this.#handleDeleteCardBtn();
    });
    this.#imgCardElement.addEventListener('click', (evt) => {
      this.#handleImgCard(evt);
    });
  }

  generateCard() {
    this.#newCardElement = this.#getTemplate();

    this.#imgCardElement = this.#newCardElement.querySelector(this.#class.imageCardClass);
    this.#btnLikeCard = this.#newCardElement.querySelector(this.#class.btnLikeCardClass);
    this.#btnDeleteCard = this.#newCardElement.querySelector(this.#class.btnDeleteCardClass);

    this.#newCardElement.querySelector(this.#class.titleCardClass).textContent = this.#card.name;
    this.#imgCardElement.alt = this.#card.name;
    this.#imgCardElement.src = this.#card.link;

    this.#setEventListeners();

    return this.#newCardElement;
  }
}
