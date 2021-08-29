import MovieContainer from "./components/movieContainer/index.js";

const movieContainer = new MovieContainer({
  parent: document.querySelector("#app"),
});

movieContainer.init();
