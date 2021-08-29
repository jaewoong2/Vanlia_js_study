import BreadCrumb from "./BreadCrumb.js";
import Finder from "./Finder.js";
import ImageViewr from "../ImageViewer/index.js";
import Loading from "../Loading/index.js";
import { fetchObecjts } from "../../api/index.js";

export default class Album {
  constructor() {
    this.$breadcrumb = null;
    this.$finder = null;
    this.$imageViewr = null;
    this.$loading = null;
    this.$target = null;
    this.$state = {
      cache: {},
    };
  }

  async init(elementQuery) {
    this.$target = document.querySelector(elementQuery);
    this.$breadcrumb = new BreadCrumb({ parentElement: this.$target });
    this.$finder = new Finder({ parentElement: this.$target });
    this.$imageViewr = new ImageViewr({ parentElement: this.$target });
    this.$loading = new Loading();
    this.bindEvents();
    await this.fetchFinder();
  }

  bindEvents() {
    this.$finder.on("onNextDirectory", (nodeID) => this.next(nodeID));
    this.$finder.on("onOpenImageViewer", (nodeID) =>
      this.openImageViewr(nodeID)
    );
    this.$breadcrumb.on("back", () => this.back());

    this.$breadcrumb.on("navClick", (nodeId) => {
      this.click(nodeId);
    });
  }

  openImageViewr(nodeID = "") {
    const targetNode = this.$finder.$state.nodes.find(
      (node) => node.id === nodeID
    );
    this.$imageViewr.open(targetNode.filePath);
  }

  async click(nodeID) {
    const nodeIndex = this.$breadcrumb.$state.routes.findIndex(
      (values) => values.id === nodeID
    );

    this.$breadcrumb.setState({
      routes: this.$breadcrumb.$state.routes
        .map((value, idx) => (idx <= nodeIndex ? value : false))
        .filter((v) => !!v),
    });

    await this.fetchFinder(nodeID);
  }

  async next(nodeID) {
    const targetNode = this.$finder.$state.nodes.find(
      (node) => node.id === nodeID
    );
    this.$breadcrumb.forward(targetNode);
    await this.fetchFinder(nodeID);
  }

  async back() {
    if (this.$breadcrumb.$state.routes.length <= 1) return;
    this.$breadcrumb.back();
    const parentNode = this.$breadcrumb.getParentNode();
    const nodeID = parentNode?.id;
    await this.fetchFinder(nodeID);
  }

  async fetchFinder(nodeID = "") {
    if (this.$state.cache[nodeID]) {
      this.$finder.setState({ nodes: this.$state.cache[nodeID] });
    } else {
      this.$loading.on();
      const responseBody = await fetchObecjts(nodeID);
      this.$state.cache[nodeID] = responseBody;
      this.$finder.setState({ nodes: responseBody });
      this.$loading.off();
    }
    this.render();
  }

  render() {
    this.$finder.render();
    this.$breadcrumb.render();
  }
}
