import Items from "./components/Items/index.js";
import Component from "./helper/component.js";

export default class App extends Component {
  constructor($target) {
    super($target);
    new Items($target);
  }
}
