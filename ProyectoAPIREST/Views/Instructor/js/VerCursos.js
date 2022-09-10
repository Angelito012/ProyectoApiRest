var url = "https://localhost:7076/api/MainInstructor/VerCursos";
var email = getCookie('email'); 
let card = document.getElementById("contenedor")

obtenerToken();

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
    })
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
        console.log(Data);
        for(i=0; i<Data.length; i++){
            card.innerHTML += `<div class="card">
            <figure>
                <img src="/images/cursos.jpg">
            </figure>
            <div class="contenido-card">
                <h3 id="Nombre">${Data[i].nombre}</h3>
                <p id="Descripcion">${Data[i].descripcion}</p>
                <hr>
                <h5>Duracion: ${Data[i].duracion}<span id="Duracion"></span></h5>
                <br>
                <h5>Estado: ${Data[i].estado}<span id="Estado"></span></h5>
                <br>
                <h5>Costo: ${Data[i].costo}<span id="Costo"></span></h5>
                <br>
                <a href="" class="btn btn-edit">Editar Curso</a>
                <a href="" class="btn btn-danger">Eliminar Curso</a>
            </div>
        </div>`
        }
    })
}






