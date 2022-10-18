var email = getCookie('email');
var rol = getCookie('rol');
var DatosEstudianteCarrito = JSON.parse(localStorage.getItem('estudiante'));

window.addEventListener('load',(event) => {
    var rol = getCookie('rol');
    var email = getCookie('email'); 

    if(rol == ""){
        alert('Primero Ingrese sus credenciales')
        location.href="../index.html";
    }else if(rol != "Estudiante"){
        alert('No tiene acceso a esta pagina')
        location.href="../index.html";
    }
})

var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    localStorage.clear();
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
      var h2 = document.getElementById('nombre');
      h2.innerText = Data[0].nombre
      for (let i = 0; i < Data.length; i++) {
        var h2 = document.getElementById('name');
        h2.innerText = 'Bienvenido de nuevo ' + rol+' '+Data[i].nombre +' '+Data[i].apellido
          let btnEditar = document.getElementById("btnIcono");
          btnEditar.Idusuario = Data[i].idUsuario
          btnEditar.Nombre = Data[i].nombre
          btnEditar.Apellido = Data[i].apellido
          btnEditar.Correo = Data[i].correo
          btnEditar.Contraseña = Data[i].contraseña  
          btnEditar.Telefono = Data[i].telefono
          btnEditar.Nit = Data[i].nit
          btnEditar.TarjetaCredito = Data[i].tarjetaCredito
          btnEditar.Estado = Data[i].estado
          btnEditar.Rol = Data[i].rol 
          btnEditar.addEventListener('click',function(boton){
              guardarDatos(
                  boton.target.Idusuario,
                  boton.target.Nombre,
                  boton.target.Apellido,
                  boton.target.Correo,
                  boton.target.Contraseña,
                  boton.target.Telefono,
                  boton.target.Nit,
                  boton.target.TarjetaCredito,
                  boton.target.Estado,
                  boton.target.Rol
                  )
          })
      }     
    })
  }
  
  function guardarDatos(idUsuario,nombre,apellido,correo,contraseña,telefono,nit,tarjetaCredito, estado,rol){
    var InformacionEstudiante = {
        idUsuario: idUsuario,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contraseña: contraseña,
        telefono: telefono,
        nit : nit,
        tarjetaCredito : tarjetaCredito,
        estado: estado,
        rol: rol
    }
    console.log(InformacionEstudiante)
    localStorage.setItem("estudiante",JSON.stringify(InformacionEstudiante))
  }
  obtenerToken();