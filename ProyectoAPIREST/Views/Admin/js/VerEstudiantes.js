var idCurso = document.getElementById('idCurso');
var curso = document.getElementById('curso');
var profesor = document.getElementById('profesor');
var correo = document.getElementById('correo');
var precioProfesor = document.getElementById('precioProfesor');
var totalProfesor = document.getElementById('totalProfesor');
var estudiantes = document.getElementById('estudiantes');
var precioVenta = document.getElementById('precioVenta');
var totalVenta = document.getElementById('totalVenta');
var ganancias = document.getElementById('ganancias');

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
        leerEstudiantes(tokenValido);
    })
}

function leerEstudiantes(token){
    var url = "https://localhost:7076/api/IngresoPorCurso/ListadoEstudiantes";

    fetch(url,{
        method: "POST",
        body: JSON.stringify({
            idCurso: factura.idCurso
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
        console.log(Data)
        for(i=0; i<Data.length; i++){
            let fila = document.createElement('tr');
            let Cno = document.createElement('td');
            let Ccodigo = document.createElement('td');
            let CNombre = document.createElement('td');
            let Ccorreo = document.createElement('td');
            let Cfecha = document.createElement('td');

            Cno.innerText = i + 1;
            fila.appendChild(Cno);

            Ccodigo.innerText = Data[i].idUsuario;
            fila.appendChild(Ccodigo);

            CNombre.innerText = Data[i].nombre;
            fila.appendChild(CNombre);

            Ccorreo.innerText = Data[i].correo;
            fila.appendChild(Ccorreo);

            Cfecha.innerText = Data[i].fecha;
            fila.appendChild(Cfecha);

            tablaDetalle.appendChild(fila);
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

// var InformacionCurso = {
//     idCurso : 6,
//     curso : "Matematicas",
//     profesor : "Giancarlo Loarca",
//     correo : "giancarlo@gmail.com",
//     precioProfesor : 200,
//     totalProfesor : 1000,
//     estudiantes : 5,
//     precioVenta : 300,
//     totalVenta: 1500,
//     ganancias: 500
// };

// localStorage.setItem("curso",JSON.stringify(InformacionCurso))
var factura = JSON.parse(localStorage.getItem('curso'))
console.log(factura)

prueba()

function prueba(){
    idCurso.value = factura.idCurso;
    curso.value = factura.curso;
    profesor.value = factura.profesor;
    correo.value = factura.correo;
    precioProfesor.value = factura.precioProfesor;
    totalProfesor.value = factura.totalProfesor;
    estudiantes.value = factura.estudiantes;
    precioVenta.value = factura.precioVenta;
    totalVenta.value = factura.totalVenta;
    ganancias.value = factura.ganancias;
}