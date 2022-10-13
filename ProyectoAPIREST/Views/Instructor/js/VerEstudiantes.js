var idCurso = document.getElementById('idCurso');
var curso = document.getElementById('curso');
var profesor = document.getElementById('profesor');
var correo = document.getElementById('correo');
var precio = document.getElementById('precio');
var total = document.getElementById('total');
var estudiantes = document.getElementById('estudiantes');

var tablaDetalle = document.getElementById('tablaDetalle');
var email = getCookie('email'); 

//COOKIES
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

//OBTENER TOKEN
// obtenerToken();

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
        return response.json();
    }).then(function(Data){
        tokenValido = Data.token;
        leerEstudiantes(tokenValido);
    })
}

function leerEstudiantes(token){
    var url = "https://localhost:7076/api/controller/VerFactura";

    fetch(url,{
        method: "POST",
        body: JSON.stringify({
            noFactura: factura
        }),
        headers:{
            'Accept' : "application/json",
            "Content-Type":"application/json",
            'Authorization': 'Bearer ' + token
        }
    }).then(function(response){
        if(response.ok){
            return response.json();
        }else{
            aleatorio('Numero de factura no valido')
        }
    }).then(function(Data){
        for(i=0; i<Data.detalle.length; i++){
            let fila = document.createElement('tr');
            let Ccodigo = document.createElement('td');
            let CNombre = document.createElement('td');
            let Ccorreo = document.createElement('td');
            let Cfecha = document.createElement('td');
        }
    })
}

//COLOR DE FACTURA
var aleatorio = Math.floor(Math.random() * 8);
const style = document.documentElement.style;

if(aleatorio === 0){
    style.setProperty('--main', '#c4e17f');
}else if(aleatorio === 2){
    style.setProperty('--main', '#fecf71');
}else if(aleatorio === 3){
    style.setProperty('--main', '#f0776c');
}else if(aleatorio === 4){
    style.setProperty('--main', '#db9dbe');
}else if(aleatorio === 5){
    style.setProperty('--main', '#c49cde');
}else if(aleatorio === 6 || aleatorio === 1){
    style.setProperty('--main', '#669ae1');
}else if(aleatorio === 7){
    style.setProperty('--main', '#62c2e4');
}

var InformacionCurso = {
    idCurso : 6,
    curso : "Matematicas",
    profesor : "Giancarlo Loarca",
    correo : "giancarlo@gmail.com",
    precio : 200,
    total : 1000,
    estudiantes : 5
};

localStorage.setItem("curso",JSON.stringify(InformacionCurso))
var factura = JSON.parse(localStorage.getItem('curso'))
console.log(factura)

prueba()

function prueba(){
    idCurso.value = factura.idCurso;
    curso.value = factura.curso;
    profesor.value = factura.profesor;
    correo.value = factura.correo;
    precio.value = factura.precio;
    total.value = factura.total;
    estudiantes.value = factura.estudiantes;
}