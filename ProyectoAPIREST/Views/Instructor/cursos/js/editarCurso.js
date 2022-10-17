var datos = JSON.parse(localStorage.getItem('curso'));
var email = getCookie('email');
let card = document.getElementById("contenedor")
var totalEstudiante = 0;
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
// localStorage.clear();
OpenEdit();
obtenerToken();

var select = document.getElementById('estado');

select.addEventListener('click',() => {
    if(select.value == 'A'){
        if(totalEstudiante > 0){
            alert('EL curso no se puede desactivar porque ya ha sido comprado por ' + totalEstudiante + ' estudiantes')
        }
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
        validarCurso(tokenValido);
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

            let orden = document.createElement('h3');
            orden.innerText = Data[i].orden;
            contenido_card.appendChild(orden);
            
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
            duracion.innerText = "Duracion: " + Data[i].duración +" minutos";
            duracion.innerHTML += `<br><br>`;
            contenido_card.appendChild(duracion);

            let botonEditar = document.createElement("button");
            botonEditar.IdLeccion = Data[i].idLeccion;
            botonEditar.Nombre = Data[i].nombre;
            botonEditar.Descripcion = Data[i].descripcion;
            botonEditar.Duracion = Data[i].duración;
            botonEditar.Orden = Data[i].orden;
            botonEditar.Enlace = Data[i].enlace;
            botonEditar.Idcurso = Data[i].idCurso;
            botonEditar.classList.add('btn');
            botonEditar.className += " btn-edit"
            botonEditar.innerHTML = "Editar"
            botonEditar.addEventListener("click",function(boton){
                guardarDatos(
                    boton.target.IdLeccion,
                    boton.target.Nombre,
                    boton.target.Descripcion,
                    boton.target.Duracion,
                    boton.target.Orden,
                    boton.target.Enlace,
                    boton.target.Idcurso);
                location.href = "lecciones/EditarLeccion.html"
            })
            contenido_card.appendChild(botonEditar);

            let botonEliminar = document.createElement("button");
            botonEliminar.IdLeccion = Data[i].idLeccion;
            botonEliminar.Nombre = Data[i].nombre;
            botonEliminar.Descripcion = Data[i].descripcion;
            botonEliminar.Duracion = Data[i].duración;
            botonEliminar.Orden = Data[i].orden;
            botonEliminar.Enlace = Data[i].enlace;
            console.log(Data[i].orden)
            botonEliminar.Idcurso = Data[i].idCurso;
            botonEliminar.classList.add('btn');
            botonEliminar.className += " btn-danger"
            botonEliminar.innerHTML = "Eliminar"
            contenido_card.appendChild(botonEliminar);
            botonEliminar.addEventListener('click',function(boton){
                guardarDatos(
                    boton.target.IdLeccion,
                    boton.target.Nombre,
                    boton.target.Descripcion,
                    boton.target.Duracion,
                    boton.target.Orden,
                    boton.target.Enlace,
                    boton.target.Idcurso);
                location.href = "lecciones/EliminarLeccion.html"
            })

            newcard.appendChild(contenido_card);            
            card.appendChild(newcard);
        }
    })
}

function guardarDatos(id,nombre,descripcion,duracion,orden,enlace,idcurso){
    var InformacionLeccion = {
        Idleccion : id,
        nombre : nombre,
        descripcion : descripcion,
        duración : duracion,
        orden : orden,
        enlace : enlace,
        Idcurso: idcurso
    };
    
    console.log(InformacionLeccion)
    localStorage.setItem("leccion",JSON.stringify(InformacionLeccion))
    // alert('hola')
}