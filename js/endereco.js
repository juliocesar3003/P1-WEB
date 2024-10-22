const urlEndereco = "https://go-wash-api.onrender.com/api/auth/address"


class CadastroEndereco {
  constructor(titulo,cep,endereco,numero,complemento){
      this.titulo = titulo
      this.cep = cep
      this.endereco = endereco
      this.numero = numero
      this.complemento = complemento
    
  }
}



// Não toque nesse metodo ele cria o body do json que sera usado para criar usuario
function montarRequest(CadastroEndereco){

 return request ={
      "title" : CadastroEndereco.titulo,
      "cep" : CadastroEndereco.cep,
      "address" : CadastroEndereco.endereco,
      "number" : CadastroEndereco.numero,
      "complement" : CadastroEndereco.complemento
        
  }

}

//função para criar um usuario apartir do formulario html
function criarFormulario(forms){ 
  let titulo = document.getElementById('titulo').value.trim();
  let cep = document.getElementById('cep').value.trim();
  let endereco = document.getElementById('endereco').value.trim();
  let numero = document.getElementById('numero').value.trim();
  let complemento = document.getElementById('complemento').value.trim();
 

  

  //verificação de dados null
  if (!titulo || !cep || !endereco || !numero) {
      return{valid: false, mensagem:"Todos os dados são obrigatórios"}; 
  }

  //Cria o usuario
const formCadastro = new CadastroEndereco(
  titulo,
  cep,
  endereco,
  numero,
  complemento
);

//    objeto dinamico criado na resposta da função 
return{valid: true, form: formCadastro};
}

async function cadastrarEnde(urlEndereco ,enderecoRequest){
try{
      const user = localStorage.getItem("user");
      const userData = JSON.parse(user)
      const token = userData.access_token;
      const response = await fetch (urlEndereco, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(enderecoRequest),
      })

      

      //Trata os erros caso o response seja um erro
      if (!response.ok) {
          let errorData = 'Erro desconhecido';
              
          try {
              // Tenta extrair o corpo da resposta (presumindo que seja JSON)
              errorData = await response.json();
          } catch (jsonError) {
              // Se não for possível parsear como JSON, deixa a mensagem padrão
              throw new Error("Erro inesperado, contate o suporte");
              
          }
          
          throw new Error(JSON.stringify(errorData.data.errors));
      }

      const data = await response.json();
      return data;

  } catch (error) {
      throw new Error(` ${error.message}`);
  }
}


const buttonEnviarForms = document.getElementById('botaoEndereco');


//Evento que apatir do click em criar conta faz toda logica de cadastro
buttonEnviarForms.onclick = function(event){
  event.preventDefault();
  
  const forms = document.querySelector('#formularioEndereco');

  let EndeFormulario = criarFormulario(forms);
  if (!EndeFormulario.valid) {
      mostrarMensagem(false,EndeFormulario.mensagem);
  }

  else{
  // Variavel esta sendo usada para conter os dados do json 
      let EndeRequest = montarRequest(EndeFormulario.form);

      console.log(urlEndereco)
      cadastrarEnde(urlEndereco ,EndeRequest)
          .then(response => {
            mostrarMensagem(true,"Endereço cadastrado");
          })
          .catch(error => {
              mostrarMensagem(false,error.message);
          });

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
