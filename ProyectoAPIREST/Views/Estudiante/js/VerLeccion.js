var rol = getCookie('rol');
var datos = JSON.parse(localStorage.getItem('LeccionSelect'));
var datosEst = JSON.parse(localStorage.getItem('estudiante'));
var email = getCookie('email');
var ps = 1;

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
        Get(Data.token)
    })
  }
  function Get(token){
    console.log(datos)
    var url = "https://localhost:7076/api/MainLeccion/VerLeccionPorId";
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
        let foro = "";
        var h2 = document.getElementById('name');
        h2.innerText = Data.nombre  
        var h4 = document.getElementById('desc');
        h4.innerText = Data.descripcion 
        document.getElementById("video").innerHTML = `
        <iframe width="1000" height="500" src="https://www.youtube.com/embed/${Data.enlace}" title="Aprende JavaScript - Curso Completo desde Cero" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
        for(i=0; i<Data.preguntas.length; i++){
            console.log(Data.preguntas[i])
            if(Data.preguntas[i].respuesta != ""){
            
            foro = foro +
        `
            <form>
            <div class="form-group">
            <label>Pregunta por ${Data.preguntas[i].usuario}</label>
            <textarea disabled id="comment" class="form-control">${Data.preguntas[i].duda}</textarea></label>
            </div>
            <div class="form-group">
            <label>Respuesta</label>
            <textarea disabled id="comment" class="form-control">${Data.preguntas[i].respuesta}</textarea></label>
            </div>
            </form>
            `
            }else{
            foro = foro +
            `
                <form>
                <div class="form-group">
                <label>Pregunta por ${Data.preguntas[i].usuario}</label>
                <textarea disabled id="comment" class="form-control">${Data.preguntas[i].duda}</textarea></label>
                </div>
                <div class="form-group">
                <label>Respuesta</label>
                <textarea disabled id="comment" class="form-control">Respuesta pendiente</textarea></label>
                </div>
                </form>
                `    
            }
        }
        foro = foro +
        `
        <form>
        <div class="form-group">
        <label>Pregunta</label>
        <textarea disable id="pregunta" class="form-control"></textarea></label>
        <div id="button-preguntar"></div>
        </form>
        `
        document.getElementById("foro").innerHTML=foro;


        let botonPreguntar = document.createElement("button");
        botonPreguntar.classList.add('btn');
        botonPreguntar.className += " btn btn-primary"
        botonPreguntar.innerHTML = "Preguntar"
        botonPreguntar.setAttribute('id', 'botonpreguntar');
        botonPreguntar.addEventListener("click",function(){
                Preguntar(token); 
            })
        document.getElementById("foro").appendChild(botonPreguntar);
        ps = 2;

        
        
  })
}
function Preguntar(token){
    var url = "https://localhost:7076/api/MainLeccion/CrearPregunta";
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            idPregunta:0,
            duda: document.getElementById("pregunta").value,
            respuesta: "",
            idLeccion: datos.idLeccion,
            idUsuario: datosEst.idUsuario
        }
        ),
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json",
            'Authorization': 'Bearer ' + token
        }
    }).then(function(response){
        if(response.ok){
            Get(token);
            return response.json();
        }else{
            alert("Error al ejecutar solicitud")

        }
  }).then(function(){
    Get(token);
  })

}
  

  obtenerToken();