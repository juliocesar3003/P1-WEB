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
                console.log(response)
                if(response.data.length == 0){
                    console.log("não tem nenhum endereço cadastrado ")
                }
                console.log(response.data[0])
                response.data.forEach((item, index) => construirLista(item,index + 1))

            })
            .catch(error => {
                console.log(error +" :deu algum erro")
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
   h4.innerHTML = item.formatted_address
   ;
   
   txtEndereco.appendChild(h7);
   txtEndereco.appendChild(h4);
   novoEndereco.appendChild(img);
   novoEndereco.appendChild(txtEndereco);
   blocosEndereco.appendChild(novoEndereco);
}