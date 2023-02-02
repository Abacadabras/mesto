export default class Section {
  #renderedItems
  #renderer
  #container
  constructor({ items, renderer }, containerSelector) {
    this.#renderedItems = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this.#container.prepend(element);
  }

  renderItems() {
    this.#renderedItems.forEach(this.#renderer);
  }
}
