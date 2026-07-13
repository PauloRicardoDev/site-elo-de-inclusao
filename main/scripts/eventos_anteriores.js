// Dados dos encontros (os mesmos, você pode personalizar)
const encontros = [
    {
        id: 1,
        imagem: "https://picsum.photos/seed/encontro1/400/300",
        data: "15 de Março, 2026",
        titulo: "Workshop de Design Thinking",
        depoimento: "O encontro superou minhas expectativas! As dinâmicas práticas e o networking fizeram toda a diferença.",
        participante: {
            nome: "Marina Silva",
            cargo: "UX Designer",
            foto: "https://i.pravatar.cc/150?img=1"
        }
    },
    {
        id: 2,
        imagem: "https://picsum.photos/seed/encontro2/400/300",
        data: "22 de Abril, 2026",
        titulo: "Tech Talks: Inovação e IA",
        depoimento: "Conteúdo de altíssimo nível. Saí com muitas ideias para aplicar na empresa. Já quero a próxima edição!",
        participante: {
            nome: "Carlos Mendes",
            cargo: "CTO",
            foto: "https://i.pravatar.cc/150?img=3"
        }
    },
    {
        id: 3,
        imagem: "https://picsum.photos/seed/encontro3/400/300",
        data: "10 de Maio, 2026",
        titulo: "Hackathon Social",
        depoimento: "Foi incrível ver tantas soluções criativas surgindo em apenas 48h. O espírito colaborativo foi o ponto alto.",
        participante: {
            nome: "Ana Beatriz",
            cargo: "Desenvolvedora Full Stack",
            foto: "https://i.pravatar.cc/150?img=5"
        }
    },
    {
        id: 4,
        imagem: "https://picsum.photos/seed/encontro4/400/300",
        data: "05 de Junho, 2026",
        titulo: "Meetup de Empreendedorismo",
        depoimento: "As mentorias individuais me ajudaram a pivotar meu negócio. Conheci pessoas que viraram parceiras de projeto.",
        participante: {
            nome: "Rafael Costa",
            cargo: "Fundador da Startup X",
            foto: "https://i.pravatar.cc/150?img=7"
        }
    }
];

// Elementos do DOM
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('dotsContainer');

// Estado do carrossel
let currentPage = 0;          // página atual (começa em 0)
let cardsToShow = 3;         // quantidade de cards visíveis por página
let totalPages = 1;          // será recalculado

// Cria os cards e os dots
function buildCarousel() {
    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Cria todos os cards
    encontros.forEach(encontro => {
        const card = document.createElement('div');
        card.className = 'encontro-card';
        card.innerHTML = `
            <img src="${encontro.imagem}" alt="${encontro.titulo}" class="encontro-imagem" loading="lazy">
            <div class="encontro-info">
                <span class="encontro-data">${encontro.data}</span>
                <h3 class="encontro-titulo">${encontro.titulo}</h3>
                <div class="depoimento">
                    <blockquote>${encontro.depoimento}</blockquote>
                    <div class="participante">
                        <img src="${encontro.participante.foto}" alt="${encontro.participante.nome}" class="participante-foto" loading="lazy">
                        <div>
                            <div class="participante-nome">${encontro.participante.nome}</div>
                            <div class="participante-cargo">${encontro.participante.cargo}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        track.appendChild(card);
    });

    // Recalcula páginas e cria dots
    updatePagination();
}

// Recalcula total de páginas e recria dots
function updatePagination() {
    totalPages = Math.ceil(encontros.length / cardsToShow);
    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToPage(i));
        dotsContainer.appendChild(dot);
    }

    // Garante que a página atual não ultrapasse o novo total
    if (currentPage >= totalPages) {
        currentPage = totalPages - 1;
    }
    updateCarousel();
}

// Move o carrossel para uma página específica
function goToPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= totalPages) return;
    currentPage = pageIndex;
    updateCarousel();
}

// Atualiza a posição do track e o estado dos dots
function updateCarousel() {
    const cardWidth = track.children[0].offsetWidth + 30; // 30px = margem (15px cada lado)
    const offset = -currentPage * cardsToShow * cardWidth;
    track.style.transform = `translateX(${offset}px)`;

    // Atualiza classe 'active' nos dots
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('active', i === currentPage);
    }
}

// Ajusta quantos cards aparecem por página de acordo com a tela
function updateCardsToShow() {
    const width = window.innerWidth;
    if (width <= 480) {
        cardsToShow = 1;
    } else if (width <= 768) {
        cardsToShow = 2;
    } else {
        cardsToShow = 3;
    }
    updatePagination();
}

// Suporte a touch (deslizar para mudar de página)
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0 && currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        } else if (diff < 0 && currentPage > 0) {
            goToPage(currentPage - 1);
        }
    }
});

// Suporte a teclado (setas esquerda/direita mudam de página)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPage > 0) {
        goToPage(currentPage - 1);
    } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
        goToPage(currentPage + 1);
    }
});

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    buildCarousel();
    updateCardsToShow();
});

window.addEventListener('resize', updateCardsToShow);