export default class Typo {
  constructor() {
    this.$target = document.createElement("div");
    this.init();
  }

  init() {
    const phargraph1 = document.createElement("p");
    document.body.appendChild(this.$target);
    this.$target.appendChild(phargraph1);

    this.$target.childNodes.forEach((node, idx) => {
      node.classList.add("typo");
      node.dataset.id = idx;
    });

    phargraph1.innerText =
      "We can Make United Korea, \n only We can produce One Korea";
  }
}
