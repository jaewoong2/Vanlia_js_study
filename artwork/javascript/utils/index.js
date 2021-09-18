export function blurring(
  initValue = 20,
  intervalTime = 100,
  limit = 0,
  callback
) {
  let blurValue = initValue;
  const interval = setInterval(() => {
    blurValue -= 0.6;
    callback(blurValue);
    if (blurValue < limit) {
      clearInterval(interval);
    }
  }, intervalTime);
}
