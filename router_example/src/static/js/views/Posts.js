export default class Posts {
  constructor() {
    this.setTitle("Posts");
  }
  setTitle(title) {
    document.title = title;
  }

  async getHtml() {
    return `
            <h1>Posts</h1>
            <p>You are viewing the posts!</p>
        `;
  }
}
