import { createCircle } from "./utils.js";

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms % 1000);
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
    imageContainers: document
      .querySelector(".fourth")
      .querySelector(".image-containers"),
    imageContainer: document
      .querySelector(".fourth")
      .querySelectorAll(".image-container"),
    years: document.querySelector(".years"),
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
  await sleep(2000);
  fourth();
};

const fourth = async () => {
  const { target, imageContainers, imageContainer, years } = content.fourth;
  target.style.height = `1000%`;
  target.classList.remove("hidden");

  imageContainer.forEach((node, i) => {
    if (i % 2) {
      node.style.transform = `translateY(${50}px)`;
    } else {
      node.style.transform = `translateY(${-50}px)`;
    }
  });

  let dx = 0;
  let currentScroll = window.scrollY;

  window.addEventListener("scroll", (e) => {
    const { y, height } = target.getBoundingClientRect();
    const { y: imageContainersY } = imageContainers.getBoundingClientRect();

    if (y < 0) {
      dx -= currentScroll - window.scrollY;
      currentScroll = window.scrollY;

      imageContainers.classList.add("fixed");
      imageContainers.style.transform = `translateX(${-dx}px)`;

      years.querySelectorAll("div").forEach((node, i) => {
        if (-y < height * 0.2) {
          i === 0 ? node.classList.add("now") : node.classList.remove("now");
        } else if (-y < height * 0.4) {
          i === 1 ? node.classList.add("now") : node.classList.remove("now");
        } else if (-y < height * 0.6) {
          i === 2 ? node.classList.add("now") : node.classList.remove("now");
        } else if (-y < height * 0.8) {
          i === 3 ? node.classList.add("now") : node.classList.remove("now");
        } else if (-y < height) {
          i === 4 ? node.classList.add("now") : node.classList.remove("now");
        }
      });

      years.classList.add("fixed-years");
    } else {
      if (imageContainersY < 0) {
        dx -= currentScroll - window.scrollY;
      }
      currentScroll = window.scrollY;
      years.classList.remove("fixed-years");
      imageContainers.classList.remove("fixed");
    }
  });
};

window.onload = init;
