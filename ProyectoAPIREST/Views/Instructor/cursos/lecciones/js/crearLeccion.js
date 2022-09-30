var datos = JSON.parse(localStorage.getItem('curso'));
var email = getCookie('email');

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

Datos();
obtenerToken();

function Datos(){
    document.getElementById('nombreCurso').value = datos.nombre;
}

var boton = document.getElementById('enviar');

boton.addEventListener('click', () => {
    CrearLeccion(tokenValido);
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

function CrearLeccion(token){
    var url = "https://localhost:7076/api/Leccion/CrearLeccion";
    fetch(url, {
        method: "POST",
        body: JSON.stringify({ 
            nombre: document.getElementById('nombre').value,        
            descripcion: document.getElementById('descripcion').value,        
            duración: document.getElementById('duracion').value,        
            enlace: document.getElementById('enlace').value,
            idCurso: datos.Idcurso
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
        alert('Lección Creada')
        location.href = '/Instructor/VerCursos.html';
    })
}
