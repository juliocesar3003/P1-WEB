function out(botao) {
    botao.addEventListener('click', () => {
        window.location.href = '../View/Cadastro.html';
    });
}

const btnSair = document.getElementById("btnSair");

out(btnSair)