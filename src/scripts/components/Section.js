export default class Section {
  #renderer
  #container
  constructor(renderer, containerSelector) {
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this.#container.prepend(element);
  }

  renderItems(items) {
    items.forEach(this.#renderer);
  }
}
