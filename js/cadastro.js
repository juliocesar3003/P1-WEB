//url usada para cadastrar usuario 
const apiURL ="https://go-wash-api.onrender.com/api/user"


//Classe utilizada para criar novoUsuario que sera cadastrado
class CadastroUser {
    constructor(name,email,password,cpf_cnpj,birthday,terms){
        this.name = name;
        this.email = email;
        this.user_type_id = 1;
        this.password = password;
        this.cpf_cnpj = cpf_cnpj;
        this.terms = terms;
        this.birthday = birthday;
    }
}



// Não toque nesse metodo ele cria o body do json que sera usado para criar usuario
function montarRequest(CadastroUser){

   return request ={
        "name" : CadastroUser.name,
        "email" : CadastroUser.email,
        "user_type_id" : CadastroUser.user_type_id,
        "password" : CadastroUser.password,
        "cpf_cnpj" : CadastroUser.cpf_cnpj,
        "terms" : CadastroUser.terms,
        "birthday" :CadastroUser.birthday,     
    }

}

//função para criar um usuario apartir do formulario html
function criarFormulario(forms){ 
    let nome = forms.elements['nome'].value.trim();
    let email = forms.elements['email'].value.trim();
    let password = forms.elements['senha'].value.trim();
    let confirmPassword = forms.elements['senhaConfirmada'].value.trim();
    let cpf_cnpj = forms.elements['cpf_cnpj'].value.trim();
    let dataNascimento = forms.elements['data_nascimento'].value;
    let termos = forms.elements['termoscheck'].checked;

    console.log(termos)

    //verificação de dados null
    if (!nome || !email || !password || !confirmPassword || !cpf_cnpj || !dataNascimento) {
        return{valid: false, mensagem:"Todos os dados são obrigatórios"}; 
    }
    //verificação de senha igual
    if(password !== confirmPassword){

        return {valid: false, mensagem:"Senhas não coincidem"};
    }
    if(termos == 0){

        return {valid: false, mensagem:"voce não aceitou os termos"};
    }

    //Cria o usuario
 const formCadastro = new CadastroUser(
    nome,
    email,
    password,
    cpf_cnpj,
    dataNascimento,
    Number(termos)
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
                throw new Error("Resposta de erro não é JSON:", jsonError);
            }
            
            throw new Error(JSON.stringify(errorData.data.errors));
        }

        const data = await response.json();  
        return data;

    } catch (error) {
        throw new Error(` ${error.message}`);
    }
}


const buttonEnviarForms = document.getElementById('botaoCadastro');


//Evento que apatir do click em criar conta faz toda logica de cadastro
buttonEnviarForms.onclick = function(event){
    event.preventDefault();
    
    const forms = document.querySelector('#formularioCadastrar');

    let userFormulario = criarFormulario(forms);
    if (!userFormulario.valid) {
        mostrarMensagem(false,userFormulario.mensagem);
    }

    else{
    // Variavel esta sendo usada para conter os dados do json 
        let userRequest = montarRequest(userFormulario.user);

        cadastrarUser(apiURL, userRequest)
            .then(response => {
               window.location.href = '../View/home.html';

               
            })
            .catch(error => {
                console.error(error.message);
                mostrarMensagem(false,error.message);
            });

        }
    }

    //Função para mostrar a mensagem após enviar a requisição para api de cadastro
    function mostrarMensagem(tipo, mensagem){
        let containerMensagem = document.getElementById('mensagemResponse');
        let mensagemResponse = document.getElementById('mensagem');
        
        containerMensagem.className = '';

        if(tipo){
            // atribui uma classe css a esse elemento html
            containerMensagem.classList.add('mensagemResponseOk');
            // atiribui um texto que sera colocado dentro do span
            // o texto sera atribuido conforme a função que esta chamando ele 
            mensagemResponse.textContent = mensagem
        }
        else{
             containerMensagem.classList.add('mensagemResponseError');
             mensagemResponse.textContent = mensagem
        }

        setTimeout(() => {
            containerMensagem.style.opacity = '1';
        }, 0);
        
    }
    //função usada para fechar mensagem do response
    // só muda a visibilidade para zero 
    function fechar(){
     let mensagem = document.getElementById('mensagemResponse');

     mensagem.style.opacity = '0';

    }

    //                  ANIMAÇÕES


    const slides = document.querySelector('.carousel-slides');
    const slide = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    let currentIndex = 0;
    const totalSlides = slide.length;

    // Função para atualizar o carrossel e os indicadores
    function updateCarousel() {
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }

    // Função para avançar para o próximo slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }

    // Navegação automática
    setInterval(nextSlide, 3000); // Muda de slide a cada 3 segundos

    // Atualizar o slide ao clicar nos indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    // Inicialização: Define o primeiro slide como ativo
    updateCarousel();

