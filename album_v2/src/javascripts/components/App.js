import Breadcrumb from "./Breadcrumb/index.js";
import Finder from "./Finder/index.js";
import ImageViewer from "./ImageViewer/index.js";
import Loading from "./Loading/index.js";
import { request } from "./utils/index.js";

const initialState = {
  cache: {},
};

export default class App {
  constructor({ target }) {
    this.$breadCrumb = null;
    this.$finder = null;
    this.$loading = null;
    this.$imageViewer = null;
    this.$finder = null;

    this.$target = target;
    this.$state = initialState;
  }

  async init() {
    this.$breadCrumb = new Breadcrumb({ parent: this.$target });
    this.$finder = new Finder({ parent: this.$target });
    this.$imageViewer = new ImageViewer({ parent: this.$target });
    this.$loading = new Loading();
    this.bindEvents();
    await this.fetchFinder();
  }

  bindEvents() {
    this.$finder.on("onOpenFile", (id) => {
      this.open(id);
    });
    this.$finder.on("onNextDirectory", (id) => {
      this.next(id);
    });
    this.$breadCrumb.on("navClick", (nodeId) => {
      this.click(nodeId);
    });
  }

  open(id) {
    const node = this.$finder.$state.nodes.find((node) => node.id === id);
    this.$imageViewer.setState({ isOpen: true, filePath: node.filePath });
  }

  async click(nodeID) {
    const nodeIndex = this.$breadCrumb.$state.routes.findIndex(
      (values) => values.id === nodeID
    );

    this.$breadCrumb.setState({
      routes: this.$breadCrumb.$state.routes
        .map((value, idx) => (idx <= nodeIndex ? value : false))
        .filter((v) => !!v),
    });

    await this.fetchFinder(nodeID);
  }

  async next(id) {
    const node = this.$finder.$state.nodes.find((node) => node.id === id);
    this.$breadCrumb.go(node);

    await this.fetchFinder(id);
  }

  async back() {
    if (this.$breadcrumb.$state.routes.length <= 1) return;
    this.$breadcrumb.back();
    const parentNode = this.$breadcrumb.$state.routes[
      this.$breadcrumb.$state.routes.length - 1
    ];
    const nodeID = parentNode?.id;
    await this.fetchFinder(nodeID);
  }

  async fetchFinder(nodeID = "") {
    if (this.$state.cache[nodeID]) {
      this.$finder.setState({ nodes: this.$state.cache[nodeID] });
    } else {
      this.$loading.on();
      const responseBody = await request(nodeID);
      this.$state.cache[nodeID] = responseBody;
      this.$finder.setState({ nodes: responseBody });
      this.$loading.off();
    }
    this.render();
  }

  render() {
    this.$finder.render();
    this.$breadCrumb.render();
  }
}
