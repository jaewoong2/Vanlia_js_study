export default class Typo {
  constructor() {
    this.$target = document.createElement("div");
    this.init();
  }

  init() {
    const phargraph1 = document.createElement("p");
    document.body.querySelector("#app").appendChild(this.$target);
    this.$target.appendChild(phargraph1);

    this.$target.classList.add("typo-container");

    this.$target.childNodes.forEach((node, idx) => {
      node.classList.add("typo");
      node.dataset.id = idx;
    });

    setTimeout(() => {
      phargraph1.style.transform = `translate(-50%, -50%)`;
    }, 200);

    phargraph1.innerText =
      "We can Make United Korea, \n only Understand Thier life";
  }
}
