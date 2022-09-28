var urlTotal = "https://localhost:7076/api/Cursos/CatalogoCursos";
var urlFiltrado = "https://localhost:7076/api/MainInstructor/VerCursos";;
var url = urlTotal
var email = getCookie('email'); 
let card = document.getElementById("contenedor")
let buscador = document.getElementById('buscador')

buscador.addEventListener('input',() => {
    card.innerHTML = "";
    if(buscador.value != ""){
        url = urlFiltrado
    }else if(buscador.value == ""){
        url = urlTotal
    }
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
        tokenValido = Data.token;
        obtenercursos(tokenValido);
    })

}

var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    location.href="../index.html";
}

function obtenercursos(token){
    var InformacionCurso = {
        Correo: email,
        Clave: ""  
    };
    
    if(url == urlFiltrado){
        InformacionCurso.filtro = buscador.value;
    }

    fetch(url, {
        method: "POST",
        body: JSON.stringify(InformacionCurso),
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
                duracion.innerText = "Duracion: " + Data[i].duracion;
                duracion.innerHTML += `<br><br>`;
                contenido_card.appendChild(duracion);
    
                let precio = document.createElement('h5');
                precio.innerText = "Precio: " + Data[i].precio;
                precio.innerHTML += `<br>`
                contenido_card.appendChild(precio);
    
                let botonInformacion = document.createElement("button");
                botonInformacion.classList.add('btn');
                botonInformacion.className += " btn-info"
                botonInformacion.innerHTML = "Informacion"
                
                contenido_card.appendChild(botonInformacion);
    
                let botoncomprar = document.createElement("button");
                botoncomprar.classList.add('btn');
                botoncomprar.className += " btn-danger"
                botoncomprar.innerHTML = "Añadir a Carrito"
                
                contenido_card.appendChild(botoncomprar);
    
    
                newcard.appendChild(contenido_card);            
                card.appendChild(newcard);
            }
        }else{
            card.innerHTML = "";
            let anuncio = document.createElement('h1');
            anuncio.innerHTML = "La busqueda no coincide";           
            card.appendChild(anuncio);
        }
    })
}

obtenerToken();