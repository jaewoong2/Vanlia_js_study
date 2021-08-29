export default class Component {
  $state = {};
  $target = null;

  // 상위 컴포넌트에 등록
  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  // 상위 컴포넌트에서 사용 (하위 컴포넌트의 event 실행)
  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }
}
