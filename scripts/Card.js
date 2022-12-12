export default class Card {
  #selector
  #card
  #newCardElement
  #imgCardElement
  #btnLikeCard
  #btnDeleteCard
  #handleImgCard

  constructor(dataSelectors, dataCard, openPopup) {
    this.#selector = dataSelectors;
    this.#card = dataCard;
    this.#handleImgCard = openPopup;
  }

  #getTemplate() {
    return document
      .querySelector(this.#selector.template)
      .content
      .querySelector(this.#selector.card)
      .cloneNode(true);
  }

  #handleLikeCardBtn() {
    this.#btnLikeCard.classList.toggle(this.#selector.btnLikeCardActive);
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

    this.#imgCardElement = this.#newCardElement.querySelector(this.#selector.imageCard);
    this.#btnLikeCard = this.#newCardElement.querySelector(this.#selector.btnLikeCard);
    this.#btnDeleteCard = this.#newCardElement.querySelector(this.#selector.btnDeleteCard);

    this.#newCardElement.querySelector(this.#selector.titleCard).textContent = this.#card.name;
    this.#imgCardElement.alt = this.#card.name;
    this.#imgCardElement.src = this.#card.link;

    this.#setEventListeners();

    return this.#newCardElement;
  }
}
