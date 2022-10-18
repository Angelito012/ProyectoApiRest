var url = "https://25.60.14.37:80/api/Instructor";

const submitButton = document.getElementById("submitButton");
const form = document.getElementById("form");

window.onload = () => {

    submitButton.addEventListener('click', validarDatos);
}
function validarDatos(e) {
    e.preventDefault();
    let validationEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    
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
        if(validationEmail.test(document.getElementById("inputCorreo").value)){
            crearUsuario();
        }else{
            alert('El correo es inválido')
        }
    } else {
        alert('Todos los datos son necesarios, por favor intente de nuevo');
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
            window.location.href = ('../index.html');
            return response.text();
        }else{
            alert("Este correo ya fue registrado")
        }
    }).then(function(Data){
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