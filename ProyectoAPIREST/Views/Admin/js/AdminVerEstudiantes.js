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

    if(email != ""){
        var h2 = document.getElementById('name');
        
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



	var url ="https://localhost:7076/api/AdminPantalla/Estudiante";
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
			var headApellido = document.createElement("th")
			var headCorreo = document.createElement("th")
			var headTelefono = document.createElement("th")
			var headEstado = document.createElement("th")
			var headTarjeta = document.createElement("th")
			var headNIT = document.createElement("th")
			
			var textoID = document.createTextNode( "ID");
			var textoNombre = document.createTextNode( "Nombre");
			var textoApellido = document.createTextNode( "Apellido");
			var textoCorreo = document.createTextNode( "Correo");
      		var textoTelefono = document.createTextNode( "Telefono");
			var textoEstado = document.createTextNode("Estado");
			var textoTarjeta = document.createTextNode("Tarjeta de Credito");
			var textoNIT = document.createTextNode("NIT");
			headID.appendChild(textoID);
			headNombre.appendChild(textoNombre)
			headApellido.appendChild(textoApellido)
			headCorreo.appendChild(textoCorreo)
			headTelefono.appendChild(textoTelefono)
			headEstado.appendChild(textoEstado)
			headTarjeta.appendChild(textoTarjeta)
			headNIT.appendChild(textoNIT)
			
			hilera.appendChild(headID);
			hilera.appendChild(headNombre);
			hilera.appendChild(headApellido);
			hilera.appendChild(headCorreo);
			hilera.appendChild(headTelefono);
			hilera.appendChild(headEstado);
			hilera.appendChild(headTarjeta);
			hilera.appendChild(headNIT);
			tblBody.appendChild(hilera);
			for(i=0;i < Data.length;i++){
				let divElement = document.createElement("div");
				let divSpan= document.createElement("span");
				let divApellido = document.createElement("Apellido");
				let divCorreo = document.createElement("Correo");
				let divTelefono = document.createElement("Telefono");
				let divEstado = document.createElement("Estado");
				let divTarjeta = document.createElement("Tarjeta");
				let divNIT = document.createElement("NIT");
				
				divElement.appendChild(divSpan);
				divElement.appendChild(divApellido);
				divElement.appendChild(divCorreo);
				divElement.appendChild(divTelefono);
				divElement.appendChild(divEstado);
				divElement.appendChild(divTarjeta);
				divElement.appendChild(divNIT);
				var hilera = document.createElement("tr");//Tabla

				var celdaID = document.createElement("td");
				var celdaNombre = document.createElement("td");
				var celdaApelldio = document.createElement("td");
				var celdaCorreo = document.createElement("td");
				var celdaTelefono = document.createElement("td");
				var celdaEstado = document.createElement("td");
				var celdaTarjeta = document.createElement("td");
				var celdaNIT = document.createElement("td");

				var textoID = document.createTextNode( Data[i].idUsuario);
				var textoNombre = document.createTextNode( Data[i].nombre);
				var textoApelldio = document.createTextNode( Data[i].apellido);
				var textoCorreo = document.createTextNode( Data[i].correo);
				var textoTelefono = document.createTextNode( Data[i].telefono);
				if(Data[i].estado == "A"){
					var textoEstado = document.createTextNode("Activo")
				}else{
					var textoEstado = document.createTextNode("Inactivo")
				}
				var textoTarjeta = document.createTextNode( Data[i].tarjetaCredito);
				var textoNIT = document.createTextNode( Data[i].nit);
				
				celdaID.appendChild(textoID);
				celdaNombre.appendChild(textoNombre)
				celdaApelldio.appendChild(textoApelldio)
				celdaCorreo.appendChild(textoCorreo)
				celdaTelefono.appendChild(textoTelefono)
        		celdaEstado.appendChild(textoEstado)
				celdaTarjeta.appendChild(textoTarjeta)
				celdaNIT.appendChild(textoNIT)

				hilera.appendChild(celdaID);
				hilera.appendChild(celdaNombre);
				hilera.appendChild(celdaApelldio);
				hilera.appendChild(celdaCorreo);
				hilera.appendChild(celdaTelefono);
        		hilera.appendChild(celdaEstado);
				hilera.appendChild(celdaTarjeta);
				hilera.appendChild(celdaNIT);

				
				tblBody.appendChild(hilera);
        		


				tblBody.classList.add("claseTabla")
				headTarjeta.classList.add("nombreClass2")
				headID.classList.add("nombreClass2")
				headNombre.classList.add("nombreClass2")
				headApellido.classList.add("nombreClass2")
				headCorreo.classList.add("nombreClass2")
				headTelefono.classList.add("nombreClass2")
				headEstado.classList.add("nombreClass2")
				headNIT.classList.add("nombreClass2")
				celdaID.classList.add("nombreClass")
				celdaNombre.classList.add("nombreClass")
				celdaApelldio.classList.add("nombreClass")
				celdaCorreo.classList.add("nombreClass") 
				celdaTelefono.classList.add("nombreClass") 
				celdaEstado.classList.add("nombreClass") 
				celdaTarjeta.classList.add("nombreClass")
				celdaNIT.classList.add("nombreClass")
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


