import { createCircle } from "./utils.js";

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

const content = {
  app: document.querySelector("#app"),
  firstTitle: {
    target: document.querySelector(".first-title"),
    forKorea: document.querySelector(".for-korea"),
    underStand: document.querySelector(".understand"),
  },
  secondBackground: {
    target: document.querySelector(".second-background"),
    leftCircle: document.querySelector(".left-circle"),
    rightCircle: document.querySelector(".right-circle"),
    title: document.querySelector(".title"),
    arrow: document.querySelector(".arrow"),
  },
  third: {
    target: document.querySelector(".third"),
    head: document.querySelector(".head"),
    imageContainer: document
      .querySelector(".third")
      .querySelector(".image-container"),
  },
  fourth: {
    target: document.querySelector(".fourth"),
    imageContainer: document
      .querySelector(".fourth")
      .querySelector(".image-container"),
  },
};

const init = async () => {
  const { app, firstTitle } = content;
  firstTitle.forKorea.classList.remove("hidden");
  firstTitle.underStand.classList.add("left-move");
  await sleep(2000);
  firstTitle.target.classList.add("up-move");
  second();
  await sleep(5000);
  app.removeChild(firstTitle.target);
};

const second = async () => {
  const { title, arrow } = content.secondBackground;
  await sleep(1500);
  title.classList.remove("hidden");
  title.classList.add("animation-title");
  await sleep(4000);
  arrow.classList.remove("hidden");
  arrow.classList.add("pos-down");
  arrow.addEventListener("click", () => {
    window.scrollTo({ top: document.body.offsetHeight, behavior: "smooth" });
  });
  third();
};

const third = async () => {
  const { target, head, imageContainer } = content.third;
  target.style.height = `100%`;
  window.scrollTo({ top: document.body.offsetHeight, behavior: "smooth" });
  head.classList.remove("hidden");
  imageContainer.classList.remove("hidden");
  createCircle({
    parent: target,
    peresentage: 52.8,
    text: "52.8%",
    textColor: "white",
    containerClass: "circle-box",
    width: `250px`,
    height: `250px`,
  });

  createCircle({
    parent: target,
    peresentage: 62.6,
    text: "62.6%",
    textColor: "white",
    containerClass: "circle-box2",
    width: `250px`,
    height: `250px`,
  });

  createCircle({
    parent: target,
    peresentage: 89.8,
    text: "89.8%",
    textColor: "white",
    containerClass: "circle-box3",
    width: `250px`,
    height: `250px`,
  });

  await sleep(1000);
  target.querySelector(".circle-box3").classList.add("circle-text3");
  target.querySelector(".circle-box2").classList.add("circle-text2");
  target.querySelector(".circle-box").classList.add("circle-text");
  fourth();
};

const fourth = async () => {
  const { target, imageContainer } = content.fourth;
  target.style.height = `500%`;
  imageContainer.classList.remove("hidden");
};

window.onload = init;
