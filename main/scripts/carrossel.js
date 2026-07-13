document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('carouselTrack');
    const container = document.getElementById('carouselContainer');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotsContainer = document.getElementById('carouselDots');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Cria bolinhas
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.dataset.index = i;
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Função principal de navegação
    function goToSlide(index) {
        // Loop infinito
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;

        // Calcula a largura exata do container (não do slide)
        const containerWidth = container.getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * containerWidth}px)`;

        // Atualiza dots
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Inicializa
    createDots();

    // Garante que o track comece na posição correta
    function setInitialPosition() {
        const containerWidth = container.getBoundingClientRect().width;
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentIndex * containerWidth}px)`;
        // Força o reflow para aplicar a mudança sem transição
        track.offsetHeight;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    // Chama no load e no resize
    setInitialPosition();
    window.addEventListener('resize', setInitialPosition);

    // Eventos dos botões
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    // Autoplay com pausa no hover
    let autoPlayInterval;
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
    startAutoPlay();
});