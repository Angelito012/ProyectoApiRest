var noFactura = document.querySelector('noFactura');
var fecha = document.querySelector('fecha');
var total = document.querySelector('total');
var cliente = document.querySelector('cliente');
var tablaDetalle = document.querySelector('tablaDetalle');

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
    })
}

//LEER DETALLE DE LA FACTURA
function leerFactura(){

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

//MANEJO DE LOCALSTORAGE
localStorage.setItem("factura",1)
var factura = localStorage.getItem('factura')