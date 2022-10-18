var url = "https://25.60.14.37:80/api/controller/VerFacturas";
var email = getCookie('email'); 
let card = document.getElementById("contenedor")
var DatosEstudianteCarrito = JSON.parse(localStorage.getItem('estudiante'));
var rol = getCookie('rol');
window.addEventListener('load',(event) => {
    var rol = getCookie('rol');
    var email = getCookie('email'); 

    if(rol == ""){
        alert('Primero Ingrese sus credenciales')
        location.href="../index.html";
    }else if(rol != "Estudiante"){
        alert('No tiene acceso a esta pagina')
        location.href="../index.html";
    }
})

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
    var url = "https://25.60.14.37:80/api/Autenticacion/Validar";

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
        obtenerFacturas(tokenValido);
        var h2 = document.getElementById('nombre');
        h2.innerText = DatosEstudianteCarrito.nombre
    })

}

var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    location.href="../index.html";
    localStorage.clear();
}

function obtenerFacturas(token){
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            correo: email,
            clave: ""          
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
            
            console.log(Data)
            let newcard = document.createElement('div');
            newcard.classList.add('card');

            let figure = document.createElement('figure');
            let imagen = document.createElement('img');
            imagen.src = "../images/facturas.jpg";
            figure.appendChild(imagen);
            newcard.appendChild(figure);

            let contenido_card = document.createElement('div');
            contenido_card.classList.add('contenido-card');

            let noFactura = document.createElement('h5');
            let label_NoFactura = document.createElement('label')
            label_NoFactura.innerText = "No. Factura: ";
            noFactura.innerHTML = Data[i].noFactura;
            noFactura.innerHTML += `<hr>`;
            contenido_card.appendChild(label_NoFactura)
            contenido_card.appendChild(noFactura);

            let nombre = document.createElement('h5');
            let label_nombre = document.createElement('label')
            label_nombre.innerText = "Cliente: ";
            nombre.innerText = Data[i].nombre;
            contenido_card.appendChild(label_nombre);
            contenido_card.appendChild(nombre);

            let fecha = document.createElement('h5');
            let label_fecha = document.createElement('label')
            label_fecha.innerText = "Fecha: ";
            fecha.innerText = Data[i].fecha;
            contenido_card.appendChild(label_fecha)
            contenido_card.appendChild(fecha);

            let total = document.createElement('h5');
            let label_total = document.createElement('label')
            label_total.innerText = "Total: ";
            total.innerText = "Q " + Data[i].total;
            nombre.innerHTML += `<br>`
            contenido_card.appendChild(label_total);
            contenido_card.appendChild(total);

            let botonVerDetalle = document.createElement("button");
            botonVerDetalle.NoFactura = Data[i].noFactura;
            botonVerDetalle.Nombre = Data[i].nombre;
            botonVerDetalle.Fecha = Data[i].fecha;
            botonVerDetalle.Total = Data[i].total;
            botonVerDetalle.classList.add('btn');
            botonVerDetalle.className += " btn-info"
            botonVerDetalle.innerHTML = "Ver Detalle"
            botonVerDetalle.addEventListener("click",function(boton){
                guardarDatos(boton.target.NoFactura,
                            boton.target.Nombre,
                            boton.target.Fecha,
                            boton.target.Total);
                location.href = "../Estudiante/InformeDetalle.html" 
            })
            contenido_card.appendChild(botonVerDetalle);
            


            newcard.appendChild(contenido_card);            
            card.appendChild(newcard);
        }
    })
}
function guardarDatos(noFactura,nombre,fecha,total){
    var InformacionFactura = {
        NoFactura : noFactura,
        Nombre: nombre,
        Fecha: fecha,
        Total: total
    };
    console.log(InformacionFactura)
    localStorage.setItem("Facturas",JSON.stringify(InformacionFactura))
    
}

obtenerToken();