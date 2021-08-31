export default class Setttings {
  constructor() {
    this.setTitle("Setttings");
  }
  setTitle(title) {
    document.title = title;
  }

  async getHtml() {
    return `
            <h1>Settings</h1>
            <p>Manage your privacy and configuration.</p>
        `;
  }
}
