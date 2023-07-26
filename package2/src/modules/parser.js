import Swiper from "swiper";

export const initSlides = (selector) => {
  return new Swiper(selector, {
    slidesPerView: "auto",
    slidesPerGroup: 2,
  });
};
