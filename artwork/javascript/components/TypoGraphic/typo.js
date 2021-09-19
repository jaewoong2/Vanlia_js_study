export default class Typo {
  constructor({ className, text, callback }) {
    this.$target = document.createElement("div");
    this.init({ className, text, callback });
  }

  init({ className, text }) {
    const phargraph1 = document.createElement("p");
    document.body.querySelector("#app").appendChild(this.$target);
    this.$target.appendChild(phargraph1);

    this.$target.classList.add("typo-container");

    this.$target.childNodes.forEach((node, idx) => {
      node.classList.add(className);
      node.dataset.id = idx;
    });

    setTimeout(() => {
      phargraph1.style.transform = `translate(-50%, -50%)`;
    }, 10);

    phargraph1.innerText = text;
  }
}
