function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function settingCssProperty(ref, cssProperty) {
  if (cssProperty !== null && cssProperty !== undefined) {
    const keys = Object.keys(cssProperty);
    const values = Object.values(cssProperty);
    for (let i = 0; i < keys.length; i++) {
      const index = keys[i]
        .split("")
        .findIndex((value) => value.toLocaleLowerCase() !== value);
      if (index > -1) {
        const upperWord = keys[i][index];
        const key = keys[i].replace(
          upperWord,
          `-${upperWord.toLocaleLowerCase()}`
        );
        const value = values[i];
        if (value) {
          ref.style.setProperty(key, value);
        }
      } else {
        const value = values[i];
        if (value) {
          ref.style.setProperty(keys[i], value);
        }
      }
    }
  }
}

class NewElement {
  element;
  constructor(elem) {
    this.element = document.createElement(elem);
  }
}

class CircleElement extends NewElement {
  constructor(elem) {
    super(elem);
  }

  create(ref, styleOptions) {
    settingCssProperty(this.element, styleOptions);
    ref.appendChild(this.element);

    return this.element;
  }
}

class CircleCanvas {
  canvas;
  context;
  width;
  heigth;
  ref;
  radius;
  position;

  ARCfrom = 1.5 * Math.PI;
  addedWidth = 20;

  constructor(ref, color) {
    this.ref = ref;
    const clinetRect = this.ref.getBoundingClientRect();
    this.width = clinetRect.width;
    this.heigth = clinetRect.height;
    this.position = {
      x: this.width / 2 + this.addedWidth / 2,
      y: this.heigth / 2 + this.addedWidth / 2,
    };
    this.radius = this.width / 2;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width + this.addedWidth;
    this.canvas.height = this.heigth + this.addedWidth;
    this.canvas.style.position = "absolute";

    this.color = color;
    this.context = this.canvas.getContext("2d");
    this.ref.appendChild(this.canvas);
  }

  create() {
    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.canvas.width,
      0
    );
    const createRandomRGB = () => {
      return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.65)`;
    };

    gradient.addColorStop("0", createRandomRGB());
    gradient.addColorStop("0.5", createRandomRGB());
    gradient.addColorStop("1.0", createRandomRGB());

    this.gradient = gradient;

    return this.canvas;
  }

  update(to) {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.context) {
      this.context?.beginPath();
      this.context.lineCap = "round";

      this.context.strokeStyle = this.gradient;
      this.context.lineWidth = 7.5;
      this.context?.arc(
        this.position.x,
        this.position.y,
        this.radius,
        this.ARCfrom,
        (1.5 + to / 50) * Math.PI
      );
      this.context?.stroke();
    }
  }
}

export const createCircle = async ({
  parent,
  peresentage,
  color,
  text,
  textColor,
  containerClass,
  width,
  height,
}) => {
  const styleOptions = {
    width,
    height,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "transparent",
  };

  const circleElement = new CircleElement("div").create(parent, styleOptions);
  circleElement.classList.add(containerClass);

  const circleLine = new CircleCanvas(circleElement, color);
  circleLine.create();

  /** 숫자 표시 */

  const span = new NewElement("span").element;
  span.style.color = textColor;
  circleElement.appendChild(span);

  /** update / 10ms */

  const per = peresentage;
  for (let i = 0; i <= per; i++) {
    await sleep(30);
    span.innerText = `${i}%`;
    circleLine.update(i);
  }

  span.innerText = text;

  return circleElement;
};

export function throttle(callback, limit = 100) {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}
