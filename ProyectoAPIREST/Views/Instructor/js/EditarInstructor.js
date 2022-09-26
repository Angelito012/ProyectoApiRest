var email = getCookie('email'); 
var datos = JSON.parse(localStorage.getItem('instructor'));
var boton = document.getElementById('submitButton');
var btnLogout = document.getElementById('btnLogout');

MostrarDatos();

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

boton.addEventListener('click', () => {
    obtenerToken();
})

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    location.href="../index.html";
}

function MostrarDatos(){
    document.getElementById('inputId').value = datos.idUsuario;
    document.getElementById('inputNombre').value = datos.nombre;
    document.getElementById('inputApellido').value = datos.apellido;
    document.getElementById('inputCorreo').value = datos.correo;
    document.getElementById('inputContraseña').value = datos.contraseña;
    document.getElementById('inputTelefono').value = datos.telefono;
    document.getElementById('inputEstado').value = datos.estado;
    document.getElementById('inputRol').value = datos.rol;
    document.getElementById('inputExperiencia').value = datos.experiencia;
    document.getElementById('inputCertificaciones').value = datos.certificaciones;
    document.getElementById('inputNombreBanco').value = datos.nombreBanco;
    document.getElementById('inputNombreCuenta').value = datos.nombreCuenta;
    document.getElementById('inputTipoCuenta').value = datos.tipoCuenta;
    document.getElementById('inputNoCuenta').value = datos.noCuenta;
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
        if (document.getElementById("inputNombre").value != "" && 
            document.getElementById("inputApellido").value != "" &&
            document.getElementById("inputCorreo").value != "" &&
            document.getElementById("inputContraseña").value != "" &&
            document.getElementById("inputTelefono").value != "" &&
            document.getElementById("inputExperiencia").value != "" &&
            document.getElementById("inputCertificaciones").value != "" &&
            document.getElementById("inputNombreBanco").value != "" &&
            document.getElementById("inputNombreCuenta").value != "" &&
            document.getElementById("inputTipoCuenta").value != "" &&
            document.getElementById("inputNoCuenta").value != ""
        ){
            EditarInstructor(Data.token);
        } else {
            alert('Todos los datos son necesarios, por favor intente de nuevo');
        }
    })
}
function validarDatos(e) {
    e.preventDefault();
    

}
function EditarInstructor(token){
    var url = "https://localhost:7076/api/MainInstructor/EditarInstructor";
    fetch(url,{
        method: "PUT",
        body: JSON.stringify({
            idUsuario: document.getElementById('inputId').value,        
            nombre: document.getElementById('inputNombre').value,        
            apellido: document.getElementById('inputApellido').value,        
            correo: document.getElementById('inputCorreo').value,        
            contraseña: document.getElementById('inputContraseña').value,        
            telefono: document.getElementById('inputTelefono').value,   
            estado: document.getElementById('inputEstado').value,        
            rol: document.getElementById('inputRol').value,        
            experiencia: document.getElementById('inputExperiencia').value,        
            certificaciones: document.getElementById('inputCertificaciones').value,        
            nombreBanco: document.getElementById('inputNombreBanco').value,        
            nombreCuenta: document.getElementById('inputNombreCuenta').value,      
            tipoCuenta: document.getElementById('inputTipoCuenta').value,        
            noCuenta: document.getElementById('inputNoCuenta').value
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
        alert('Tus datos han sido editados correctamente')
        location.href = '/Instructor/MenuInstructor.html';
    })
}