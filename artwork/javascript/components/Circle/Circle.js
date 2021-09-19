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
    console.log(clinetRect, ref);
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
    return this.canvas;
  }

  update(to) {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.context) {
      this.context?.beginPath();
      this.context.lineCap = "round";
      this.context.strokeStyle = this.color;
      this.context.lineWidth = 5.5;
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

export const createElement = async (props) => {
  const { parent, peresentage, color, text, containerClass, width, height } =
    props;

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
  console.log(parent);

  const circleElement = new CircleElement("div").create(parent, styleOptions);
  circleElement.classList.add(containerClass);

  const circleLine = new CircleCanvas(circleElement, color);
  circleLine.create();

  /** 숫자 표시 */

  const span = new NewElement("span").element;
  span.innerText = `${text}`;
  circleElement.appendChild(span);

  /** update / 10ms */

  const per = peresentage;
  for (let i = 0; i <= per; i++) {
    await sleep(10);
    circleLine.update(i);
  }
};
