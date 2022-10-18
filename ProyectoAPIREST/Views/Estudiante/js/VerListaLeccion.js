var rol = getCookie('rol');
var email = getCookie('email');
var datos = JSON.parse(localStorage.getItem('cursoLecciones'));
let card = document.getElementById("contenedor")
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

    if(email != ""){

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
        verLeccion(Data.token)
        var h2 = document.getElementById('nombre');
        h2.innerText = DatosEstudianteCarrito.nombre
    })
  }

  

  function verLeccion(token){


    document.getElementById("title-cards").innerHTML = `
    <h1>Lecciones del Curso</h1>
  `;
    console.log(token)
    var url = "https://25.60.14.37:80/api/MainLeccion/VerLecciones";
    fetch(url, {
        method: "POST",
        body: JSON.stringify(datos),
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
        console.log(Data)
        for(i=0; i<Data.length; i++){
            
            let newcard = document.createElement('div');
            newcard.classList.add('card');

            let figure = document.createElement('figure');
            let imagen = document.createElement('img');
            imagen.src = "/images/lecciones.jpg";
            figure.appendChild(imagen);
            newcard.appendChild(figure);

            let contenido_card = document.createElement('div');
            contenido_card.classList.add('contenido-card');


            let nombre = document.createElement('h3');
            nombre.innerText = Data[i].nombre;
            contenido_card.appendChild(nombre);

            let Orden = document.createElement('h5');
            let label_Orden = document.createElement('label')
            label_Orden.innerText = "Leccion Numero: ";
            Orden.innerHTML = Data[i].orden;
            Orden.innerHTML += `<hr>`;
            contenido_card.appendChild(label_Orden)
            contenido_card.appendChild(Orden);

            let descripcion = document.createElement('textarea');
            descripcion.innerText = Data[i].descripcion;
            descripcion.setAttribute("readonly","true");
            descripcion.classList.add('descripcion');
            contenido_card.appendChild(descripcion);

            contenido_card.innerHTML += `<hr>`

            let duracion = document.createElement('h5');
            duracion.innerText = "Duracion: " + Data[i].duración+" minutos";
            duracion.innerHTML += `<br><br>`;
            contenido_card.appendChild(duracion);




            let botonVerLeccion = document.createElement("button");
            botonVerLeccion.Idcurso = Data[i].idCurso;
            botonVerLeccion.Nombre = Data[i].nombre;
            botonVerLeccion.Descripcion = Data[i].descripcion;
            botonVerLeccion.Duracion = Data[i].duración;
            botonVerLeccion.enlace = Data[i].enlace;
            botonVerLeccion.idLeccion = Data[i].idLeccion;
            botonVerLeccion.classList.add('btn');
            botonVerLeccion.className += " btn-edit"
            botonVerLeccion.innerHTML = "Ver Leccion"
            botonVerLeccion.addEventListener("click",function(boton){
                
                guardarDatos(boton.target.idLeccion);
                location.href = "../Estudiante/VerLeccion.html";
            })
            contenido_card.appendChild(botonVerLeccion);
           



            newcard.appendChild(contenido_card);            
            card.appendChild(newcard);
        }
    })
}

function guardarDatos(id){
    var InformacionLeccion = {
            idLeccion: id,
            nombre: "string",
            descripcion: "string",
            duración: 0,
            enlace: "string",
            idCurso: 0
          };
    localStorage.setItem("LeccionSelect",JSON.stringify(InformacionLeccion))
    };
    

  obtenerToken();