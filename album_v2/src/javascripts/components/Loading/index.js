export default class Loading {
  constructor() {
    this.$parent = document.querySelector("body");
    this.$target = Loading.createElement();
    this.$state = {
      isLoading: false,
    };
  }

  static createElement() {
    const loadingWrapper = document.createElement("div");
    const loadingContent = document.createElement("div");
    const loadingImage = document.createElement("img");

    loadingWrapper.classList.add("modal", "loading");
    loadingContent.classList.add("content");
    loadingImage.src = "./assets/images/loading.gif";

    loadingWrapper.appendChild(loadingContent);
    loadingContent.appendChild(loadingImage);

    return loadingWrapper;
  }

  on() {
    this.setState({ isLoading: true });
  }

  off() {
    this.setState({ isLoading: false });
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  render() {
    if (this.$state.isLoading) {
      this.$parent.appendChild(this.$target);
    } else {
      this.$parent.removeChild(this.$target);
    }
  }
}
