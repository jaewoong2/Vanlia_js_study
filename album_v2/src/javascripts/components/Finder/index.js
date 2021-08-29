import Component from "../../core/Component.js";

const initialState = {
  nodes: [{ type: "", name: "", id: "", filePath: "" }],
};

export default class Finder extends Component {
  constructor({ parent }) {
    super();
    this.$parent = parent;
    this.$target = Finder.createElement();
    this.$state = initialState;
    this.init();
  }

  init() {
    this.$parent.appendChild(this.$target);
    this.bindEvents();
  }

  static createElement() {
    const wrapper = document.createElement("ul");
    wrapper.classList.add("finder");

    return wrapper;
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
  }

  bindEvents() {
    this.$target.addEventListener("click", (event) => {
      const element = this.getElement(event.target, "li");
      if (!element) return;
      const { type, id } = element.dataset;

      switch (type) {
        case "DIRECTORY": {
          this.emit("onNextDirectory", id);
          return;
        }
        case "FILE": {
          this.emit("onOpenFile", id);
          return;
        }
        default:
          return;
      }
    });
  }

  getElement(element, tagName) {
    if (!element) return;

    let evaluate = element.tagName === tagName.toUpperCase();
    if (evaluate) {
      return element;
    }

    return this.getElement(element.parentElement, tagName);
  }

  render() {
    const nodesElement = this.$state.nodes
      .map((node) => {
        const isDirectory = node.type === "DIRECTORY";

        if (isDirectory) {
          return `
        <li data-id="${node.id}" data-type="${node.type}">
          <div class="node">
            <img src="/assets/images/icon_folder.png" />
            <strong>${node.name}</strong>
          </div>
        </li>
        `;
        }

        return `
      <li data-id="${node.id}" data-type="${node.type}">
      <div class="file-image">
        <img src="${node.filePath}" />
      </div>
      <div class="node">
        <img src="/assets/images/icon_image.png" />
        <strong>${node.name}</strong>
      </div>
    </li>
    `;
      })
      .join("");

    this.$target.innerHTML = nodesElement;
    return this.$target;
  }
}
