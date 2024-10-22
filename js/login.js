
// async function cadastrarUser() {
//  

//     let email = document.getElementById('email').value.trim();
//     let password = document.getElementById('senha').value.trim();

//     if(!email || !password){
//      return mostrarMensagem(false,"Senhas não coincidem");
    
//     }
    
//   try {
//     const response = await fetch(apiURL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: email,
//         user_type_id: 1,
//         password: password,
//       }),
//     });
    
//     const data = await response.json();  
//       if (response.ok) {
//         localStorage.setItem("user", JSON.stringify(data));
//         window.location.href = "../View/home.html";
//         return
//     }

//     if(data.data && data.data.errors){
//         mostrarMensagem(false,data.data.errors)
//         return
//     }
  
    
//   } catch (error) {
//     throw new Error(`${error.message}`);
  
//   }

const apiURL = "https://go-wash-api.onrender.com/api/login";


//Classe utilizada para criar novoUsuario que sera cadastrado
class CadastroUser {
    constructor(email,password){
        this.email = email;
        this.user_type_id = 1;
        this.password = password;
      
    }
}



// Não toque nesse metodo ele cria o body do json que sera usado para criar usuario
function montarRequest(CadastroUser){

   return request ={
        "email" : CadastroUser.email,
        "user_type_id" : CadastroUser.user_type_id,
        "password" : CadastroUser.password,
          
    }

}

//função para criar um usuario apartir do formulario html
function criarFormulario(forms){ 
    let email = forms.elements['email'].value.trim();
    let password = forms.elements['senha'].value.trim();
   

    

    //verificação de dados null
    if (!email || !password ) {
        return{valid: false, mensagem:"Todos os dados são obrigatórios"}; 
    }

    //Cria o usuario
 const formCadastro = new CadastroUser(
    email,
    password,
  
);

//    objeto dinamico criado na resposta da função 
  return{valid: true, user: formCadastro};
}

// Função que ira fazer a conexão com a api e ira mandar os dados para cadastrar novoUsuario
async function cadastrarUser(apiURL,userRequest){
  try{

        const response = await fetch (apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRequest),
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
        localStorage.setItem("user",JSON.stringify(data))  
        return data;

    } catch (error) {
        throw new Error(` ${error.message}`);
    }
}


const buttonEnviarForms = document.getElementById('botaoLogin');


//Evento que apatir do click em criar conta faz toda logica de cadastro
buttonEnviarForms.onclick = function(event){
    event.preventDefault();
    
    const forms = document.querySelector('#formularioLogin');

    let userFormulario = criarFormulario(forms);
    if (!userFormulario.valid) {
        mostrarMensagem(false,userFormulario.mensagem);
    }

    else{
    // Variavel esta sendo usada para conter os dados do json 
        let userRequest = montarRequest(userFormulario.user);

        console.log(userRequest)
        cadastrarUser(apiURL, userRequest)
            .then(response => {
               window.location.href = '../View/home.html';
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


