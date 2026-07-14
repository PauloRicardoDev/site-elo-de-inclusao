// Dados dos encontros (os mesmos, você pode personalizar)
const encontros = [
    {
        "id": 1,
        "imagem": "https://picsum.photos/seed/tea1/400/300",
        "data": "15 de Agosto, 2026",
        "titulo": "Palestra: Entendendo o TEA",
        "depoimento": "A palestra foi transformadora! Finalmente entendi como ajudar meu filho em casa. A psicopedagoga explicou de forma tão clara e acolhedora.",
        "participante": {
            "nome": "Juliana Andrade",
            "cargo": "Mãe do Miguel (2º ano)",
            "foto": "https://i.pravatar.cc/150?img=10"
        }
    },
    {
        "id": 2,
        "imagem": "https://picsum.photos/seed/tea2/400/300",
        "data": "15 de Agosto, 2026",
        "titulo": "Palestra: Entendendo o TEA",
        "depoimento": "Saí da palestra com ferramentas práticas para usar na sala de aula. A abordagem sobre comunicação não violenta foi um divisor de águas.",
        "participante": {
            "nome": "Prof. Ricardo Lins",
            "cargo": "Professor do 4º ano",
            "foto": "https://i.pravatar.cc/150?img=12"
        }
    },
    {
        "id": 3,
        "imagem": "https://picsum.photos/seed/artes1/400/300",
        "data": "22 de Agosto, 2026",
        "titulo": "Oficina de Artes Sensoriais",
        "depoimento": "Meu filho é autista e se encantou com as texturas e cores. A equipe soube acolher as necessidades dele com muito carinho. Foi emocionante!",
        "participante": {
            "nome": "Fernanda Costa",
            "cargo": "Pai do Gabriel (1º ano)",
            "foto": "https://i.pravatar.cc/150?img=14"
        }
    },
    {
        "id": 4,
        "imagem": "https://picsum.photos/seed/artes2/400/300",
        "data": "22 de Agosto, 2026",
        "titulo": "Oficina de Artes Sensoriais",
        "depoimento": "Eu nunca tinha visto minha filha tão focada. Ela amou pintar com as mãos e experimentar os sons. Já estamos ansiosos pela próxima!",
        "participante": {
            "nome": "Patrícia Mello",
            "cargo": "Mãe da Sofia (3º ano)",
            "foto": "https://i.pravatar.cc/150?img=16"
        }
    },
    {
        "id": 5,
        "imagem": "https://picsum.photos/seed/piquenique1/400/300",
        "data": "05 de Setembro, 2026",
        "titulo": "Piquenique da Família C.E.C.S.",
        "depoimento": "Foi lindo ver todas as famílias reunidas, sem pressa, num ambiente tão acolhedor. Me senti parte de uma comunidade de verdade.",
        "participante": {
            "nome": "Roberta Nunes",
            "cargo": "Mãe do Lucas (2º ano)",
            "foto": "https://i.pravatar.cc/150?img=18"
        }
    },
    {
        "id": 6,
        "imagem": "https://picsum.photos/seed/piquenique2/400/300",
        "data": "05 de Setembro, 2026",
        "titulo": "Piquenique da Família C.E.C.S.",
        "depoimento": "O piquenique foi um momento especial de integração. Meu marido, que trabalha muito, pôde participar e ficou encantado com a escola.",
        "participante": {
            "nome": "Camila Rocha",
            "cargo": "Mãe do Enzo (1º ano)",
            "foto": "https://i.pravatar.cc/150?img=19"
        }
    },
    {
        "id": 7,
        "imagem": "https://picsum.photos/seed/talentos1/400/300",
        "data": "12 de Setembro, 2026",
        "titulo": "Mostra de Talentos Inclusiva",
        "depoimento": "Chorei de emoção ao ver minha filha no palco. A inclusão realmente acontece aqui. Ela se apresentou com tanta confiança!",
        "participante": {
            "nome": "Andréa Dantas",
            "cargo": "Mãe da Manuela (5º ano)",
            "foto": "https://i.pravatar.cc/150?img=20"
        }
    },
    {
        "id": 8,
        "imagem": "https://picsum.photos/seed/talentos2/400/300",
        "data": "12 de Setembro, 2026",
        "titulo": "Mostra de Talentos Inclusiva",
        "depoimento": "Ver cada aluno brilhar do seu jeito foi a prova de que a escola respeita a neurodiversidade. Saí de lá renovado como professor.",
        "participante": {
            "nome": "Prof. Marcos Vinícius",
            "cargo": "Professor de Música",
            "foto": "https://i.pravatar.cc/150?img=22"
        }
    }
]

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