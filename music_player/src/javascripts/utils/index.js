// 리스트 안에서 엘리먼트의 인덱스 번호를 찾는 함수
// 선택한 리스트의 ul, ol 안에서의 index 값을 반환
export const findIndexListElement = (element) => {
  // 선택한 엘레먼트의 부모 엘리먼트 에서 'li' 를 모두 가져옴
  const listItems = element.parentElement.querySelectorAll("li");
  const currentIndex = Array.prototype.slice
    .call(listItems)
    .findIndex((listitem) => listitem === element);

  return currentIndex;
};

// 부모 엘리먼트로 올라가면서 셀렉터를 만족하는 가장 가까운 요소를 찾는다
export const getClosestElement = (element, selector) => {
  let evaluate = false;

  // class 선택자를 갖는지
  if (/^\./.test(selector)) {
    evaluate = element.classList.contains(selector);
  } else {
    evaluate = element.tagName === selector.toUpperCase();
  }

  if (evaluate) {
    return element;
  }

  return getClosestElement(element.parentElement, selector);
};

// 하위 노드들 모두 제거
export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
