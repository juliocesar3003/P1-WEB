const urlEndereco = "https://go-wash-api.onrender.com/api/auth/address"

const user = JSON.parse(localStorage.getItem("user"))

async function recuperarEndereço(user) {

    try{
    const response = await fetch(
        urlEndereco,{
            method:"GET",
            headers:{
                'Authorization': `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            }
        })
        const data = await response.json()
        return data
    }
    catch(error){
        throw new Error(`${error.message}`); 
    }
    
}

document.addEventListener('DOMContentLoaded',() =>{
 document.getElementById('loading').style.display = 'block';

recuperarEndereço(user)
            .then(response => {
                if(response.data.length == 0){
                    console.log("não tem nenhum endereço cadastrado ")
                }
               
                response.data.forEach((item, index) => construirLista(item,index + 1))

            })
            .catch(error => {
               
            })
            .finally(() => {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('blocoloading').style.display = 'none';
            });
        })
            let blocosEndereco = document.getElementsByClassName('left-content')[0]

function construirLista(item,ordem){
   
   let novoEndereco = document.createElement('div');
   novoEndereco.className = 'endereco';
   
   let img = document.createElement('img');
   img.src =  '../Images/icones/iconLocal.png'; 
   
   let txtEndereco = document.createElement('div');
   txtEndereco.className = 'txtEndereco';
   
   let h7 = document.createElement('h7');
   h7.innerHTML = `Endereço ${ordem}`;

   
   
   let h4 = document.createElement('h4');
   h4.innerHTML = `${item.title}, ${item.address}, ${item.number} - cep: ${item.cep}, complemento: ${item.complement}`;
   
   let imgSeta = document.createElement('img');
   imgSeta.src =  '../Images/icons8-cardápio-50.png'; 

   var buttonMenu = document.createElement('button');
   buttonMenu.appendChild(imgSeta)
   h4.appendChild(buttonMenu);
   
   var containerMenu = document.createElement('div')
   containerMenu.classList.add('containerMenu')
   containerMenu.style.display = "none"; 

   var buttonEditar = document.createElement('button');
   buttonEditar.innerText = "Editar"


   containerMenu.appendChild(buttonEditar);
   
   let buttonDeletar = document.createElement('button');
   buttonDeletar.innerText = "Deletar"
   containerMenu.appendChild(buttonDeletar);
 

   h4.appendChild(containerMenu)
   txtEndereco.appendChild(h7);
   txtEndereco.appendChild(h4);
   novoEndereco.appendChild(img);
   novoEndereco.appendChild(txtEndereco);
   blocosEndereco.appendChild(novoEndereco);

   buttonMenu.addEventListener("click", function(){
    if( buttonEditar.style.display === "none" && buttonDeletar.style.display === "none" ){
        containerMenu.style.display ="flex"
         buttonEditar.style.display = "block"
          buttonDeletar.style.display = "block"

    }else{
          containerMenu.style.display = "none"
          buttonEditar.style.display = "none"
          buttonDeletar.style.display = "none"
    }
})

    
        buttonEditar.addEventListener("click", function(){
           
        
            let titulo = document.getElementById('titulo');
            titulo.value = item.title

            let cep = document.getElementById('cep');
            cep.value = item.cep;

            let endereco = document.getElementById('endereco');
            endereco.value = item.address;

            let numero = document.getElementById('numero');
            numero.value = item.number;

            let complemento = document.getElementById('complemento');
            complemento.value = item.complement;

            let modal = document.getElementById("containerModal")
            let body = document.getElementById("main")
           
            let botaoSalvar = document.getElementById("botao")
            botaoSalvar.value = item.id


            body.classList.remove("mainFechado");
            body.classList.add('Layoutmain')
            modal.style.display = "block"
        })
    

}



