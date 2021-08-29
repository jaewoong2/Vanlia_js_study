const getClosestElement = (element, selector) => {
  if (!element) return;
  let evaluate = false;
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

export { getClosestElement };
