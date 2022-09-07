var url = "https://localhost:7076/api/Estudiantes";

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
        document.getElementById("inputNIT").value != "" &&
        document.getElementById("inputTarjetaCredito").value != ""
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
            NIT: document.getElementById("inputNIT").value,
            TarjetaCredito: document.getElementById("inputTarjetaCredito").value,
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json"
        }
    }).then(function(response){
        if(response.ok){
            alert("Estudiante agregado correctamente");
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
        document.getElementById("inputNIT").value="";
        document.getElementById("inputTarjetaCredito").value="";
    })
}