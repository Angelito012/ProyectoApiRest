var datos = JSON.parse(localStorage.getItem('curso'));
var email = getCookie('email');
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
    document.getElementById('nombreCurso').value = datos.nombre;
}

var boton = document.getElementById('enviar');

boton.addEventListener('click', () => {
    //Agregamos la validacion antes
    ValidarIndex(tokenValido);
    //CrearLeccion(tokenValido);
})

function obtenerToken(){
    var url = "https://25.60.14.37:80/api/Autenticacion/Validar";

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
function ValidarIndex(token){
    var url = "https://25.60.14.37:80/api/Leccion/ValidarIndex";
    fetch(url, {
        method: "POST",
        body: JSON.stringify({ 
            curso: datos.Idcurso,
            index: document.getElementById('orden').value
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json",
            'Authorization': 'Bearer ' + token
        }
    }).then(function(response){
        if(response.ok){
            return response.text();
        }else{
            alert("Error al ejecutar solicitud")
        }
    }).then(function(Data){

        if(Data==='"Index libre"'){
        CrearLeccion(token);
        location.href = '/Instructor/VerCursos.html';
        }else{
            if(confirm("Esta posicion ya existe una lección, desea insertarla de todas formas, esto aumentara una posicion el resto de lecciones?")==true){
                ModificarIndex(token);
                CrearLeccion(token);
                location.href = '/Instructor/VerCursos.html';
                }else{
                    alert("Ingrese otro numero para el orden de la leccion")
                }
        }
    })
}

function ModificarIndex(token){
    var url = "https://25.60.14.37:80/api/Leccion/ModificarIndex";
    fetch(url, {
        method: "POST",
        body: JSON.stringify({ 
            curso: datos.Idcurso,
            index: document.getElementById('orden').value
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json",
            'Authorization': 'Bearer ' + token
        }
    }).then(function(response){
        if(response.ok){
            return response.text();
        }else{
            alert("Error al ejecutar solicitud")
        }
    }).then(function(Data){
        console.log(Data);
        return;
    })
}



function CrearLeccion(token){
    var url = "https://25.60.14.37:80/api/Leccion/CrearLeccion";
    fetch(url, {
        method: "POST",
        body: JSON.stringify({ 
            nombre: document.getElementById('nombre').value,        
            descripcion: document.getElementById('descripcion').value,        
            duración: document.getElementById('duracion').value,        
            enlace: document.getElementById('enlace').value,
            idCurso: datos.Idcurso,
            orden: document.getElementById('orden').value
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json",
            'Authorization': 'Bearer ' + token
        }
    }).then(function(response){
        if(response.ok){
            alert('Lección Creada')
            return response;
        }else{
            alert("Error al ejecutar solicitud")
        }
    }).then(function(Data){
        
        location.href = '/Instructor/VerCursos.html';
    })
}
