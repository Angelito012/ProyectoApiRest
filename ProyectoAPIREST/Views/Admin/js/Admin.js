var rol = getCookie('rol');
var email = getCookie('email'); 

window.addEventListener('load',(event) => {
    if(rol == ""){
        alert('Primero Ingrese sus credenciales')
        location.href="../index.html";
    }else if(rol != "Administrador"){
        alert('No tiene acceso a esta pagina')
        location.href="../index.html";
    }

})



var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    location.href="../index.html";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function obtenerToken(){
    var url = "https://localhost:7076/api/Autenticacion/Validar";
  
    fetch(url,{
        method: "POST",
        body: JSON.stringify({
            correo: email,
            clave: ""
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type":"application/json"
        }
    }).then(function(response){
        if(response.ok){
            return response.json();
        }else{
            validarEstado(correo,clave);
        }
    }).then(function(Data){
        console.log(Data.token);
        tokenValido = Data.token;
        Get(Data.token)

    })
  }
  function Get(token){
    var url = "https://localhost:7076/api/Estudiantes/GetEstudiantesinfo";
    fetch(url,{
      method: "POST",
      body: JSON.stringify({
          Correo: email,
          Clave: ""          
      }),
      headers:{
          'Accept' : "application/json",
          "Content-Type" : "application/json",
          'Authorization': 'Bearer ' + token
      }
  }).then(function(response){
      if(response.ok){
          return response.json();
      }else{
          alert("Error al ejecutar solicitud")
      }
  }).then(function(Data){
      console.log(Data);
    
      
     

      for (let i = 0; i < Data.length; i++) {
        var h2 = document.getElementById('name');
        h2.innerText = 'Bienvenido de nuevo ' + rol + ' '+Data[i].nombre +' '+Data[i].apellido
          
      }     
    })
  }

  obtenerToken();