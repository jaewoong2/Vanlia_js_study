export default class Loading {
  constructor() {
    this.$target = Loading.createLoadingElement();
    this.parentElement = document.querySelector("body");
    this.$state = {
      isLoading: false,
    };
  }

  static createLoadingElement() {
    const loadingWrapper = document.createElement("div");
    const loadingContent = document.createElement("div");
    const loadingImage = document.createElement("img");

    loadingWrapper.classList.add("modal", "loading");
    loadingContent.classList.add("content");
    loadingImage.src = "./assets/images/loading.gif";

    loadingContent.appendChild(loadingImage);
    loadingWrapper.appendChild(loadingContent);

    return loadingWrapper;
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  on() {
    this.setState({ isLoading: true });
  }

  off() {
    this.setState({ isLoading: false });
  }

  render() {
    if (this.$state.isLoading) {
      this.parentElement.appendChild(this.$target);
    } else {
      this.parentElement.removeChild(this.$target);
    }
  }
}
