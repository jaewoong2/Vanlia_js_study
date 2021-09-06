export default class Nav {
  constructor({ parent, initialState }) {
    this.$parent = parent;
    this.$target = Nav.createElement();
    this.$state = initialState;
    this.init();
  }

  static createElement() {
    const nav = document.createElement("nav");
    const tags = [
      { href: "/", content: "Dashboard" },
      { href: "/posts", content: "Posts" },
      { href: "/settings", content: "Settings" },
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
    this.$parent.appendChild(this.$target);
  }
}
