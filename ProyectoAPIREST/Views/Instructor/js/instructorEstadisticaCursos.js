

var email = getCookie('email'); 

let card = document.getElementById("contenedor")


window.addEventListener('load',(event) => { 
    if(rol == ""){
        alert('Primero Ingrese sus credenciales')
        location.href="../index.html";
    }else if(rol != "Instructor"){
        alert('No tiene acceso a esta pagina')
        location.href="../index.html";
    }
})

var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
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
		obtenerEstadisticas(tokenValido);
    })
	
}

var url ="https://localhost:7076/api/estadisticaCurso/EstadisticaCursoInstructor";

obtenerToken();

function obtenerEstadisticas(token){
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            correo: email
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
            console.log(Data)
            if(Data.length > 0){
                card.innerHTML = "";
                for(i=0; i<Data.length; i++){
                    let newcard = document.createElement('div');
                    newcard.classList.add('card');
        
                    let figure = document.createElement('figure');
                    let imagen = document.createElement('img');
                    imagen.src = "../images/estadistica.jpg";
                    figure.appendChild(imagen);
                    newcard.appendChild(figure);
        
                    let contenido_card = document.createElement('div');
                    contenido_card.classList.add('contenido-card');
        
                    let nombre = document.createElement('h3');
                    nombre.innerText = Data[i].nombreCurso;
                    contenido_card.appendChild(nombre);
        
                    let descripcion = document.createElement('p');
                    descripcion.innerText = Data[i].descripcion;
                    descripcion.innerHTML += `<hr>`;
                    contenido_card.appendChild(descripcion);
        
                    let duracion = document.createElement('h5');
                    duracion.innerText = "Duracion: " + Data[i].duracion +" Minutos";
                    duracion.innerHTML += `<br><br>`;
                    contenido_card.appendChild(duracion);
        
                    let cantidadEstudiantes = document.createElement('h3');
                    cantidadEstudiantes.innerText = "Cantidad Estudiantes: " + Data[i].cantidadEstudiantes;
                    cantidadEstudiantes.innerHTML += `<br>`;
                    contenido_card.appendChild(cantidadEstudiantes);
        
                    newcard.appendChild(contenido_card);            
                    card.appendChild(newcard);

                    }
                    
                }
           
        })
    }
