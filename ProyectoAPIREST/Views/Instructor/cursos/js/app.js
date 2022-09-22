var datos = JSON.parse(localStorage.getItem('curso'));
var email = getCookie('email');
let card = document.getElementById("contenedor")
// localStorage.clear();
OpenEdit();
obtenerToken();

function OpenEdit(){
    document.getElementById('codigo').value = datos.Idcurso;
    document.getElementById('nombre').value = datos.nombre;
    document.getElementById('descripcion').value = datos.descripcion;
    document.getElementById('duracion').value = datos.duracion;
    document.getElementById('estado').value = datos.estado;
    document.getElementById('costo').value = datos.costo;
}

var boton = document.getElementById('enviar');

boton.addEventListener('click', () => {
    ActualizarDatos(tokenValido);
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
        verLeccion(tokenValido);
    })
}

function ActualizarDatos(token){
    var url = "https://localhost:7076/api/MainCursos/EditarCurso";
    fetch(url, {
        method: "PUT",
        body: JSON.stringify({
            idCurso: document.getElementById('codigo').value,        
            nombre: document.getElementById('nombre').value,        
            descripcion: document.getElementById('descripcion').value,        
            duracion: document.getElementById('duracion').value,        
            costo: document.getElementById('costo').value,        
            estado: document.getElementById('estado').value,        
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
        alert('Curso Editado')
<<<<<<< HEAD
        localStorage.clear();
        location.href = '../VerCursos.html';
=======
        location.href = '/Instructor/VerCursos.html';
>>>>>>> 3ad3a2ccf6710f6feb68aa428be370f7c902c651
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

function verLeccion(token){
    console.log(token)
    var url = "https://localhost:7076/api/MainLeccion/VerLecciones";
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
            imagen.src = "/images/cursos.jpg";
            figure.appendChild(imagen);
            newcard.appendChild(figure);

            let contenido_card = document.createElement('div');
            contenido_card.classList.add('contenido-card');

            let nombre = document.createElement('h3');
            nombre.innerText = Data[i].nombre;
            contenido_card.appendChild(nombre);

            let descripcion = document.createElement('textarea');
            descripcion.innerText = Data[i].descripcion;
            descripcion.setAttribute("readonly","true");
            descripcion.classList.add('descripcion');
            contenido_card.appendChild(descripcion);

            contenido_card.innerHTML += `<hr>`

            let duracion = document.createElement('h5');
            duracion.innerText = "Duracion: " + Data[i].duración;
            duracion.innerHTML += `<br><br>`;
            contenido_card.appendChild(duracion);

            contenido_card.innerHTML += `<b>Enlace</b>`

            let enlace = document.createElement('textarea');
            enlace.innerText = Data[i].enlace;
            enlace.setAttribute("readonly","true");
            enlace.classList.add('enlace');
            contenido_card.appendChild(enlace);

            let botonEditar = document.createElement("button");
            botonEditar.Idcurso = Data[i].idCurso;
            botonEditar.Nombre = Data[i].nombre;
            botonEditar.Descripcion = Data[i].descripcion;
            botonEditar.Duracion = Data[i].duración;
            botonEditar.enlace = Data[i].enlace;
            botonEditar.classList.add('btn');
            botonEditar.className += " btn-edit"
            botonEditar.innerHTML = "Editar"
            botonEditar.addEventListener("click",function(boton){
                
            })
            contenido_card.appendChild(botonEditar);

            let botonEliminar = document.createElement("button");
            botonEliminar.Idcurso = Data[i].idCurso;
            botonEliminar.Nombre = Data[i].nombre;
            botonEliminar.Descripcion = Data[i].descripcion;
            botonEditar.Duracion = Data[i].duración;
            botonEditar.enlace = Data[i].enlace;
            botonEliminar.classList.add('btn');
            botonEliminar.className += " btn-danger"
            botonEliminar.innerHTML = "Eliminar"
            contenido_card.appendChild(botonEliminar);
            botonEliminar.addEventListener('click',function(boton){
                
            })

            newcard.appendChild(contenido_card);            
            card.appendChild(newcard);
        }
    })
}