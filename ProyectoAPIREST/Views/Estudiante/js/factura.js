var noFactura = document.getElementById('noFactura');
var fecha = document.getElementById('fecha');
var total = document.getElementById('total');
var cliente = document.getElementById('cliente');
var tablaDetalle = document.getElementById('tablaDetalle');
var detalle = document.getElementById('tablaDetalle');
var foot = document.querySelector('tfoot');
var email = getCookie('email'); 

var DatosEstudianteCarrito = JSON.parse(localStorage.getItem('estudiante'));


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
obtenerToken();

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
        leerFactura(tokenValido);
    })
}

//LEER DETALLE DE LA FACTURA
function leerFactura(token){
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
        detalle.innerHTML = "";
        noFactura.value = Data.noFactura;
        fecha.value = Data.fecha;
        total.value = Data.total;
        cliente.value = Data.nombre;
        for(i=0; i<Data.detalle.length; i++){
            let fila = document.createElement('tr');
            let codigo = document.createElement('td');
            let curso = document.createElement('td');
            let totalDetalle = document.createElement('td');

            // if(i % 2 > 0){
            //     fila.classList.add('active-row');
            // }

            codigo.innerText = Data.detalle[i].idCurso;
            fila.appendChild(codigo);

            curso.innerText = Data.detalle[i].nombre;
            fila.appendChild(curso);

            totalDetalle.innerText = Data.detalle[i].precioactual;
            fila.appendChild(totalDetalle);

            detalle.appendChild(fila);
        }

        let fila = document.createElement('tr');

        let footTitulo = document.createElement('td');
        footTitulo.innerHTML = "TOTAL";

        let footCurso = document.createElement('td');

        let footTotal = document.createElement('td');
        footTotal.innerHTML = Data.total;

        fila.appendChild(footTitulo);
        fila.appendChild(footCurso);
        fila.appendChild(footTotal);
        foot.appendChild(fila);
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

//MANEJO DE LOCALSTORAGE
// localStorage.setItem("factura",1)
var factura = localStorage.getItem('factura')