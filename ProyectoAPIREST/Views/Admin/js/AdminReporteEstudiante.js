var email = getCookie('email'); 
let card = document.getElementById("contenedor")
var rol = getCookie('rol');
window.addEventListener('load',(event) => {
    if(rol == ""){
        alert('Primero Ingrese sus credenciales')
        location.href="../index.html";
    }else if(rol != "Administrador"){
        alert('No tiene acceso a esta pagina')
        location.href="../index.html";
    }

})
var datosadmin = JSON.parse(localStorage.getItem('admin'));

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
        obtenerEstudiantes(tokenValido);
        var h2 = document.getElementById('nombre');
        h2.innerText = datosadmin.nombre
    })

}

var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    location.href="../index.html";
}

function obtenerEstudiantes(token){
    var url = "https://localhost:7076/api/ReporteEstudiantes/EstudianteCurso";

    fetch(url, {
        method: "GET",
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
            if(Data[i].estado == "A"){
                var textoEstado = "Activo"
            }else{
                var textoEstado = "Inactivo"
            }
            console.log(Data)
            let newcard = document.createElement('div');
            newcard.classList.add('card');

            let figure = document.createElement('figure');
            let imagen = document.createElement('img');
            imagen.src = "../images/estudiantes.jpg";
            figure.appendChild(imagen);
            newcard.appendChild(figure);

            let contenido_card = document.createElement('div');
            contenido_card.classList.add('contenido-card');

            let nombre = document.createElement('h5');
            let label_nombre = document.createElement('label')
            label_nombre.innerText = "Estudiante: ";
            nombre.innerHTML = Data[i].nombre +" "+ Data[i].apellido;
            nombre.innerHTML += `<hr>`;
            contenido_card.appendChild(label_nombre)
            contenido_card.appendChild(nombre);

            let estado = document.createElement('h5');
            let label_estado = document.createElement('label')
            label_estado.innerText = "Estado: ";
            estado.innerText = textoEstado;
            contenido_card.appendChild(label_estado)
            contenido_card.appendChild(estado);

            let correo = document.createElement('h5');
            let label_correo = document.createElement('label')
            label_correo.innerText = "Correo: ";
            correo.innerText = Data[i].correo;
            contenido_card.appendChild(label_correo)
            contenido_card.appendChild(correo);

            let cursos = document.createElement('h5');
            let label_cursos = document.createElement('label')
            label_cursos.innerText = "Cursos Comprados: ";
            cursos.innerText = Data[i].cursos;
            contenido_card.appendChild(label_cursos)
            contenido_card.appendChild(cursos);

            let gasto = document.createElement('h5');
            let label_gasto = document.createElement('label')
            label_gasto.innerText = "Total de Gasto: ";
            gasto.innerText = "Q " + Data[i].gasto;
            gasto.innerHTML += `<br>`
            contenido_card.appendChild(label_gasto);
            contenido_card.appendChild(gasto);

            let botonVerCursos = document.createElement("button");
            botonVerCursos.IdUsuario = Data[i].idUsuario;
            botonVerCursos.Estudiante = Data[i].nombre +" "+ Data[i].apellido;
            botonVerCursos.Cursos = Data[i].cursos;
            botonVerCursos.Gasto = Data[i].gasto;
            botonVerCursos.classList.add('btn');
            botonVerCursos.className += " btn-info"
            botonVerCursos.innerHTML = "Ver Cursos"

            if(Data[i].cursos == 0){
                botonVerCursos.disabled = true; 
            }
            else{
                botonVerCursos.disabled = false; 
            }

            botonVerCursos.addEventListener("click",function(boton){
                guardarDatos(boton.target.IdUsuario,
                            boton.target.Estudiante,
                            boton.target.Cursos,
                            boton.target.Gasto);
                location.href = "../Admin/AdminListadoCursos.html" 
            })
            contenido_card.appendChild(botonVerCursos);
            


            newcard.appendChild(contenido_card);            
            card.appendChild(newcard);
        }
    })
}
function guardarDatos(idUsuario,estudiante,cursos,gasto){
    var InformacionEstudiante = {
        IdUsuario : idUsuario,
        Estudiante: estudiante,
        Cursos: cursos,
        Gasto: gasto
    };
    console.log(InformacionEstudiante)
    localStorage.setItem("InformeEstudiante",JSON.stringify(InformacionEstudiante))
    
}

obtenerToken();