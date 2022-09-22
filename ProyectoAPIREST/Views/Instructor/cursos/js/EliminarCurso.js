var datos = JSON.parse(localStorage.getItem('curso'));
var email = getCookie('email'); 
let card = document.getElementById("contenedor")
var totalEstudiante = 0;

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


function llenarInformacion(){
    document.getElementById('codigo').value = datos.Idcurso;
    document.getElementById('nombre').value = datos.nombre;
    document.getElementById('descripcion').value = datos.descripcion;
    document.getElementById('duracion').value = datos.duracion;
    document.getElementById('estado').value = datos.estado;
    document.getElementById('costo').value = datos.costo;
}

obtenerToken();
llenarInformacion();

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
        }
    }).then(function(Data){
        tokenValido = Data.token;
        validarCurso(tokenValido)
        ValidacionInstructor(tokenValido)
    })
}

function validarCurso(token){
    var url = "https://localhost:7076/api/MainCursos/ValidarCurso";
    fetch(url,{
        method: "POST",
        body: JSON.stringify({
            idCurso: datos.Idcurso,
            nombre: "string",
            descripcion: "string",
            duracion: "string",
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

function ValidacionInstructor(token){
    var url = "https://localhost:7076/api/MainInstructor/VerCursos";
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
            imagen.src = "/images/cursos.jpg";
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

            let estado = document.createElement('h5');
            estado.innerText = "Estado: " + Data[i].estado;
            estado.innerHTML += `<br><br>`;
            contenido_card.appendChild(estado);

            let costo = document.createElement('h5');
            costo.innerText = "Costo: " + Data[i].costo;
            costo.innerHTML += `<br>`
            contenido_card.appendChild(costo);

            newcard.appendChild(contenido_card);            
            card.appendChild(newcard);
        }
    })
}

var boton = document.getElementById('eliminar');

boton.addEventListener('click', () => {
    if(totalEstudiante > 0){
        alert('No se puede eliminar porque este curso ya ha sido comprado por ' + totalEstudiante + " estudiantes")
    }else{
        alert('Curso borrado')
    }
})