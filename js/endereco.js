const urlEndereco = "https://go-wash-api.onrender.com/api/auth/address"

const user = localStorage.getItem(user);

async function cadastrarUser(apiURL, request) {
    let titulo = document.getElementById('titulo').value.trim();
    let cep = document.getElementById('cep').value.trim();
    let endereco = document.getElementById('endereco').value.trim();
    let numero = document.getElementById('numero').value.trim();
    let complemento = document.getElementById('complemento').value.trim();

    if (!titulo || !cep || !endereco || !numero || !complemento) {
        mostrarMensagem(false,"Todos os dados são obrigatórios"); 
    }

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${user.acess_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       title:titulo,
       cep:cep,
       address:endereco,
       number:numero,
       complement:complemento
      }),
    });
    
    const data = await response.json();  
      if (response.ok) {
        mostrarMensagem(true,"sucesso")
        return
    }

    if(data.data && data.data.errors){
        mostrarMensagem(false,data.data.errors)
        return
    }
    
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

function mostrarMensagem(tipo, mensagem) {
    let containerMensagem = document.getElementById("mensagemResponse");
    let mensagemResponse = document.getElementById("mensagem");
  
    containerMensagem.className = "";
  
    if (tipo) {
      // atribui uma classe css a esse elemento html
      containerMensagem.classList.add("mensagemResponseOk");
      // atiribui um texto que sera colocado dentro do span
      // o texto sera atribuido conforme a função que esta chamando ele
      mensagemResponse.textContent = mensagem;
    } else {
      containerMensagem.classList.add("mensagemResponseError");
      mensagemResponse.textContent = mensagem;
    }
  
    setTimeout(() => {
      containerMensagem.style.opacity = "1";
    }, 0);
  }
  //função usada para fechar mensagem do response
  // só muda a visibilidade para zero
  function fechar() {
    let mensagem = document.getElementById("mensagemResponse");
  
    mensagem.style.opacity = "0";
  }
