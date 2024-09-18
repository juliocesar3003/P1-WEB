function out(botao) {
    botao.addEventListener('click', () => {
        window.location.href = '../View/Cadastro.html';
    });
}

const btnSair = document.getElementById("btnSair");

out(btnSair)

window.onload = function(){
    mostrarMensagem()
}


function mostrarMensagem(){
    let containerMensagem = document.getElementById('mensagemResponse');
    
    

   
        // atribui uma classe css a esse elemento html
        containerMensagem.classList.add('#mensagemResponse');
        // atiribui um texto que sera colocado dentro do span
        // o texto sera atribuido conforme a função que esta chamando ele 

    setTimeout(() => {
        containerMensagem.style.opacity = '1';
    }, 500);
    
}
 //função usada para fechar mensagem do response
    // só muda a visibilidade para zero 
    function fechar(){
        let mensagem = document.getElementById('mensagemResponse');
        let containerMensagem = document.getElementById('mensagemResponse');
        containerMensagem.style.display ="none"

        mensagem.style.opacity = '0';
   
       }