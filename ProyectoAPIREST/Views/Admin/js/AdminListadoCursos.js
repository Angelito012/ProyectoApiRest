var tablaDetalle = document.getElementById('tablaDetalle');
var detalle = document.getElementById('tablaDetalle');
var foot = document.querySelector('tfoot');
var email = getCookie('email'); 
var Estudiante = JSON.parse(localStorage.getItem('InformeEstudiante'))

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
    document.getElementById('codigo').value = Estudiante.IdUsuario;
    document.getElementById('estudiante').value = Estudiante.Estudiante;
    document.getElementById('cursos').value = Estudiante.Cursos;
    document.getElementById('gasto').value = Estudiante.Gasto;
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
        MostrarCursos(tokenValido);
    })
}

//LEER DETALLE DE LA FACTURA
function MostrarCursos(token){
    var url = "https://localhost:7076/api/ReporteEstudiantes/EstudianteCurso";

    fetch(url,{
        method: "POST",
        body: JSON.stringify({
            idUsuario: Estudiante.IdUsuario
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
            aleatorio('Código de estudiante no válido')
        }
    }).then(function(Data){
        detalle.innerHTML = "";
        for(i=0; i<Data.length; i++){
            let fila = document.createElement('tr');
            let codigo = document.createElement('td');
            let curso = document.createElement('td');
            let precio = document.createElement('td');
            let duracion = document.createElement('td');
            let lecciones = document.createElement('td');

            // if(i % 2 > 0){
            //     fila.classList.add('active-row');
            // }

            codigo.innerText = Data[i].idCurso;
            fila.appendChild(codigo);

            curso.innerText = Data[i].nombre;
            fila.appendChild(curso);

            precio.innerText = Data[i].precio;
            fila.appendChild(precio);

            duracion.innerText = Data[i].duracion;
            fila.appendChild(duracion);

            lecciones.innerText = Data[i].lecciones;
            fila.appendChild(lecciones);

            detalle.appendChild(fila);
        }
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