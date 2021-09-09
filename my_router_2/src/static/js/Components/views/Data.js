import { request } from "../../api/index.js";
import { Component } from "../../core/index.js";

export default class Data extends Component {
  constructor({ props }) {
    super({ props, initialState: { data: [], isLoading: true } });
    this.init();
  }

  async getData() {
    return await request(3);
  }

  async setData() {
    const data = await this.getData();
    this.setState({ data, isLoading: false });
  }

  async init() {
    this.bindEvents();
    await this.setData();
    this.useEvent("view");
    this.useEvent("setName", { name: this.$state.data[0].profile.name });
  }

  render() {
    if (this.$state.isLoading) return `Loading...`;
    const { id, profile } = this.$state?.data[0];
    return `
        <div>
            <img src=${profile?.image}>
        </div>
        <div>${id}- ${profile?.nickName}</div>
        <div>${profile?.name}</div>
    `;
  }
}
