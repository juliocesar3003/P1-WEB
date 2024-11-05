

function fechar() {
    let modal = document.getElementById("containerModal")
    let body = document.getElementById("main")
    modal.style.display = "none"
    body.classList.remove("Layoutmain");
    body.classList.add("mainFechado")
  }


  const token = JSON.parse(localStorage.getItem("user"))
 
  async function AtualizarEndereco(token) {

    let titulo = document.getElementById('titulo').value.trim();
    let cep = document.getElementById('cep').value.trim();
    let endereco = document.getElementById('endereco').value.trim();
    let numero = document.getElementById('numero').value.trim();
    let complemento = document.getElementById('complemento').value.trim();
    let id = document.getElementById("botao").value;
   
    


    if (!titulo || !cep || !endereco || !numero) {
      alert("Todos os dados são obrigatórios"); 
    }

    request = {
        "title" : titulo,
        "cep" : cep,
        "address" : endereco,
        "number" : numero,
        "complement" : complemento
          
    }
   
    let urlcomId = `https://go-wash-api.onrender.com/api/auth/address/${id}`


    try{
        const response = await fetch(
            urlcomId,{
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${token.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()
            return data
        }
        catch(error){
            throw new Error(`${error.message}`); 
        }
        
}

document.getElementById('botao').addEventListener('click', function(event) {
    event.preventDefault();
    AtualizarEndereco(token).then(response => {
        location.reload()
      })
      .catch(error => {
          alert(error.message);
      });
; 
});