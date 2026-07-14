// Dados das unidades (imagem, links, etc.)
const unidadesData = {
    centro: {
        nome: 'Unidade Centro',
        imagem: 'https://placehold.co/600x400/2563eb/white?text=Unidade+Centro'
    },
    tenone: {
        nome: 'Unidade Tenoné',
        imagem: 'https://placehold.co/600x400/10b981/white?text=Unidade+Tenoné'
    },
    tapana: {
        nome: 'Unidade Tapanã',
        imagem: 'https://placehold.co/600x400/f59e0b/white?text=Unidade+Tapanã'
    },
    icoaraci: {
        nome: 'Unidade Icoaraci',
        imagem: 'https://placehold.co/600x400/8b5cf6/white?text=Unidade+Icoaraci'
    }
};

// Elementos do modal
const schoolModalOverlay = document.getElementById('schoolModalOverlay');
const closeSchoolModalBtn = document.getElementById('closeSchoolModalBtn');
const schoolImage = document.getElementById('schoolImage');
const btnContactFromModal = document.getElementById('btnContactFromModal');
const btnMoreFromModal = document.getElementById('btnMoreFromModal');

// Função para abrir modal com dados da unidade
function openSchoolModal(unitKey) {
    const data = unidadesData[unitKey];
    if (!data) return;

    schoolImage.src = data.imagem;
    schoolImage.alt = `Estrutura da ${data.nome}`;
    schoolModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Guarda a unidade atual para ações (opcional)
    schoolModalOverlay.dataset.currentUnit = unitKey;
}

// Fechar modal
function closeSchoolModal() {
    schoolModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Adiciona evento de clique em todos os cards com a classe .unit-card
document.querySelectorAll('.unit-card').forEach(card => {
    card.addEventListener('click', function () {
        const unit = this.dataset.unit;
        openSchoolModal(unit);
    });
});

// Fechar pelo X
closeSchoolModalBtn.addEventListener('click', closeSchoolModal);

// Fechar clicando fora
schoolModalOverlay.addEventListener('click', function (e) {
    if (e.target === schoolModalOverlay) closeSchoolModal();
});

// Fechar com ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && schoolModalOverlay.classList.contains('active')) {
        closeSchoolModal();
    }
});

// Botão "Entre em contato" – fecha modal e rola para formulário
btnContactFromModal.addEventListener('click', function () {
    closeSchoolModal();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Botão "Saiba mais" – fecha modal e rola para a seção Sobre (ou personalizar)
btnMoreFromModal.addEventListener('click', function () {
    closeSchoolModal();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
});