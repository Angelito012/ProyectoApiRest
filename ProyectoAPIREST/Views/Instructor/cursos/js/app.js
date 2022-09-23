var datos = JSON.parse(localStorage.getItem('curso'));
var email = getCookie('email');
// localStorage.clear();
OpenEdit();

function OpenEdit(){
    document.getElementById('codigo').value = datos.Idcurso;
    document.getElementById('nombre').value = datos.nombre;
    document.getElementById('descripcion').value = datos.descripcion;
    document.getElementById('duracion').value = datos.duracion;
    document.getElementById('estado').value = datos.estado;
    document.getElementById('costo').value = datos.costo;
}

var boton = document.getElementById('enviar');

boton.addEventListener('click', () => {
    obtenerToken();
})

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
        ActualizarDatos(Data.token)
    })
}

function ActualizarDatos(token){
    var url = "https://localhost:7076/api/MainCursos/EditarCurso";
    fetch(url, {
        method: "PUT",
        body: JSON.stringify({
            idCurso: document.getElementById('codigo').value,        
            nombre: document.getElementById('nombre').value,        
            descripcion: document.getElementById('descripcion').value,        
            duracion: document.getElementById('duracion').value,        
            costo: document.getElementById('costo').value,        
            estado: document.getElementById('estado').value,        
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json",
            'Authorization': 'Bearer ' + token
        }
    }).then(function(response){
        if(response.ok){
            return response;
        }else{
            alert("Error al ejecutar solicitud")
        }
    }).then(function(Data){
        alert('Curso Editado')
        location.href = '/Instructor/VerCursos.html';
    })
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
