export const getStorage = (key) => {
  const res = window.localStorage.getItem(key);

  return JSON.parse(res) || [];
};

export const setStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    return false;
  }
};
