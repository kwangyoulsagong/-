const slide = {
  elements: gsap.utils.toArray(".slide"),
  images: gsap.utils.toArray(".slide_image"),
  prev: document.querySelector(".slider_buttons_prev"),
  next: document.querySelector(".slider_buttons_next"),
  duration: 1.4,
  ease: Power4.easeInOut,
};
let current = 0;
let total = slide.elements.length;
const slideswrap = gsap.utils.wrap(0, total);

const slideNext = (index, dir = 1, duration = slide.duration) => {
  const tl = gsap.timeline({
    defaults: { duration: duration, ease: slide.ease },
  });
  tl.fromTo(
    slide.elements[index],
    {
      yPercent: dir > 0 ? 100 : -100,
    },
    {
      yPercent: 0,
    }
  ).fromTo(
    slide.images[index],
    {
      yPercent: dir > 0 ? -100 : 100,
      scale: 0.8,
    },
    {
      yPercent: 0,
      scale: 1,
    },
    0
  );
};
const slidePrev = (index, dir = 1, duration = slide.duration) => {
  const tl = gsap.timeline({
    defaults: { duration: duration, ease: slide.ease },
  });
  tl.to(
    slide.elements[index],
    {
      yPercent: dir > 0 ? -100 : 100,
    },
    {
      yPercent: 0,
    }
  ).to(
    slide.images[index],
    {
      yPercent: dir > 0 ? 100 : -100,
      scale: 0,
    },
    0
  );
};

slide.elements.forEach((el, index) => {
  index === current ? slideNext(index, 1, 0) : slidePrev(index, 1, 0);
});

slide.prev.addEventListener("click", () => {
  const prev = current;
  current = slideswrap(current - 1);
  slideNext(current, -1);
  slidePrev(prev, -1);
});
slide.next.addEventListener("click", () => {
  const prev = current;
  current = slideswrap(current + 1);

  slideNext(current);
  slidePrev(prev);
});

document.querySelectorAll(".card").forEach(function (card) {
  card.addEventListener("click", function () {
    document.querySelectorAll(".card").forEach(function (card) {
      card.classList.remove("active");
    });
    this.classList.add("active");
  });
});
