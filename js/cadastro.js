//url usada para cadastrar usuario 
const apiURL ="https://go-wash-api.onrender.com/api/user"


//Classe utilizada para criar novoUsuario que sera cadastrado
class CadastroUser {
    constructor(name,email,password,cpf_cnpj,birthday){
        this.name = name;
        this.email = email;
        this.user_type_id = "1";
        this.password = password;
        this.cpf_cnpj = cpf_cnpj;
        this.terms = "1";
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
        "birthday" :CadastroUser.birthday
    }

}

// Ao criar o formulario troque os dados pelo que foi passado no html 
const novoCadastro = new CadastroUser(
    "roberio",
    "mogato6536@konetas.com",
    "123456",
    "21973303060",
    "2000-10-12"
);

//Use para testar o novo usuario 
console.log(novoCadastro);

// Variavel esta sendo usada para conter os dados do json 
let userRequest = montarRequest(novoCadastro);


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

        console.log("Status Code: ", response.status);

        //Trata os erros caso o response seja um erro
        if (!response.ok) {
            let errorData = 'Erro desconhecido';
                
            try {
                // Tenta extrair o corpo da resposta (presumindo que seja JSON)
                errorData = await response.json();
            } catch (jsonError) {
                // Se não for possível parsear como JSON, deixa a mensagem padrão
                console.warn("Resposta de erro não é JSON:", jsonError);
            }
            
            throw new Error(`Erro: ${response.status} - ${response.statusText}. Detalhes: ${JSON.stringify(errorData.data.errors)}`);
        }

        const data = await response.json();  
        return data;

    } catch (error) {
        throw new Error(`Erro de conexão ou falha na requisição: ${error.message}`);
    }
}

 

// Função que esta sendo usada para testar a requisão 
cadastrarUser(apiURL, userRequest)
    .then(response => {
        console.log("Resposta recebida: ", response);
    })
    .catch(error => {
        console.error(error.message);
    });

