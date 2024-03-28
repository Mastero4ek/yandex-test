//marquee
const trackMarquee = (marqueeId) => {
    const marquee = document.getElementById(marqueeId);
    if (!marquee) return;

    const marquees = marquee.querySelector('ul');
    const marqueesItem = marquees.querySelectorAll('li');

    // Функция дублирования пунктов
    function doublingItem() {
        let elem = marqueesItem.length;

        for (let i = 0; i < elem; i++) {
            marquees.append(marqueesItem[i].cloneNode(true));
        }

        marquees.style.animationDuration = '40s,' + (elem * 2) + 's';
    };

    doublingItem();
};
trackMarquee('marquee-top');
trackMarquee('marquee-bottom');

//slider-participants
const activeSlider = (sliderId, countItemId, countAllId, buttonNextId, buttonPrevId) => {
    const slider = document.getElementById(sliderId);
    const countItem = document.getElementById(countItemId);
    const countAll = document.getElementById(countAllId);

    if (!slider) return;

    const allSlide = slider.querySelectorAll('li');
    const buttonNext = document.getElementById(buttonNextId);
    const buttonPrev = document.getElementById(buttonPrevId);

    let currentSlide = 1;

    countItem.textContent = currentSlide;
    countAll.textContent = allSlide.length;

    const moveSlideNext = () => {
        let currentAllSlide = slider.querySelectorAll('li');
        let cloneSlide = currentAllSlide[0].cloneNode(true);

        slider.appendChild(cloneSlide);
        currentAllSlide[0].remove();

        if (currentSlide < allSlide.length) {
            countItem.textContent++;
            currentSlide++;
        } else {
            countItem.textContent = 1;
            currentSlide = 1;
        }
    };

    const moveSlidePrev = () => {
        let currentAllSlide = slider.querySelectorAll('li');
        let cloneSlide = currentAllSlide[currentAllSlide.length - 1].cloneNode(true);

        slider.insertBefore(cloneSlide, currentAllSlide[0]);
        currentAllSlide[currentAllSlide.length - 1].remove();

        if (currentSlide > 1) {
            countItem.textContent--;
            currentSlide--;
        } else {
            countItem.textContent = allSlide.length;
            currentSlide = allSlide.length;
        }
    };

    buttonNext.addEventListener('click', (e) => moveSlideNext());
    buttonPrev.addEventListener('click', (e) => moveSlidePrev());

    setInterval(() => {
        moveSlideNext();
    }, 4000);
};
activeSlider('participants-slider', 'participants-current-item', 'participants-all-item', 'participants-button-next', 'participants-button-prev');

//slider-more
const activeMoreSlider = () => {
    const slider = document.getElementById('more-slider');
    const dotsWrapper = document.getElementById('more-dots');
    const btnNext = document.getElementById('more-button-next');
    const btnPrev = document.getElementById('more-button-prev');

    if (!slider) return;

    const sliderItems = slider.querySelectorAll('li');
    const transitionPersent = ((slider.offsetWidth / sliderItems.length) / slider.offsetWidth) * 100;

    let transitionSlider = 0;
    let currentSlide = 1;

    const renderDots = () => {
        for (let i = 0; i < sliderItems.length; i++) {
            const dot = document.createElement('span');

            dot.classList.add('more__controls-dot');
            dotsWrapper.append(dot);
        };

        const allDots = dotsWrapper.querySelectorAll('span');

        if (typeof allDots[currentSlide - 1] === 'undefined') return;

        allDots[currentSlide - 1].classList.add('dot--active');
    };

    const moveSlideNext = () => {
        if (currentSlide < sliderItems.length) {
            currentSlide++;
            transitionSlider = transitionSlider - transitionPersent;

            slider.style.transform = `translateX(${transitionSlider}%)`;
            btnPrev.disabled = false;
        }

        const allDots = dotsWrapper.querySelectorAll('span');

        allDots.forEach((dot, i) => {
            dot.classList.remove('dot--active');

            if (i === (currentSlide - 1)) {
                dot.classList.add('dot--active');
            }
        });

        currentSlide === sliderItems.length ? btnNext.disabled = true : btnNext.disabled = false;
    };

    const moveSlidePrev = () => {
        if (currentSlide > 1) {
            currentSlide--;
            transitionSlider += transitionPersent;

            slider.style.transform = `translateX(${transitionSlider}%)`;
            btnNext.disabled = false;
        }

        const allDots = dotsWrapper.querySelectorAll('span');

        allDots.forEach((dot, i) => {
            dot.classList.remove('dot--active');

            if (i === (currentSlide - 1)) {
                dot.classList.add('dot--active');
            }
        });

        currentSlide === 1 ? btnPrev.disabled = true : btnPrev.disabled = false;
    };

    currentSlide === 1 ? btnPrev.disabled = true : btnPrev.disabled = false;
    currentSlide === sliderItems.length ? btnNext.disabled = true : btnNext.disabled = false;

    btnNext.addEventListener('click', (e) => moveSlideNext());
    btnPrev.addEventListener('click', (e) => moveSlidePrev());

    renderDots();
};

if (window.innerWidth <= 768) {
    activeMoreSlider();
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        const dotsWrapper = document.getElementById('more-dots');
        const allDots = dotsWrapper.querySelectorAll('span');

        allDots.forEach(dot => dot.remove());

        activeMoreSlider();
    } else {
        const slider = document.getElementById('more-slider');
        const dotsWrapper = document.getElementById('more-dots');
        const allDots = dotsWrapper.querySelectorAll('span');

        allDots.forEach(dot => dot.remove());
        slider.style.transform = 'translateX(0)';
    }
});

//scroll-to-element
const scroll = (btnId) => {
    const btnScroll = document.getElementById(btnId);

    const scrollFrom = (elem) => {
        const href = elem.getAttribute("href"),
            block = document.querySelector(href);

        block.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    btnScroll.addEventListener('click', (e) => {
        e.preventDefault();

        scrollFrom(btnScroll);
    });
};
scroll('btn-support');
scroll('btn-more');