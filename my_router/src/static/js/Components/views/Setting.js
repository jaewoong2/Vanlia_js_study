export default class Settings {
  constructor() {
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

  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }
}
