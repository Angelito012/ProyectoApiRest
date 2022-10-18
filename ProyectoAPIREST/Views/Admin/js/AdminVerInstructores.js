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
		Get(tokenValido);
		var h2 = document.getElementById('nombre');
        h2.innerText = datosadmin.nombre
    })
	
}



	var url ="https://25.60.14.37:80/api/AdminPantalla/Instructor";
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
			var headBanco = document.createElement("th")
			var headTipo = document.createElement("th")
			var headNumenro = document.createElement("th")



			var textoID = document.createTextNode( "ID");
			var textoNombre = document.createTextNode( "Nombre");
			var textoApellido = document.createTextNode( "Apellido");
			var textoCorreo = document.createTextNode( "Correo");
     		var textoTelefono = document.createTextNode( "Telefono");
			var textoEstado = document.createTextNode("Estado");
			var textoBanco = document.createTextNode("Banco");
			var textoTipo = document.createTextNode("Tipo Cuenta");
			var textoNumenro = document.createTextNode("No. Cuenta");


			headID.appendChild(textoID);
			headNombre.appendChild(textoNombre)
			headApellido.appendChild(textoApellido)
			headCorreo.appendChild(textoCorreo)
			headTelefono.appendChild(textoTelefono)
			headEstado.appendChild(textoEstado)
			headBanco.appendChild(textoBanco)
			headTipo.appendChild(textoTipo)
			headNumenro.appendChild(textoNumenro)


			hilera.appendChild(headID);
			hilera.appendChild(headNombre);
			hilera.appendChild(headApellido);
			hilera.appendChild(headCorreo);
			hilera.appendChild(headTelefono);
			hilera.appendChild(headEstado);
			hilera.appendChild(headBanco);
			hilera.appendChild(headTipo);
			hilera.appendChild(headNumenro);


			tblBody.appendChild(hilera);


			for(i=0;i < Data.length;i++){
				let divElement = document.createElement("div");
				let divSpan= document.createElement("span");
				let divApellido = document.createElement("Apellido");
				let divCorreo = document.createElement("Correo");
				let divTelefono = document.createElement("Telefono");
				let divEstado = document.createElement("Estado");
				let divRol = document.createElement("Rol");
				
				divElement.appendChild(divSpan);
				divElement.appendChild(divApellido);
				divElement.appendChild(divCorreo);
				divElement.appendChild(divTelefono);
				divElement.appendChild(divEstado);
				divElement.appendChild(divRol);
				var hilera = document.createElement("tr");//Tabla

				var celdaID = document.createElement("td");
				var celdaNombre = document.createElement("td");
				var celdaApelldio = document.createElement("td");
				var celdaCorreo = document.createElement("td");
				var celdaTelefono = document.createElement("td");
				var celdaEstado = document.createElement("td");
				var celdaBanco = document.createElement("td");
				var celdaTipo = document.createElement("td");
				var celdaCuenta = document.createElement("td");

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
				var textoBanco = document.createTextNode( Data[i].nombreBanco);
				var textoTipo = document.createTextNode( Data[i].tipoCuenta);
				var textoCuenta = document.createTextNode( Data[i].noCuenta);




				celdaID.appendChild(textoID);
				celdaNombre.appendChild(textoNombre)
				celdaApelldio.appendChild(textoApelldio)
				celdaCorreo.appendChild(textoCorreo)
				celdaTelefono.appendChild(textoTelefono)
        		celdaEstado.appendChild(textoEstado)
				celdaBanco.appendChild(textoBanco)
				celdaTipo.appendChild(textoTipo)
				celdaCuenta.appendChild(textoCuenta)



				hilera.appendChild(celdaID);
				hilera.appendChild(celdaNombre);
				hilera.appendChild(celdaApelldio);
				hilera.appendChild(celdaCorreo);
				hilera.appendChild(celdaTelefono);
        		hilera.appendChild(celdaEstado);
				hilera.appendChild(celdaBanco);
				hilera.appendChild(celdaTipo);
				hilera.appendChild(celdaCuenta);



				tblBody.appendChild(hilera);

				
				tblBody.classList.add("tbalaInstructor")
				
				headID.classList.add("claseInstructor1")
				headNombre.classList.add("claseInstructor1")
				headApellido.classList.add("claseInstructor1")
				headCorreo.classList.add("claseInstructor1")
				headTelefono.classList.add("claseInstructor1")
				headEstado.classList.add("claseInstructor1")
				headBanco.classList.add("claseInstructor1")
				headTipo.classList.add("claseInstructor1")
				headNumenro.classList.add("claseInstructor1")

				celdaID.classList.add("claseInstructor")
				celdaNombre.classList.add("claseInstructor")
				celdaApelldio.classList.add("claseInstructor")
				celdaCorreo.classList.add("claseInstructor") 
				celdaTelefono.classList.add("claseInstructor") 
				celdaEstado.classList.add("claseInstructor") 
				celdaBanco.classList.add("claseInstructor") 
				celdaCuenta.classList.add("claseInstructor") 
				celdaTipo.classList.add("claseInstructor") 
				
				hilera.classList.add("theadInstructor")

			}
			tabla.appendChild(tblBody);
			// appends <table> into <body>
			
			body.appendChild(tabla);
			// modifica el atributo "border" de la tabla y lo fija a "2";
     
     
		
      
      
      tabla.style.backgroundColor = "white";
      
    
      
	////////////////////////////////////////////////////////		
// Crea un elemento <table> y un elemento <tbody>

/////////////////////////
		})

	}

	function Delete(Id){
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				id: Id,
				nombre: "",
				fechaInicio: "",
				horaInicio: "",
				valor: 0
			}),
			headers:{
				'Accept' : "application/json",
				"Content-Type":"application/json"
			}	
		}).then(function(response){
			if(response.ok){
				return response.text();
			}else{
				alert("Error al ejecutar la solicitud");
			}
		}).then(function(Data){
			
			console.log(Data);
			Get();
		})

	}


	function Edit(Id){
		fetch(url,{
			method: "POST",
			body: JSON.stringify({
				id: Id,
			}),
			headers:{
				'Accept' : "application/json",
				"Content-Type": "application/json"
			}
			}).then(function(response){
				if(response.ok){
					return response.text();
				}else{
					alert("Error al ejecutar la solicitud");
				}
			}).then(function(Data){

			
			})
		}
		

