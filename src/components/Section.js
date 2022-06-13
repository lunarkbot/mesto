export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    })
  }

  addItem(addTo, item) {
    this._container.insertAdjacentElement(addTo, item);
  }
}