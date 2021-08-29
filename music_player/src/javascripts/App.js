import {
  Intro,
  TabButtons,
  TopMusics,
  SearchView,
  PlayList,
} from "./components/index.js";
import { removeAllChildNodes } from "./utils/index.js";
import { fecthMusics } from "../APIs/index.js";
export default class App {
  constructor(props) {
    this.props = props;
    this.currentMainIndex = 0;
    this.mainViewComponent = [];
  }

  async setup() {
    const { el } = this.props;
    this.rootElement = document.querySelector(el);
    this.intro = new Intro();
    this.tabButtons = new TabButtons();
    this.topMusics = new TopMusics();
    this.searchView = new SearchView();
    this.playList = new PlayList();

    this.mainViewComponent = [this.topMusics, this.playList, this.searchView];

    this.bindEvents();
    await this.fecthMusics();
    this.init();
  }

  bindEvents() {
    // 탭버튼 컴포넌트 이벤트
    this.tabButtons.on("clickTab", (payload) => {
      const { currentIndex = 0 } = payload;
      this.currentMainIndex = currentIndex;
      this.render();
    });

    // 텝뮤직 컴포넌트 이벤트
    this.topMusics.on("play", (payload) => {});

    this.topMusics.on("pause", () => {});

    this.topMusics.on("addPlayList", (payload) => {
      const { musics, musicIndex } = payload;
      this.playList.add(musics[musicIndex]);
    });

    this.playList.on("play", (payload) => {
      // this.playView.playMusic(payload);
      // this.playView.show();
    });

    this.playList.on("pause", () => {
      // this.playView.pause()
    });

    this.searchView.on("searhMusic", (query) => {
      if (!query) return this.searchView.setSearchResult([]);
      const searchedMusics = this.topMusics.musics.filter((music) => {
        const { artists, title } = music;
        const upperCaseQuery = query.toUpperCase();
        const filteringName = artists.some((artist) =>
          artist.toUpperCase().includes(upperCaseQuery)
        );
        const filteringTitle = title.toUpperCase().includes(upperCaseQuery);

        return filteringName || filteringTitle;
      });

      this.searchView.setSearchResult(searchedMusics);
    });

    this.searchView.on("play", (payload) => {});

    this.searchView.on("pause", () => {});

    this.searchView.on("addPlayList", (payload) => {
      const { musics, musicIndex } = payload;
      this.playList.add(musics[musicIndex]);
    });
  }

  async fecthMusics() {
    const responseBody = await fecthMusics();
    const { musics = [] } = responseBody;
    this.topMusics.setMusics(musics);
  }

  init() {
    this.intro.show();

    setTimeout(() => {
      this.intro.hide();
      this.render();
    }, 1000);
  }
  renderMainView() {
    const renderComponent = this.mainViewComponent[this.currentMainIndex];
    return renderComponent ? renderComponent.render() : null;
  }
  render() {
    // 초기화
    removeAllChildNodes(this.rootElement);
    const tabButtons = this.tabButtons.render();
    const mainView = this.renderMainView();
    this.rootElement.append(tabButtons);
    this.rootElement.append(mainView);
  }
}
