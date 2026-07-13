// Menu Mobile Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animação do menu hamburguer
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active')
        ? 'rotate(45deg) translate(5px, 5px)'
        : 'none';
    spans[1].style.opacity = navLinks.classList.contains('active')
        ? '0'
        : '1';
    spans[2].style.transform = navLinks.classList.contains('active')
        ? 'rotate(-45deg) translate(5px, -5px)'
        : 'none';
});

// Fechar menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Formulário de Contato
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Coletar dados do formulário
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Simulação de envio
    console.log('Dados do formulário:', formData);

    // Feedback visual
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.8';

    // Simular envio com delay
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }, 1500);
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de elementos ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.feature-card, .about-content, .about-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Animação de entrada para o header ao carregar a página
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});