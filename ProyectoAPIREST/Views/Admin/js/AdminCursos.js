var datosadmin = JSON.parse(localStorage.getItem('admin'));

window.addEventListener('load',(event) => {
    var rol = getCookie('rol');


    if(rol == ""){
        alert('Primero Ingrese sus credenciales')
        location.href="../index.html";
    }else if(rol != "Administrador"){
        alert('No tiene acceso a esta pagina')
        location.href="../index.html";
    }
})

var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click',salir);

function salir(){
    alert('Sesion cerrada')
    location.href="../index.html";
}



var email = getCookie('email'); 

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
		Get(tokenValido);
		var h2 = document.getElementById('nombre');
        h2.innerText = datosadmin.nombre
    })
	
}



	var url ="https://localhost:7076/api/AdminPantalla/CursosCompletos";
	obtenerToken();
	function Get(token){
		fetch(url,{
			method: "GET",
        headers:{
            'Accept' : "application/json",
            "Content-Type" : "application/json",
            'Authorization': 'Bearer ' + token
        }
		}).then(function(response){
			return response.json();
		}).then(function(Data){
			document.getElementById("divLista").innerHTML="";
			var body = document.getElementById("divLista");
			var tabla   = document.createElement("table");
			var tblBody = document.createElement("tbody");
			var hilera = document.createElement("tr")

			var headID = document.createElement("th")
			var headNombre = document.createElement("th")
			var headDescripcion = document.createElement("th")
			var headDuracion = document.createElement("th")
			var headCosto = document.createElement("th")
            var headPrecio = document.createElement("th")
			var headEstado = document.createElement("th")
			var headProfesor = document.createElement("th")
			
			var textoID = document.createTextNode( "ID");
			var textoNombre = document.createTextNode( "Nombre");
			var textoDescripcion = document.createTextNode( "Descripcion");
			var textoDuracion = document.createTextNode( "Duracion");
      		var textoCosto = document.createTextNode( "Costo");
            var textoPrecio = document.createTextNode("Precio");
			var textoEstado = document.createTextNode("Estado");
			var textoProfesor = document.createTextNode("Profesor");

			headID.appendChild(textoID);
			headNombre.appendChild(textoNombre)
			headDescripcion.appendChild(textoDescripcion)
			headDuracion.appendChild(textoDuracion)
			headCosto.appendChild(textoCosto)
            headPrecio.appendChild(textoPrecio)
			headEstado.appendChild(textoEstado)
			headProfesor.appendChild(textoProfesor)
			
			hilera.appendChild(headID);
			hilera.appendChild(headNombre);
			hilera.appendChild(headDescripcion);
			hilera.appendChild(headDuracion);
			hilera.appendChild(headCosto);
			hilera.appendChild(headPrecio);
			hilera.appendChild(headEstado);
			hilera.appendChild(headProfesor);

			tblBody.appendChild(hilera);
			for(i=0;i < Data.length;i++){
				let divElement = document.createElement("div");
				let divSpan= document.createElement("span");
				let divDescripcion = document.createElement("Descripcion");
				let divDuracion = document.createElement("Duracion");
				let divCosto = document.createElement("Costo");
				let divPrecio = document.createElement("Precio");
                let divEstado = document.createElement("Estado");
				let divProfesor = document.createElement("Profesor");
				
				divElement.appendChild(divSpan);
				divElement.appendChild(divDescripcion);
				divElement.appendChild(divDuracion);
				divElement.appendChild(divCosto);
				divElement.appendChild(divPrecio);
				divElement.appendChild(divEstado);
				divElement.appendChild(divProfesor);
				var hilera = document.createElement("tr");//Tabla

				var celdaID = document.createElement("td");
				var celdaNombre = document.createElement("td");
				var celdaDescripcion = document.createElement("td");
                var celdaDuracion = document.createElement("td");
				var celdaCosto = document.createElement("td");
				var celdaPrecio = document.createElement("td");
				var celdaEstado = document.createElement("td");
				var celdaProfesor = document.createElement("td");

				var textoID = document.createTextNode( Data[i].idCurso);
				var textoNombre = document.createTextNode( Data[i].nombre);
				var textoDescripcion = document.createTextNode( Data[i].descripcion);
				var textoDuracion = document.createTextNode( Data[i].duracion);
				var textoCosto = document.createTextNode( Data[i].costo);
                var textoPrecio = document.createTextNode( Data[i].precio);
				if(Data[i].estado == "A"){
					var textoEstado = document.createTextNode("Activo")
				}else{
					var textoEstado = document.createTextNode("Inactivo")
				}
                var textoProfesor = document.createTextNode( Data[i].profesor);
				
				celdaID.appendChild(textoID);
				celdaNombre.appendChild(textoNombre)
				celdaDescripcion.appendChild(textoDescripcion)
				celdaDuracion.appendChild(textoDuracion)
				celdaCosto.appendChild(textoCosto)
                celdaPrecio.appendChild(textoPrecio)
        		celdaEstado.appendChild(textoEstado)
				celdaProfesor.appendChild(textoProfesor)

				hilera.appendChild(celdaID);
				hilera.appendChild(celdaNombre);
				hilera.appendChild(celdaDescripcion);
				hilera.appendChild(celdaDuracion);
				hilera.appendChild(celdaCosto);
                hilera.appendChild(celdaPrecio);
        		hilera.appendChild(celdaEstado);
				hilera.appendChild(celdaProfesor);

				
				tblBody.appendChild(hilera);
        		


				tblBody.classList.add("claseTabla")
				headProfesor.classList.add("nombreClass2")
				headID.classList.add("nombreClass2")
				headNombre.classList.add("nombreClass2")
				headDescripcion.classList.add("nombreClass2")
				headDuracion.classList.add("nombreClass2")
				headCosto.classList.add("nombreClass2")
				headEstado.classList.add("nombreClass2")
				headPrecio.classList.add("nombreClass2")

				celdaID.classList.add("nombreClass")
				celdaNombre.classList.add("nombreClass")
				celdaDescripcion.classList.add("nombreClass")
				celdaDuracion.classList.add("nombreClass") 
				celdaCosto.classList.add("nombreClass") 
				celdaPrecio.classList.add("nombreClass") 
				celdaEstado.classList.add("nombreClass")
				celdaProfesor.classList.add("nombreClass")
				hilera.classList.add("theadJs")
				
				

				document.getElementById("divLista").appendChild(divElement);

			}
			tabla.appendChild(tblBody);
			// appends <table> into <body>
			
			body.appendChild(tabla);
			// modifica el atributo "border" de la tabla y lo fija a "2";
			
			

      
	////////////////////////////////////////////////////////		
// Crea un elemento <table> y un elemento <tbody>

/////////////////////////
		})

	}

