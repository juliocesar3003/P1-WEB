function DeletarEndereco(endereco) {
console.log(endereco)
    


    // let urlcomId = `https://go-wash-api.onrender.com/api/auth/address/${id}`


    // try{
    //     const response =  fetch(
    //         urlcomId,{
    //             method:'DELETE',
    //             headers:{
    //                 'Authorization': `Bearer ${userToBeDeleted.access_token}`
    //             }
    //         })

    //         const data =  response.json()
    //         return data
    //     }
    //     catch(error){
    //         throw new Error(`${error.message}`); 
    //     }
        
}

document.getElementById('btnExcluir').addEventListener('click', function(event) {
    event.preventDefault();
    DeletarEndereco(userObject).then(response => {
        location.reload()
      })
      .catch(error => {
          alert(error.message);
      });
; 
});