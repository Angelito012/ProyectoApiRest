var rol = getCookie('rol');
var datoslec = JSON.parse(localStorage.getItem('SelectLeccion'));
var datos = JSON.parse(localStorage.getItem('instructor'));
var email = getCookie('email');
var ps = 1;

window.addEventListener('load',(event) => {
    var rol = getCookie('rol');
    var email = getCookie('email'); 

    if(rol == ""){
        alert('Primero Ingrese sus credenciales')
        location.href="../index.html";
    }else if(rol != "Instructor"){
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
    console.log(datoslec)
    var url = "https://localhost:7076/api/MainLeccion/VerLeccionPorId";
    fetch(url, {
        method: "POST",
        body: JSON.stringify(datoslec),
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
            
            document.getElementById("foro").innerHTML += 
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
            document.getElementById("foro").innerHTML += 
            `
                <form>
                <div class="form-group">
                <label>Pregunta por ${Data.preguntas[i].usuario}</label>
                <textarea disabled id="comment" class="form-control">${Data.preguntas[i].duda}</textarea></label>
                </div>
                <div class="form-group">
                <label>Respuesta</label>
                <textarea id="respuesta-${Data.preguntas[i].idPregunta}" class="form-control">Respuesta pendiente</textarea></label>
                </div>
                <div id="button-${Data.preguntas[i].idPregunta}"></div>
                </form>
                `   
                
                let botonResponder = document.createElement("button");
                
                botonResponder.classList.add('btn');
                botonResponder.className += " btn btn-primary"
                botonResponder.innerHTML = "Responder"

                botonResponder.idPregunta = Data.preguntas[i].idPregunta;
                 
                console.log(botonResponder.idPregunta);

                botonResponder.addEventListener("click",function(button){
                  
                   // console.log(button.target.idPregunta);
                   // console.log(document.getElementById("respuesta-"+button.target.idPregunta).value);
                    Responder(button.target.idPregunta,token);
                });

                document.getElementById("button-"+ Data.preguntas[i].idPregunta).appendChild(botonResponder);
            }
        }
        
        
        
        
        
  })
}
function Responder(idPregunta,token){
   
    var url = "https://localhost:7076/api/MainLeccion/ResponderPregunta";
    fetch(url, {
        method: "PUT",
        body: JSON.stringify({
            idPregunta: idPregunta,
            duda: "",
            respuesta: document.getElementById("respuesta-"+idPregunta).value,
            idLeccion: 0,
            idUsuario: 0
        }
        ),
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json",
            'Authorization': 'Bearer ' + token
        }
    }).then(function(response){
        if(response.ok){
            alert("sdfdsfds")
            return response.json();
        }else{
            alert("Error al ejecutar solicitud")

        }
  }).then(function(){
    alert("11111")
  })

}
  

  obtenerToken();