var url = "https://localhost:7076/api/Instructor";

const submitButton = document.getElementById("submitButton");
const form = document.getElementById("form");

window.onload = () => {

    submitButton.addEventListener('click', validarDatos);
}
function validarDatos(e) {
    e.preventDefault();

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
    ) {
        crearUsuario();
    } else {
        alert('Error de conexión, Todos los datos son necesarios');
    }
}
function crearUsuario(){
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            Nombre: document.getElementById("inputNombre").value,
            Apellido: document.getElementById("inputApellido").value,
            Correo: document.getElementById("inputCorreo").value,
            Contraseña: document.getElementById("inputContraseña").value,
            Telefono: document.getElementById("inputTelefono").value, 
            Experiencia: document.getElementById("inputExperiencia").value,
            Certificaciones: document.getElementById("inputCertificaciones").value,
            NombreBanco: document.getElementById("inputNombreBanco").value,
            NombreCuenta: document.getElementById("inputNombreCuenta").value,
            TipoCuenta: document.getElementById("inputTipoCuenta").value,
            NoCuenta: document.getElementById("inputNoCuenta").value,
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json"
        }
    }).then(function(response){
        if(response.ok){
            alert("Instructor agregado correctamente");
            return response.text();
        }else{
            alert("Este correo ya fue registrado")
        }
    }).then(function(Data){
        console.log(Data);
        document.getElementById("inputNombre").value="";
        document.getElementById("inputApellido").value="";
        document.getElementById("inputCorreo").value="";
        document.getElementById("inputContraseña").value="";
        document.getElementById("inputTelefono").value="";
        document.getElementById("inputExperiencia").value="";
        document.getElementById("inputCertificaciones").value="";
        document.getElementById("inputNombreBanco").value="";
        document.getElementById("inputNombreCuenta").value="";
        document.getElementById("inputTipoCuenta").value="";
        document.getElementById("inputNoCuenta").value="";
    })
}