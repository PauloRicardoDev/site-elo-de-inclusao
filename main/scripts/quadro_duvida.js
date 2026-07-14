// ===== Quadro de Dúvidas =====
const duvidaForm = document.getElementById('duvidaForm');
const duvidasContainer = document.getElementById('duvidasContainer');
const nenhumaDuvida = document.getElementById('nenhumaDuvida');

// Carrega dúvidas salvas no localStorage
function carregarDuvidas() {
    const duvidas = JSON.parse(localStorage.getItem('duvidasTEA')) || [];
    exibirDuvidas(duvidas);
}

// Exibe as dúvidas na tela
function exibirDuvidas(duvidas) {
    duvidasContainer.innerHTML = '';

    if (duvidas.length === 0) {
        duvidasContainer.innerHTML = '<p class="nenhuma-duvida">Nenhuma dúvida cadastrada ainda. Seja o primeiro a perguntar!</p>';
        return;
    }

    duvidas.forEach((duvida, index) => {
        const card = document.createElement('div');
        card.className = 'duvida-card';

        // Calcula prazo de 30 dias a partir da data de envio
        const dataEnvio = new Date(duvida.data);
        const dataLimite = new Date(dataEnvio);
        dataLimite.setDate(dataLimite.getDate() + 3);  // prazo de 3 dias
        const hoje = new Date();
        const diasRestantes = Math.ceil((dataLimite - hoje) / (1000 * 60 * 60 * 24));

        let prazoTexto = '';
        if (diasRestantes > 0) {
            prazoTexto = `⏳ Resposta em até ${diasRestantes} dia(s)`;
        } else {
            prazoTexto = '✅ Respondido (prazo encerrado)';
        }

        card.innerHTML = `
            <div class="duvida-conteudo">
                <p class="duvida-texto">“${duvida.texto}”</p>
                <p class="duvida-autor">
                    <span>👤 ${duvida.nome}</span>
                    <span>📅 ${dataEnvio.toLocaleDateString('pt-BR')}</span>
                </p>
            </div>
            <div class="duvida-prazo">${prazoTexto}</div>
        `;
        duvidasContainer.appendChild(card);
    });
}

// Salva nova dúvida
duvidaForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('duvidaNome').value.trim();
    const email = document.getElementById('duvidaEmail').value.trim();
    const texto = document.getElementById('duvidaTexto').value.trim();

    if (!nome || !email || !texto) {
        alert('Preencha todos os campos.');
        return;
    }

    const novaDuvida = {
        nome,
        email,
        texto,
        data: new Date().toISOString()
    };

    const duvidas = JSON.parse(localStorage.getItem('duvidasTEA')) || [];
    duvidas.unshift(novaDuvida); // adiciona no início
    localStorage.setItem('duvidasTEA', JSON.stringify(duvidas));

    // Feedback
    alert(`Obrigado, ${nome}! Sua dúvida foi registrada e será respondida em até 3 dias.`);

    // Limpa formulário
    duvidaForm.reset();

    // Atualiza lista
    exibirDuvidas(duvidas);
});

// Inicializa a lista ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDuvidas);