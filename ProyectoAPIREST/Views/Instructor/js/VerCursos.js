var url = "https://localhost:7076/api/MainInstructor/VerCursos";
var email = getCookie('email'); 
let card = document.getElementById("contenedor")
var DatosInstructor = JSON.parse(localStorage.getItem('instructor'));



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
        ValidacionInstructor(Data.token)
        var h2 = document.getElementById('nombre');
        h2.innerText = DatosInstructor.nombre
    })
}
var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    location.href="../index.html";
}

function ValidacionInstructor(token){
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

            let estado = document.createElement('h5');
            if(Data[i].estado == "A"){
                var textoEstado = "Activo"
            }else{
                var textoEstado = "Inactivo"
            }
            estado.innerText = "Estado: " + textoEstado;
            estado.innerHTML += `<br><br>`;
            contenido_card.appendChild(estado);

            let costo = document.createElement('h5');
            costo.innerText = "Costo: Q " + Data[i].costo;
            costo.innerHTML += `<br>`
            contenido_card.appendChild(costo);

            let botonLeccion = document.createElement("button");
            botonLeccion.Idcurso = Data[i].idCurso;
            botonLeccion.Nombre = Data[i].nombre;
            botonLeccion.Descripcion = Data[i].descripcion;
            botonLeccion.Duracion = Data[i].duracion;
            botonLeccion.Estado = Data[i].estado;
            botonLeccion.Costo = Data[i].costo;
            botonLeccion.classList.add('btn2');
            botonLeccion.className += " btn-leccion"
            botonLeccion.innerHTML = "Crear Lección"
            botonLeccion.style.width
            botonLeccion.addEventListener("click",function(boton){
                guardarDatos(
                    boton.target.Idcurso,
                    boton.target.Nombre,
                    boton.target.Descripcion,
                    boton.target.Duracion,
                    boton.target.Estado,
                    boton.target.Costo);
                location.href = "./cursos/lecciones/crearLeccion.html"
            })
            contenido_card.appendChild(botonLeccion);

            let botonEditar = document.createElement("button");
            botonEditar.Idcurso = Data[i].idCurso;
            botonEditar.Nombre = Data[i].nombre;
            botonEditar.Descripcion = Data[i].descripcion;
            botonEditar.Duracion = Data[i].duracion;
            botonEditar.Estado = Data[i].estado;
            botonEditar.Costo = Data[i].costo;
            botonEditar.classList.add('btn');
            botonEditar.className += " btn-edit"
            botonEditar.innerHTML = "Editar"
            botonEditar.addEventListener("click",function(boton){
                guardarDatos(
                    boton.target.Idcurso,
                    boton.target.Nombre,
                    boton.target.Descripcion,
                    boton.target.Duracion,
                    boton.target.Estado,
                    boton.target.Costo);
                location.href = "./cursos/editarCurso.html"
            })
            contenido_card.appendChild(botonEditar);
            
            let botonEliminar = document.createElement("button");
            botonEliminar.Idcurso = Data[i].idCurso;
            botonEliminar.Nombre = Data[i].nombre;
            botonEliminar.Descripcion = Data[i].descripcion;
            botonEliminar.Duracion = Data[i].duracion;
            botonEliminar.Estado = Data[i].estado;
            botonEliminar.Costo = Data[i].costo;
            botonEliminar.classList.add('btn');
            botonEliminar.className += " btn-danger"
            botonEliminar.innerHTML = "Eliminar"
            contenido_card.appendChild(botonEliminar);
            botonEliminar.addEventListener('click',function(boton){
                guardarDatos(
                    boton.target.Idcurso,
                    boton.target.Nombre,
                    boton.target.Descripcion,
                    boton.target.Duracion,
                    boton.target.Estado,
                    boton.target.Costo);
                location.href = "./cursos/eliminarCurso.html"
            })

            let botonVerLecciones = document.createElement("button");
            botonVerLecciones.Idcurso = Data[i].idCurso;
            botonVerLecciones.classList.add('btn');
            botonVerLecciones.className += " btn-leccion"
            botonVerLecciones.innerHTML = "Lecciones"
            botonVerLecciones.addEventListener("click",function(boton){
                guardarDatos(boton.target.Idcurso);
                location.href = "../Instructor/ListadoLecciones.html" 
            })
            contenido_card.appendChild(botonVerLecciones);

            newcard.appendChild(contenido_card);            
            card.appendChild(newcard);
        }
    })
}

function guardarDatos(id,nombre,descripcion,duracion,estado,costo){
    var InformacionCurso = {
        Idcurso : id,
        nombre : nombre,
        descripcion : descripcion,
        duracion : duracion,
        estado : estado,
        costo : costo
    };
    
    console.log(InformacionCurso)
    localStorage.setItem("curso",JSON.stringify(InformacionCurso))
    // alert('hola')
}

obtenerToken();
//obtenerToken2();
// localStorage.clear();