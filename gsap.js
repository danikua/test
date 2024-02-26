// Імпорт ScrollTrigger з GSAP
const ScrollTrigger = gsap.ScrollTrigger;

// Ініціалізуйте ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Тепер ви можете використовувати ScrollTrigger у вашому коді

const tlStart = gsap.timeline({defaults: {duration: 1}});
const cards = document.querySelectorAll('.taste__card-img');

let btnAnimation = () => {
  const tlBtn = gsap.timeline({defaults: {duration:.1}, repeat:2, repeatDelay: 2});

  tlBtn.to('.start__content button', {rotate: 5})
      .to('.start__content button', {rotate: -5})
      .to('.start__content button', {rotate: 5})
      .to('.start__content button', {rotate: 0});

  return tlBtn;
};



tlStart.from('.start__title', {opacity: 0, y:40})
  .from('.start__text', {opacity: 0, y:40})
  .from('.start__content button', {opacity: 0, y:40}).add(btnAnimation);

cards.forEach(card => {
  let tlCardAppear = gsap.timeline({
    defaults: {duration: 1},
  });

  tlCardAppear.from(card, {
    x:150,
    rotate: 60,
    opacity: 0,
    scrollTrigger: {
    trigger: card,
    start: "top bottom", // початок анімації, коли нижня границя вікна доторкається верхньої границі картки
    end: "top center", // кінець анімації, коли нижня границя вікна доторкається нижньої границі картки
    scrub: true, // прокрутка анімації прив'язана до прокрутки
    // markers: true,  додати маркери ScrollTrigger для налагодження
  }});

  card.addEventListener('mouseover', () => {
    const tlCard = gsap.timeline({defaults: {duration: 1}});

    tlCard.to(card, {y:-20})
        .to(card, {y:0, ease: 'bounce.out'});
  });

});