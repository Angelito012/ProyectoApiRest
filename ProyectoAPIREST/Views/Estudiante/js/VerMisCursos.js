var url = "https://25.60.14.37:80/api/MainCursos/MostrarCursosComprados";
var email = getCookie('email'); 
let card = document.getElementById("contenedor")
var DatosEstudianteCarrito = JSON.parse(localStorage.getItem('estudiante'));
var rol = getCookie('rol');
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
        obtenercursos(tokenValido);
        var h2 = document.getElementById('nombre');
        h2.innerText = DatosEstudianteCarrito.nombre
    })

}

var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    localStorage.clear();
    location.href="../index.html";
}

function obtenercursos(token){
    fetch(url, {
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
        for(i=0; i<Data.length; i++){
            
            console.log(Data)
            let newcard = document.createElement('div');
            newcard.classList.add('card');

            let figure = document.createElement('figure');
            let imagen = document.createElement('img');
            imagen.src = "../images/cursos.jpg";
            figure.appendChild(imagen);
            newcard.appendChild(figure);

            let contenido_card = document.createElement('div');
            contenido_card.classList.add('contenido-card');

            let nombre = document.createElement('h3');
            nombre.innerText = Data[i].nombre;
            contenido_card.appendChild(nombre);

            let descripcion = document.createElement('p');
            descripcion.innerText = Data[i].descripcion;
            descripcion.innerHTML += `<hr>`;
            contenido_card.appendChild(descripcion);

            let duracion = document.createElement('h5');
            duracion.innerText = "Duracion: " + Data[i].duracion+" minutos";
            duracion.innerHTML += `<br><br>`;
            contenido_card.appendChild(duracion);

            let precio = document.createElement('h5');
            precio.innerText = "Precio: Q" + Data[i].costo;
            precio.innerHTML += `<br>`
            contenido_card.appendChild(precio);

            let botonVerLecciones = document.createElement("button");
            botonVerLecciones.Idcurso = Data[i].idCurso;
            botonVerLecciones.classList.add('btn');
            botonVerLecciones.className += " btn-info"
            botonVerLecciones.innerHTML = "Ver Lecciones"
            botonVerLecciones.addEventListener("click",function(boton){
                guardarDatos(boton.target.Idcurso);
                location.href = "../Estudiante/ListadoLecciones.html" 
            })
            contenido_card.appendChild(botonVerLecciones);
            


            newcard.appendChild(contenido_card);            
            card.appendChild(newcard);
        }
    })
}
function guardarDatos(id){
    var InformacionCurso = {
        Idcurso : id,
        nombre: "string",
        descripcion: "string",
        duracion: 0,
        costo: 0,
        estado: "string"
    };
    localStorage.setItem("cursoLecciones",JSON.stringify(InformacionCurso))
    
}

obtenerToken();
//obtenerToken2();