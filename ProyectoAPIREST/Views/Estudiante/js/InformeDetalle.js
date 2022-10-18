var tablaDetalle = document.getElementById('tablaDetalle');
var detalle = document.getElementById('tablaDetalle');
var foot = document.querySelector('tfoot');
var email = getCookie('email'); 
var factura = JSON.parse(localStorage.getItem('Facturas'))
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
MostrarDatos();

function MostrarDatos(){
    document.getElementById('noFactura').value = factura.NoFactura;
    document.getElementById('cliente').value = factura.Nombre
    document.getElementById('fecha').value = factura.Fecha;
    document.getElementById('total').value = factura.Total;
}

//OBTENER TOKEN
obtenerToken();

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
        return response.json();
    }).then(function(Data){
        tokenValido = Data.token;
        MostrarFactura(tokenValido);
        var h2 = document.getElementById('nombre');
        h2.innerText = DatosEstudianteCarrito.nombre
    })
}

//LEER DETALLE DE LA FACTURA
function MostrarFactura(token){
    var url = "https://25.60.14.37:80/api/controller/VerDetalle";

    fetch(url,{
        method: "POST",
        body: JSON.stringify({
            noFactura: factura.NoFactura
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
        for(i=0; i<Data.length; i++){
            let fila = document.createElement('tr');
            let codigo = document.createElement('td');
            let curso = document.createElement('td');
            let totalDetalle = document.createElement('td');

            // if(i % 2 > 0){
            //     fila.classList.add('active-row');
            // }

            codigo.innerText = Data[i].idCurso;
            fila.appendChild(codigo);

            curso.innerText = Data[i].nombre;
            fila.appendChild(curso);

            totalDetalle.innerText = Data[i].precioactual;
            fila.appendChild(totalDetalle);

            detalle.appendChild(fila);
        }

        let fila = document.createElement('tr');

        let footTitulo = document.createElement('td');
        footTitulo.innerHTML = "TOTAL";

        let footCurso = document.createElement('td');

        let footTotal = document.createElement('td');
        footTotal.innerHTML = factura.Total;

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

