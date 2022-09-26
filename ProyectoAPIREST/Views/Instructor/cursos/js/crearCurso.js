var datos = JSON.parse(localStorage.getItem('instructor'));
var email = getCookie('email');
let card = document.getElementById("contenedor")
// localStorage.clear();
obtenerToken();


var boton = document.getElementById('enviar');

boton.addEventListener('click', () => {
    CrearCursos(tokenValido);
})

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
    })
}

function CrearCursos(token){
    var url = "https://localhost:7076/api/MainCursos/CrearCurso";
    fetch(url, {
        method: "POST",
        body: JSON.stringify({ 
            nombre: document.getElementById('nombre').value,        
            descripcion: document.getElementById('descripcion').value,        
            duracion: document.getElementById('duracion').value,        
            costo: document.getElementById('costo').value,
            precio:  document.getElementById('costo').value*1.2,     
            estado: document.getElementById('estado').value, 
            idProfesor: datos.idUsuario
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json",
            'Authorization': 'Bearer ' + token
        }
    }).then(function(response){
        if(response.ok){
            return response;
        }else{
            alert("Error al ejecutar solicitud")
        }
    }).then(function(Data){
        alert('Curso Creado')
        location.href = '/Instructor/VerCursos.html';
    })
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
var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    location.href="../index.html";
}