var rol = getCookie('rol');
var email = getCookie('email');
var DatosInstructor = JSON.parse(localStorage.getItem('instructor'));


window.addEventListener('load',(event) => { 
    if(rol == ""){
        alert('Primero Ingrese sus credenciales')
        location.href="../index.html";
    }else if(rol != "Instructor"){
        alert('No tiene acceso a esta pagina')
        location.href="../index.html";
    }

    if(email != ""){
        var h2 = document.getElementById('name');
        h2.innerText = 'Bienvenido de nuevo ' + email
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
  var url = "https://localhost:7076/api/Instructor/Get";
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
        let btnEditar = document.getElementById("btnIcono");
        btnEditar.Idusuario = Data[i].idUsuario
        btnEditar.Nombre = Data[i].nombre
        btnEditar.Apellido = Data[i].apellido
        btnEditar.Correo = Data[i].correo
        btnEditar.Contraseña = Data[i].contraseña  
        btnEditar.Telefono = Data[i].telefono
        btnEditar.Estado = Data[i].estado
        btnEditar.Rol = Data[i].rol
        btnEditar.Experiencia = Data[i].experiencia
        btnEditar.Certificaciones = Data[i].certificaciones
        btnEditar.NombreBanco = Data[i].nombreBanco
        btnEditar.NombreCuenta = Data[i].nombreCuenta
        btnEditar.TipoCuenta = Data[i].tipoCuenta
        btnEditar.NoCuenta = Data[i].noCuenta  
        btnEditar.addEventListener('click',function(boton){
            guardarDatos(
                boton.target.Idusuario,
                boton.target.Nombre,
                boton.target.Apellido,
                boton.target.Correo,
                boton.target.Contraseña,
                boton.target.Telefono,
                boton.target.Estado,
                boton.target.Rol,
                boton.target.Experiencia,
                boton.target.Certificaciones,
                boton.target.NombreBanco,
                boton.target.NombreCuenta,
                boton.target.TipoCuenta,
                boton.target.NoCuenta
                )
        })
    }     
  })
}

function guardarDatos(idUsuario,nombre,apellido,correo,contraseña,telefono,estado,rol,experiencia,certificaciones,nombreBanco,nombreCuenta,tipoCuenta,noCuenta){
  var InformacionInstructor = {
      idUsuario: idUsuario,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      contraseña: contraseña,
      telefono: telefono,
      estado: estado,
      rol: rol,
      experiencia: experiencia,
      certificaciones: certificaciones,
      nombreBanco: nombreBanco,
      nombreCuenta: nombreCuenta,
      tipoCuenta: tipoCuenta,
      noCuenta: noCuenta
  }
  console.log(InformacionInstructor)
  localStorage.setItem("instructor",JSON.stringify(InformacionInstructor))
}
obtenerToken();



