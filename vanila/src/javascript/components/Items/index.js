import Component from "../../helper/component.js";

export default class Items extends Component {
  setup() {
    this.$state = { items: ["item1", "item2"] };
    this.bindEvents();
  }

  template() {
    const { items } = this.$state;
    return `
        <ul>
            ${items.map((item) => `<li>${item}</li>`)}
        </ul>
        <button class="add-btn">Add</button>
      `;
  }

  bindEvents() {
    this.$target.querySelector(".add-btn").addEventListener("click", () => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });
  }
}
