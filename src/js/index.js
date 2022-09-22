new Splide('.catalog', {
    gap: 10,
    fixedWidth: 362,
    perPage: 2,
    breakpoints: {
        999: {
            fixedWidth: 328,
            gap: 16,
            padding: 16,
            perPage: 1,
        }
    }
}).mount();
new Splide('.portfolio', {
    gap: 30,
    fixedWidth: 300,
    fixedHeight: 300,
    perPage: 3,
    padding: {left: 0, right: 16},
    breakpoints: {
        999: {
            fixedWidth: 220,
            fixedHeight: 220,
            perPage: 2,
            gap: 20,
            padding: 16,
        }
    }
}).mount();