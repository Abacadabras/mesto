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

  #handleLikeCardBtn(evt) {
    evt.currentTarget.classList.toggle(this.#selector.btnLikeCardActive);
  }
  #handleDeleteCardBtn(evt) {
    evt.currentTarget.closest(this.#selector.card).remove();
  }

  #setEventListeners() {
    this.#btnLikeCard.addEventListener('click', (evt) => {
      this.#handleLikeCardBtn(evt);
    });
    this.#btnDeleteCard.addEventListener('click', (evt) => {
      this.#handleDeleteCardBtn(evt);
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
