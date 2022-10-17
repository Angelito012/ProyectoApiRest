var datos = JSON.parse(localStorage.getItem('curso'));
var leccion = JSON.parse(localStorage.getItem('leccion'));
console.log(leccion.Idleccion)
var email = getCookie('email');
var totalEstudiante = 0;
var tokenValido;
var rol = getCookie('rol');

window.addEventListener('load',(event) => { 
    if(rol == ""){
        alert('Primero Ingrese sus credenciales')
        location.href="../index.html";
    }else if(rol != "Instructor"){
        alert('No tiene acceso a esta pagina')
        location.href="../index.html";
    }
})

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
    document.getElementById('nombre').value = leccion.nombre;
    document.getElementById('descripcion').value = leccion.descripcion;
    document.getElementById('duracion').value = leccion.duración;
    document.getElementById('enlace').value = leccion.enlace;
    document.getElementById('nombreCurso').value = datos.nombre;
}

var boton = document.getElementById('enviar');

boton.addEventListener('click', () => {
    if(totalEstudiante > 0){
        alert('No se puede eliminar esta leccion porque el curso ya ha sido comprado por ' + totalEstudiante + " estudiantes")
    }else{
        EliminarPregunta(tokenValido);
    }
})

function validarCurso(token){
    var url = "https://localhost:7076/api/MainCursos/ValidarCurso";
    fetch(url,{
        method: "POST",
        body: JSON.stringify({
            idCurso: datos.Idcurso,
            nombre: "string",
            descripcion: "string",
            duracion: 0,
            costo: 0,
            estado: "string"
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type":"application/json",
            'Authorization': 'Bearer ' + token
        }
    }).then(function(response){
        return response.json();
    }).then(function(Data){
        totalEstudiante = Data
    })
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
        validarCurso(tokenValido);
    })
}

function EliminarPregunta(token){
    var url = "https://localhost:7076/api/MainLeccion/EliminarPregunta";
    fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ 
            IdLeccion: leccion.Idleccion
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json",
            'Authorization': 'Bearer ' + token
        }
    }).then().then(EliminarLeccion(token))
}

function EliminarLeccion(token){
    var url = "https://localhost:7076/api/Leccion/EliminarUnaLeccion";
    fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ 
            IdLeccion: leccion.Idleccion
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
        alert('Lección Eliminada')
        location.href = '/Instructor/cursos/editarCurso.html';
    })
}
