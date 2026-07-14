// Pegando os elementos
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');

// Função para abrir o modal
function openModal() {
    modalOverlay.classList.add('active');
    // Opcional: impedir scroll do body
    document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // restaura scroll
}

// Eventos de clique
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Fecha ao clicar fora do modal (no overlay)
modalOverlay.addEventListener('click', function (e) {
    // Verifica se o clique foi exatamente no overlay (não nos elementos filhos)
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Fecha ao pressionar a tecla ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});