async function DeletarEndereco() {

 const token = JSON.parse(localStorage.getItem("user"))
    
 let id = document.getElementById("btnExcluir").value;

 let urlcomId = `https://go-wash-api.onrender.com/api/auth/address/${id}`


    try{
         const response =  await fetch(
            urlcomId,{
                method:'DELETE',
                headers:{
                    'Authorization': `Bearer ${token.access_token}`
                }
            })

            const data =  response.json()
            return data
        }
        catch(error){
            throw new Error(`${error.message}`); 
        }
        
}

document.getElementById('btnExcluir').addEventListener('click', function(event) {
    event.preventDefault();
    DeletarEndereco().then(response => {
        location.reload()
      })
      .catch(error => {
          alert(error.message);
      });
; 
});


function fecharDelete() {
    let modal = document.getElementById("delete")
    let body = document.getElementById("main")
    modal.style.display = "none"
    body.classList.remove("Layoutmain");
    body.classList.add("mainFechado")
  }