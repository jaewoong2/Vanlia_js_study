export default class Nav {
  constructor({
    parent,
    initialState = {
      tags: [
        { href: "/", content: "Dashboard" },
        { href: "/posts", content: "Posts" },
        { href: "/settings", content: "Settings" },
      ],
    },
  }) {
    this.$parent = parent;
    this.$target = Nav.createElement();
    this.$state = initialState;
    this.init();
  }

  static createElement() {
    const nav = document.createElement("nav");
    nav.innerHTML = this.$state.tags
      .map((tag) => {
        return `
            <a href=${tag.href}} class="nav__link" data-link>${tag.content}</a>
        `;
      })
      .join("");

    return nav;
  }

  init() {
    this.$parent.appendChild(this.$target);
  }
}
