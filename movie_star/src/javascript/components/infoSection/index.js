import Component from "../../core/Component.js";

const starImageSourceMap = {
  empty: "./src/assets/images/icon_empty_star.png",
  harf: "./src/assets/images/icon_half_star.png",
  full: "./src/assets/images/icon_star.png",
};

const initialState = {
  isLocked: false,
};

export default class infoSection extends Component {
  constructor({ parent }) {
    super();
    this.$parent = parent;
    this.$target = infoSection.createElement();
    this.$favorite = this.$target.querySelector(".content-favorite");
    this.$star = this.$target.querySelector(".content-star");
    this.$state = initialState;
    this.init();
  }

  static createElement() {
    const container = document.createElement("aside");
    const movieType = document.createElement("div");
    const movieTitle = document.createElement("h1");
    const btnWrapper = document.createElement("div");
    const starWrapper = document.createElement("div");

    container.classList.add("content");
    movieType.classList.add("content-type");
    movieTitle.classList.add("content-title");
    btnWrapper.classList.add("content-favorite");
    starWrapper.classList.add("content-star");

    container.appendChild(movieType);
    container.appendChild(movieTitle);
    container.appendChild(btnWrapper);
    container.appendChild(starWrapper);

    movieType.innerHTML = `
        <span>드라마</span>
        <span>전체 이용가</span>
    `;

    movieTitle.innerHTML = "파이썬 부트캠프";

    btnWrapper.innerHTML = `
    <button class="button-recommend">
        <i class="icon-thumbs-up"></i>
    </button>
    <button class="button-heart">
        <i class="icon-heart"></i>
    </button>
    `;

    starWrapper.innerHTML = `
    <em class="star-average">별점 평균 0.0</em>
    <div class="star-point-container">
        <div class="star-background">
            <img src="src/assets/images/icon_empty_star.png" data-point="1" title="별로에요.."
                alt="1" />
            <img src="src/assets/images/icon_empty_star.png" data-point="2" title="그저 그래요"
                alt="2" />
            <img src="src/assets/images/icon_empty_star.png" data-point="3" title="괜찮아요"
                alt="3" />
            <img src="src/assets/images/icon_empty_star.png" data-point="4" title="좋아요!"
                alt="4" />
            <img src="src/assets/images/icon_empty_star.png" data-point="5" title="완전 강추!!"
                alt="5" />
        </div>
        <button class="icon-remove-star">
            <img src="src/assets/svg/icon_remove_star.svg" alt="별점 제거" />
        </button>
        `;

    return container;
  }

  init() {
    this.$parent.appendChild(this.$target);
    this.bindEvents();
  }

  bindEvents() {
    this.$favorite.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const element = this.findElement(event.target, "button");
        if (!element) return;
        element.classList.toggle("on");
      });
    });

    this.$star.addEventListener("mouseout", (event) => {
      if (this.$state.isLocked) return;
      this.renderStarImage({ drawableLimitIndex: -1 });
    });

    this.$star.querySelectorAll("img").forEach((image) => {
      image.addEventListener("mousemove", (event) => {
        if (this.$state.isLocked) return;
        if (!event.target.dataset.point) return;
        const pointIndex = +event.target.dataset.point - 1;
        const [starImageClientRect] = event.target.getClientRects();
        const starImageWidth = starImageClientRect.width;
        const isHalf = starImageWidth / 2 < event.offsetX;

        this.renderStarImage({
          drawableLimitIndex: pointIndex,
          isOverHalf: isHalf,
        });
      });

      image.addEventListener("click", (event) => {
        if (!event.target.dataset.point) {
          this.$state.isLocked = false;
          this.renderStarImage({ drawableLimitIndex: -1 });
        } else {
          this.$state.isLocked = !this.$state.isLocked;
        }
      });
    });
  }

  renderStarImage({ drawableLimitIndex = 1, isOverHalf = false }) {
    Array.prototype.forEach.call(
      this.$star.querySelectorAll("img"),
      (starImage, index) => {
        // 별 이미지를 순환
        //this.starImages.forEach((starImage, index) => {

        // 현재 순환 순서보다 마우스가 호버된 별의 인덱스가 크다면 꽉찬 별, 아니면 빈 별.
        let imageSource =
          index < drawableLimitIndex
            ? starImageSourceMap.full
            : starImageSourceMap.empty;

        // 현재 순환 순서와 마우스가 호버된 별의 인덱스가 같다면
        if (drawableLimitIndex === index) {
          // 마우스 포인터의 위치가 별점의 중간을 넘어섰다면 꽉찬별, 아니면 반쪽 별
          imageSource = isOverHalf
            ? starImageSourceMap.full
            : starImageSourceMap.harf;
        }
        // 현재 순환중인 이미지에 src 값 할당
        starImage.src = imageSource;
        let point = drawableLimitIndex + 1 - (!isOverHalf && 0.5);

        this.$star.querySelector("em").innerHTML = `별점 평균 ${
          point > 0 ? point : 0
        } `;
      }
    );
  }

  findElement(element, selector) {
    if (!element) return;
    if (element.tagName === selector.toUpperCase()) return element;
    if (element.classList.contains(selector)) return element;
    return this.findElement(element.parentElement, selector);
  }
}
