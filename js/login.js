const apiURL = "https://go-wash-api.onrender.com/api/login&#39";

async function cadastrarUser(apiURL, request) {
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('senha').value.trim();

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        user_type_id: 1,
        password: password,
      }),
    });
    
    const data = await response.json();  
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "../View/home.html";
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
