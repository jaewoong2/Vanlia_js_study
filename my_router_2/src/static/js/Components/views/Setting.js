import { Component } from "../../core/index.js";

export default class Settings extends Component {
  constructor() {
    super({});
    this.setTitle("Settings");
  }
  setTitle(title) {
    document.title = title;
  }

  render() {
    return `
            <h1>Settings</h1>
            <p>Manage your privacy and configuration.</p>
        `;
  }

  bindEvents() {}
}
