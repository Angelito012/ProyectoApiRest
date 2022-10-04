var urlTotal = "https://localhost:7076/api/Cursos/CatalogoCursos";
var urlFiltrado = "https://localhost:7076/api/MainCursos/BusquedaCurso";
var urlfiltro1 = "https://localhost:7076/api/MainCursos/FiltrosComprados";
var urlfiltro2 =  "https://localhost:7076/api/MainCursos/FiltrosNoComprados";
var urlfiltro3 =  "https://localhost:7076/api/MainCursos/FiltrosTodos";
var url = urlTotal
var email = getCookie('email'); 
let card = document.getElementById("contenedor")
let buscador = document.getElementById('buscador')
var DatosApi;

buscador.addEventListener('input',() => {
    card.innerHTML = "";
    if(buscador.value != ""){
        url = urlFiltrado
        document.getElementById('rb1').checked=false
        document.getElementById('rb2').checked=false
        document.getElementById('rb3').checked=false

    }else if(buscador.value == ""){
        url = urlTotal
        
    }
    obtenerToken()
})

function verificar(){

    if(document.getElementById('rb1').checked){
        url = urlfiltro1
        obtenerToken()
    }
    if(document.getElementById('rb2').checked){
        url = urlfiltro2
        obtenerToken()
    }
    if(document.getElementById('rb3').checked){
        url = urlfiltro3
        obtenerToken()
    }
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

    

    if(url == urlTotal){
        var InformacionCurso = {
            Correo: email,
            Clave: ""  
        };
    }else if(url == urlFiltrado){
        var InformacionCurso = {
            Correo: email,
            nombre: buscador.value  
        };
    }else if(url == urlfiltro1){
        var InformacionCurso = {
            Correo: email,
            Clave: ""  
        };
    }else if(url == urlfiltro2){
        var InformacionCurso = {
            Correo: email,
            Clave: ""  
        };
    }else if(url == urlfiltro3){
        var InformacionCurso = {
            Correo: email,
            Clave: ""  
        };
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

        if(DatosApi === Data){
            alert('same')
        }else if(DatosApi != Data){
            console.log(DatosApi)
            console.log(Data)
            DatosApi = Data;
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
        }
    })
}

obtenerToken();