import { Component } from "../../core/index.js";

export default class Nav extends Component {
  constructor({ parent }) {
    super({ parent });
    this.init();
  }

  static createElement() {
    const nav = document.createElement("nav");
    const tags = [
      { href: "/", content: "Dashboard" },
      { href: "/counter", content: "Counter" },
      { href: "/settings", content: "Settings" },
      { href: "/datas", content: "Datas" },
    ];

    nav.classList.add("nav");

    nav.innerHTML = tags
      .map((tag) => {
        return `
            <a href=${tag.href} class="nav__link" data-link>${tag.content}</a>
        `;
      })
      .join("");

    return nav;
  }

  init() {
    this.$target = Nav.createElement();
    this.$parent.appendChild(this.$target);
  }
}
