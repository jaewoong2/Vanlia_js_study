import { findIndexListElement, getClosestElement } from "../../utils/index.js";

export default class TabButtons {
  constructor() {
    this.renderElement = TabButtons.createRenderElement();
    this.bindEvents();
  }

  static createRenderElement() {
    const tabContainer = document.createElement("ul");
    tabContainer.classList.add("app-controller");
    const tabs = [
      { title: "Top5", iconName: "icon-top5" },
      { title: "PlayList", iconName: "icon-playlist" },
      { title: "Search", iconName: "icon-search" },
    ];

    tabContainer.innerHTML = tabs
      .map((tab) => {
        return `
            <li>
                <button type="button" class="button-app-controller">
                    <i class="tab-icon ${tab.iconName}"></i>
                    ${tab.title}
                </button>
            </li>
        `;
      })
      .join("");

    return tabContainer;
  }

  bindEvents() {
    this.renderElement.addEventListener("click", (event) => {
      const element = getClosestElement(event.target, "li");
      const currentIndex = findIndexListElement(element);

      this.emit("clickTab", { currentIndex });
    });
  }

  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }

  render() {
    return this.renderElement;
  }
}
