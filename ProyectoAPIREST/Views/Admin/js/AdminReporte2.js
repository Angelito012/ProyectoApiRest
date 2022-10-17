var urlCursos = "https://localhost:7076/api/IngresoPorCurso/IngresoCursoAdmin";
var email = getCookie('email'); 
let card = document.getElementById("contenedor")
let buscador = document.getElementById('buscador')
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

buscador.addEventListener('input',() => {
    card.innerHTML = "";
   
    obtenerToken()


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
        obtenerCursos(tokenValido);
    })

}

var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    location.href="../index.html";
}

function obtenerCursos(token){
    fetch(urlCursos, {
        method: "POST",
        body: JSON.stringify({
            curso:  buscador.value         
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
        if(Data.length > 0){
            card.innerHTML = "";

            for(i=0; i<Data.length; i++){
            
                console.log(Data)
                let newcard = document.createElement('div');
                newcard.classList.add('card');
    
                let figure = document.createElement('figure');
                let imagen = document.createElement('img');
                imagen.src = "./img/reporte.png";
                figure.appendChild(imagen);
                newcard.appendChild(figure);
    
                let contenido_card = document.createElement('div');
                contenido_card.classList.add('contenido-card');
    
                let CodigoCurso = document.createElement('h5');
                let labelCodigo = document.createElement('label')
                labelCodigo.innerText = "Codigo Curso: ";
                CodigoCurso.innerHTML = Data[i].idCurso;
                CodigoCurso.innerHTML += `<hr>`;
                contenido_card.appendChild(labelCodigo)
                contenido_card.appendChild(CodigoCurso);
    
                let nombre = document.createElement('h5');
                let label_nombre = document.createElement('label')
                label_nombre.innerText = "Curso: ";
                nombre.innerText = Data[i].curso;
                contenido_card.appendChild(label_nombre);
                contenido_card.appendChild(nombre);

                let profesor = document.createElement('h5');
                let labelProfesor = document.createElement('label')
                labelProfesor.innerText = "Nombre Profesor: ";
                profesor.innerText = Data[i].profesor;
                contenido_card.appendChild(labelProfesor)
                contenido_card.appendChild(profesor);

                let correoProfe = document.createElement('h5');
                let labelCorreo = document.createElement('label')
                labelCorreo.innerText = "Correo Profesor: ";
                correoProfe.innerText = Data[i].correo;
                contenido_card.appendChild(labelCorreo)
                contenido_card.appendChild(correoProfe);
    
                let cantidad = document.createElement('h5');
                let labelCantidad = document.createElement('label')
                labelCantidad.innerText = "Cantidad Estudiantes: ";
                cantidad.innerText = Data[i].cantidad;
                contenido_card.appendChild(labelCantidad)
                contenido_card.appendChild(cantidad);
    
                let Ganancias = document.createElement('h5');
                let labelGanancias = document.createElement('label')
                labelGanancias.innerText = "Ganancias: ";
                Ganancias.innerText = "Q " + Data[i].ganancia;
                nombre.innerHTML += `<br>`
                contenido_card.appendChild(labelGanancias);
                contenido_card.appendChild(Ganancias);
    
                let botonVerCursos = document.createElement("button");
                botonVerCursos.CodigoCurso = Data[i].idCurso;
                botonVerCursos.Nombre = Data[i].curso;
                botonVerCursos.Cantidad = Data[i].cantidad;
                botonVerCursos.Total = Data[i].totalProfesor;
                botonVerCursos.Profesor = Data[i].profesor;
                botonVerCursos.PrecioProfesor = Data[i].precioProfesor;
                botonVerCursos.correo = Data[i].correo;
                botonVerCursos.PrecioVenta = Data[i].precioVenta;
                botonVerCursos.TotalVenta = Data[i].totalVenta;
                botonVerCursos.Ganancias = Data[i].ganancia;
                

                botonVerCursos.classList.add('btn');
            
                botonVerCursos.className += " btn-info"
                botonVerCursos.innerHTML = "Estadistica"

                
    
                botonVerCursos.addEventListener("click",function(boton){
                    guardarDatos(boton.target.CodigoCurso,
                                boton.target.Nombre,
                                boton.target.Profesor,
                                boton.target.correo,
                                boton.target.PrecioProfesor,
                                boton.target.Total,
                                boton.target.Cantidad,
                                boton.target.PrecioVenta,
                                boton.target.TotalVenta,
                                boton.target.Ganancias);
                    location.href = "./VerEstudiantes.html" 
                })
                contenido_card.appendChild(botonVerCursos);
                
    
    
                newcard.appendChild(contenido_card);            
                card.appendChild(newcard);
    
              
            }
        }else{
            card.innerHTML = "";
            let anuncio = document.createElement('h1');
            anuncio.classList.add('notFound');
            anuncio.innerHTML = "La busqueda no coincide";           
            card.appendChild(anuncio);
        }
        
      
        
    

    })
}
function guardarDatos(CodigoCurso,Nombre,Profesor,correo,PrecioProfesor,total,Cantidad,PrecioVenta,TotalVenta,Ganancias){
    var InformacionCurso = {
    idCurso : CodigoCurso,
    curso : Nombre,
    profesor : Profesor,
    correo : correo,
    precioProfesor : PrecioProfesor,
    totalProfesor : total,
    estudiantes : Cantidad,
    precioVenta : PrecioVenta,
    totalVenta: TotalVenta,
    ganancias: Ganancias
};

localStorage.setItem("curso",JSON.stringify(InformacionCurso))
    
}

obtenerToken();