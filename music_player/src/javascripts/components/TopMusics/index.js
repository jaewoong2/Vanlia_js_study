export default class TopMusics {
  constructor() {
    this.rootElement = TopMusics.createRootElement();
    this.musics = [];

    this.bindEvents();
  }

  static createRootElement() {
    const rootElement = document.createElement("article");
    rootElement.classList.add("contents-top5");

    return rootElement;
  }

  bindEvents() {
    this.rootElement.addEventListener("click", (event) => {
      const { target } = event;
      const isControllerButton = target.tagName === "BUTTON";

      if (!isControllerButton) {
        return;
      }

      const buttonRole = target.classList.item(1);
      switch (buttonRole) {
        case `icon-play`: {
          this.requestPlay(target);
          break;
        }
        case `icon-pasue`: {
          this.requestPause(target);
          break;
        }
        case `icon-plus`: {
          this.requestAddPlayList(target);
          break;
        }
      }
    });
  }

  requestStopAll() {
    const playButtons = this.rootElement.querySelectorAll(".icon-pause");
    playButtons.forEach((element) => {
      element.classList.replace("icon-pause", "icon-play");
    });
  }

  // 재생을 App.js에 요청
  requestPlay(target) {
    const controller = target.parentElement;
    const { index: musicIndex } = controller.dataset;
    const payload = { musics: this.musics, musicIndex };
    this.emit("play", payload);
    this.requestStopAll();
    target.classList.replace("icon-play", "icon-pause");
  }

  requestPause(target) {
    this.emit("pause");
    target.classList.replace("icon-pause", "icon-play");
  }

  setMusics(musics = []) {
    this.musics = musics;
  }

  requestAddPlayList(target) {
    const controller = target.parentElement;
    const { index: musicIndex } = controller.dataset;
    const payload = { musics: this.musics, musicIndex };
    this.emit("addPlayList", payload);
  }

  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }

  render() {
    const topRoof = `
      <div class="top5-roof">
        <img src="assets/images/intro-logo.png">
      </div>
      `;

    const musicsList = this.musics
      .map((music, index) => {
        const { cover, title, artists } = music;
        return `
            <li>
            <div class="music-rank">${index + 1}</div>
            <div class="music-content">
                <div class="music-data">
                    <div class="music-cover">
                        <img src="${cover}" />
                    </div>
                    <div class="music-info">
                        <strong class="music-title">${title}</strong>
                        <em class="music-artist">${artists[0]}</em>
                    </div>
                </div>
                <div class="music-simple-controller" data-index=${index}>
                    <button class="icon icon-play">
                        <span class="invisible-text">재생</span>
                    </button>
                    <button class="icon icon-plus">
                        <span class="invisible-text">추가</span>
                    </button>
                </div>
            </div>
        </li>
        `;
      })
      .join("");

    this.rootElement.innerHTML =
      topRoof + `<ol class="top5-list">` + musicsList + `</ol>`;

    return this.rootElement;
  }
}
