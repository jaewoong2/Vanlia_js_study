import { createCircle, throttle } from "./utils.js";

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
    imageContainers: document
      .querySelector(".fourth")
      .querySelector(".image-containers"),
    imageContainer: document
      .querySelector(".fourth")
      .querySelectorAll(".image-container"),
    years: document.querySelector(".years"),
  },
  fifth: {
    target: document.querySelector(".fifth"),
    bigger: document.querySelector(".fifth").querySelector(".bigger"),
  },
  sixth: {
    target: document.querySelector(".sixth"),
    redBall: document.querySelector(".red"),
    blueBall: document.querySelector(".blue"),
    fusion: document.querySelector(".fusion"),
  },
  backgroundContainer: document.querySelector(".background-container"),
  rightContainer: document.querySelector(".right-container"),
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
  let isUseFifth = false;

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

  const onScrollEvnet = () => {
    const { y, height, bottom } = target.getBoundingClientRect();
    const { y: imageContainersY } = imageContainers.getBoundingClientRect();
    if (bottom < -11) return;

    if (y < 20) {
      content.backgroundContainer.style.display = "block";
      content.rightContainer.style.display = "block";
      dx -= currentScroll - window.scrollY;
      currentScroll = window.scrollY;

      years.style.opacity = 1;
      imageContainers.style.opacity = 1;

      years.classList.remove("scroll-end-yeras");
      imageContainers.classList.remove("scroll-end-container");
      content.backgroundContainer.classList.remove("scroll-end-container");
      content.rightContainer.classList.remove("scroll-end-container");

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
      } else {
        dx = 0;
      }

      content.backgroundContainer.classList.add("scroll-end-container");
      content.rightContainer.classList.add("scroll-end-container");

      imageContainers.style.transform = `translateX(${-dx}px)`;
      currentScroll = window.scrollY;

      years.classList.remove("fixed-years");
      imageContainers.classList.remove("fixed");
    }

    if (bottom - 10 < document.body.offsetHeight) {
      !isUseFifth && fifth();
      isUseFifth = true;
      years.classList.add("scroll-end-yeras");
      imageContainers.classList.add("scroll-end-container");

      content.backgroundContainer.classList.add("scroll-end-container");
      content.rightContainer.classList.add("scroll-end-container");
    }
  };

  window.addEventListener("scroll", throttle(onScrollEvnet, 5));
};

const fifth = async () => {
  const { target, bigger } = content.fifth;
  target.classList.remove("hidden");

  let isSixUsed = false;
  let alpha = 0;
  let scale = 0.1;
  const ALPHA_LIMIT = 0.3;
  const ALPHA_DA = 0.01;
  const LOW_LIMIT_SCALE = 0.5;
  const HIGH_LIMIT_SCALE = document.body.offsetWidth > 486 ? 5 : 1.9;
  const ds = document.body.offsetWidth > 486 ? 0.05 : 0.05;

  const onScrollEvnet = () => {
    const { y, height, bottom } = target.getBoundingClientRect();
    if (bottom < -11) return;
    if (y < 10) {
      if (-y < height * 0.2) {
        target.style.backgroundColor = `rgba(255, 255, 255, 0.1)`;
        bigger.style.color = "rgba(255, 255, 255, 1)";
        bigger.style.position = "fixed";
        bigger.style.transform = `scale(1)`;
        bigger.classList.remove("hidden");
      } else if (-y < height * 0.4) {
        target.style.backgroundColor = `rgba(255, 255, 255, 0.5)`;
        bigger.style.color = "rgba(100, 100, 100)";
        bigger.style.position = "fixed";
        bigger.style.transform = `scale(3)`;
        bigger.classList.remove("hidden");
      } else if (-y < height * 0.6) {
        target.style.backgroundColor = `rgba(255, 255, 255, 1)`;
        bigger.style.color = "rgba(0, 0, 0)";
        bigger.style.position = "fixed";
        bigger.style.transform = `scale(5)`;
        bigger.classList.remove("hidden");
      }
      // else if (-y < height * 0.8) {
      //   bigger.style.color = "rgba(255, 255, 255, 0.4)";
      //   target.style.backgroundColor = `rgba(255, 255, 255, 0.8)`;
      //   bigger.style.position = "fixed";
      //   bigger.style.transform = `scale(3)`;
      //   bigger.classList.remove("hidden");
      // } else if (-y < height * 0.9) {
      //   bigger.style.color = "rgba(255, 255, 255, 0)";
      //   target.style.backgroundColor = `rgba(255, 255, 255, 1)`;
      //   bigger.style.position = "fixed";
      //   bigger.style.transform = `scale(3.5)`;
      //   bigger.classList.remove("hidden");
      // }
    } else {
      target.style.backgroundColor = `rgba(255, 255, 255, 0.0)`;
      bigger.style.transform = `scale(0)`;
      bigger.classList.add("hidden");
    }

    if (bottom - 10 < document.body.offsetHeight) {
      !isSixUsed && sixth();
      isSixUsed = true;
      bigger.classList.add("hidden");
      target.style.backgroundColor = `rgba(255, 255, 255, 1)`;
      bigger.style.transform = `scale(3.5)`;
    }
  };

  window.addEventListener("scroll", throttle(onScrollEvnet, 10));
};

const sixth = async () => {
  const { target } = content.sixth;
  const southKorea = document.body.querySelector(".south-korea-container");
  const northKorea = document.body.querySelector(".north-korea-container");
  const northSouth = document.body.querySelector(".north-and-south");
  northSouth.style.opacity = 0;

  const onScrollEvnet = () => {
    const { y, height, bottom } = target.getBoundingClientRect();
    if (bottom < -11) return;

    if (y < 20) {
      if (-y < height * 0.2) {
        northSouth.style.display = "block";
        southKorea.style.position = "fixed";
        northKorea.style.position = "fixed";
        southKorea.style.opacity = 0.4;
        northKorea.style.opacity = 0;
        northSouth.style.opacity = 0;

        target.style.backgroundColor = `rgba(255, 255, 255)`;
      } else if (-y < height * 0.4) {
        southKorea.style.opacity = 1;
        northKorea.style.opacity = 0;
        northSouth.style.opacity = 0;

        target.style.backgroundColor = `rgba(150, 150, 150)`;
      } else if (-y < height * 0.6) {
        southKorea.style.opacity = 0.4;
        northKorea.style.opacity = 0.4;
        northSouth.style.opacity = 0;

        target.style.backgroundColor = `rgba(100, 100, 100)`;
      } else if (-y < height * 0.8) {
        southKorea.style.opacity = 0;
        northKorea.style.opacity = 1;
        northSouth.style.opacity = 0;

        target.style.backgroundColor = `rgba(150, 150, 150)`;
      } else if (-y < height * 0.9) {
        southKorea.style.opacity = 0.0;
        northKorea.style.opacity = 0;
        northSouth.style.opacity = 1;

        target.style.backgroundColor = `rgba(255, 255, 255)`;
      } else if (-y < height) {
      }
    } else {
      northSouth.style.opacity = 0;
      southKorea.style.opacity = 0;
      northKorea.style.opacity = 0;
    }

    if (bottom - 10 < document.body.offsetHeight) {
      northKorea.style.opacity = 0;
      southKorea.style.opacity = 0;

      northSouth.style.position = "fixed";
      northSouth.style.opacity = 1;
      target.style.backgroundColor = `rgba(255, 255, 255)`;
      northSouth.querySelector("img").style.opacity = 0;
      northSouth.querySelector(".and").style.opacity = 1;
      setTimeout(() => {
        northSouth.querySelector("img").style.opacity = 1;
        northSouth.querySelector(".and").style.opacity = 0;
      }, 1000);
      final();
    }
  };

  window.addEventListener("scroll", throttle(onScrollEvnet, 10));

  target.classList.remove("hidden");
};

const final = async () => {
  await sleep(1000);
  const target = document.querySelector(".final");
  const text = target.querySelector(".text");
  const northSouth = document.body.querySelector(".north-and-south");
  northSouth.style.display = "none";

  const setText = async (str) => {
    await sleep(1000);
    text.style.opacity = 1;
    text.innerHTML = str;
    await sleep(1000);
  };

  await sleep(1000);
  target.classList.remove("hidden");

  const onScrollEvnet = () => {
    const { y, height, bottom } = target.getBoundingClientRect();
    if (bottom < -11) return;

    if (y < 10) {
      text.style.opacity = 1;
      target.querySelector(".soongsil").style.opacity = "0.65";
    } else {
      if (y < height * 0.4) {
        text.style.opacity = 0;
      } else if (y < height * 0.6) {
        text.style.opacity = 0.5;
        setText(
          "1945년 일제 해방이후, <br /> 2021년 현재 남과 북은 70년째 분단되어 있다."
        );
      } else if (y < height * 0.8) {
        target.querySelector(".soongsil").style.opacity = "0";
        text.style.filter = `blur(2px)`;
        text.style.opacity = 1;
      } else if (y < height * 0.85) {
        text.style.opacity = 1;
        text.style.filter = `blur(1px)`;
        target.querySelector(".soongsil").style.opacity = "0.25";
      } else if (y < height * 0.9) {
        text.style.opacity = 1;
        text.style.filter = `blur(0px)`;
        target.querySelector(".soongsil").style.opacity = "0.65";
      } else if (y < height) {
        text.style.opacity = 1;
        text.style.filter = `blur(0px)`;
        target.querySelector(".soongsil").style.opacity = "0.65";
      }
    }

    if (bottom - 10 < document.body.offsetHeight) {
      text.style.opacity = 1;
      text.style.filter = `blur(0px)`;
      target.querySelector(".soongsil").style.opacity = "0.65";
    }
  };

  window.addEventListener("scroll", throttle(onScrollEvnet, 10));
};

window.onload = init;
