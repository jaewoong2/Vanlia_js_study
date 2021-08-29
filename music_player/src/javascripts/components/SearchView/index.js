import { removeAllChildNodes } from "../../utils/index.js";

export default class SearchView {
  constructor() {
    this.rootElement = SearchView.createRootElement();
    this.searchedMusics = [];
    this.bindEvents();
  }

  static createRootElement() {
    const rootElement = document.createElement("ARTICLE");
    rootElement.classList.add("contents-search");
    rootElement.innerHTML = `
    <div class="search-controller">
        <input class="search-input" type="text" placeholder="검색"/>
        <button class="search-button">
            <i class="icon-search-controller"></i>
        </button>
    </div>
    <ul class="music-list"></ul>
    `;

    return rootElement;
  }

  bindEvents() {
    this.rootElement
      .querySelector(".search-input")
      .addEventListener("input", (event) => {
        const query = event.target.value;
        this.emit("searhMusic", query);
      });

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

  requestAddPlayList(target) {
    // 음악 요청과 마찬가지로 받아온 엘리먼트의 부모 엘리먼트를 찾습니다. 부모엘리먼트에 데이터를 저장해두었습니다.
    const controller = target.parentElement;
    // 엘리먼트에서 data- 형태로 된 것은 element.dataset 에서 가져올 수 있습니다. 이중에 index 값 (음악 인덱스) 를 가져옵니다.
    const { index: musicIndex } = controller.dataset;
    // 한덩어리인 페이로드로 묶습니다. 음악리스트를 따로 보내지 않아도 될 것 같긴 한데.. 최초에 이런 식으로 만들어서 그냥 계속 보내게 되었습니다.
    const payload = { musics: this.searchedMusics, musicIndex };
    // 부모(app.js)에게 플레이리스트에 추가하라는 요청을 보냅니다. 부모는 자기 자식중 하나인 플레이리스트에게 추가하라는 명령을 내릴 것입니다.
    this.emit("addPlayList", payload);
  }

  setSearchResult(musiList = []) {
    this.searchedMusics = musiList;
    this.renderSearchedMusics();
  }

  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }

  renderSearchedMusics() {
    const musicListElement = this.rootElement.querySelector(".music-list");
    removeAllChildNodes(musicListElement);
    const searchedMusics = this.searchedMusics
      .map((music, index) => {
        const { cover, title, artists } = music;
        return `
        <li>
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
        </li>`;
      })
      .join("");

    musicListElement.innerHTML = searchedMusics;
  }

  render() {
    return this.rootElement;
  }
}
