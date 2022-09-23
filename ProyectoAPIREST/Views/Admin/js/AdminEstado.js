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
    })
	
}



	var url ="https://localhost:7076/api/AdminPantalla";
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
					var headRol = document.createElement("th")
					var textoID = document.createTextNode( "ID");
					var textoNombre = document.createTextNode( "Nombre");
					var textoApellido = document.createTextNode( "Apellido");
					var textoCorreo = document.createTextNode( "Correo");
					var textoTelefono = document.createTextNode( "Telefono");
					var textoEstado = document.createTextNode("Estado");
					var textoRol = document.createTextNode("Rol");
					headID.appendChild(textoID);
					headNombre.appendChild(textoNombre)
					headApellido.appendChild(textoApellido)
					headCorreo.appendChild(textoCorreo)
					headTelefono.appendChild(textoTelefono)
					headEstado.appendChild(textoEstado)
					headRol.appendChild(textoRol)
					headID.style.fontFamily = "Franklin Gothic Medium";
					headNombre.style.fontFamily = "Franklin Gothic Medium";
					headApellido.style.fontFamily = "Franklin Gothic Medium";
					headCorreo.style.fontFamily = "Franklin Gothic Medium";
					headTelefono.style.fontFamily = "Franklin Gothic Medium";
					headEstado.style.fontFamily = "Franklin Gothic Medium";
					headRol.style.fontFamily = "Franklin Gothic Medium";


					headID.style.fontSize = 'x-large';
					headNombre.style.fontSize = "x-large";
					headApellido.style.fontSize = "x-large";
					headCorreo.style.fontSize = "x-large";
					headTelefono.style.fontSize = "x-large";
					headEstado.style.fontSize = "x-large";
					headRol.style.fontSize = "x-large";

					hilera.appendChild(headID);
					hilera.appendChild(headNombre);
					hilera.appendChild(headApellido);
					hilera.appendChild(headCorreo);
					hilera.appendChild(headTelefono);
					hilera.appendChild(headEstado);
					hilera.appendChild(headRol);
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
						var celdaRol = document.createElement("td");
						var celdaUsuario = document.createElement("td");
						var celdaEliminar = document.createElement("td");
						var textoID = document.createTextNode( Data[i].idUsuario);
						var textoNombre = document.createTextNode( Data[i].nombre);
						var textoApelldio = document.createTextNode( Data[i].apellido);
						var textoCorreo = document.createTextNode( Data[i].correo);
						var textoTelefono = document.createTextNode( Data[i].telefono);
						var textoEstado = document.createTextNode( Data[i].estado);
						var textoRol = document.createTextNode( Data[i].rol);
						celdaID.appendChild(textoID);
						celdaNombre.appendChild(textoNombre)
						celdaApelldio.appendChild(textoApelldio)
						celdaCorreo.appendChild(textoCorreo)
						celdaTelefono.appendChild(textoTelefono)
						celdaEstado.appendChild(textoEstado)
						celdaRol.appendChild(textoRol)
						hilera.appendChild(celdaID);
						hilera.appendChild(celdaNombre);
						hilera.appendChild(celdaApelldio);
						hilera.appendChild(celdaCorreo);
						hilera.appendChild(celdaTelefono);
						hilera.appendChild(celdaEstado);
						hilera.appendChild(celdaRol);
						tblBody.appendChild(hilera);
						
						celdaID.style.fontFamily = "sans-serif";
						celdaNombre.style.fontFamily = "sans-serif";
						celdaApelldio.style.fontFamily = "sans-serif";
						celdaCorreo.style.fontFamily = "sans-serif";
						celdaTelefono.style.fontFamily = "sans-serif";
						celdaEstado.style.fontFamily = "sans-serif";
						celdaRol.style.fontFamily = "sans-serif";
						celdaEstado.style.textAlign = "center";

						celdaID.style.fontSize = 'x-large';
						celdaNombre.style.fontSize = "x-large";
						celdaApelldio.style.fontSize = "x-large";
						celdaCorreo.style.fontSize = "x-large";
						celdaTelefono.style.fontSize = "x-large";
						celdaEstado.style.fontSize = "x-large";
						celdaRol.style.fontSize = "x-large";






				
				let divBotonEliminar = document.createElement("button");
				let divBotonEditar = document.createElement("button");
				celdaUsuario.appendChild(divBotonEditar);
				celdaEliminar.appendChild(divBotonEliminar);				
				hilera.appendChild(celdaUsuario);
				hilera.appendChild(celdaEliminar);

				document.getElementById("divLista").appendChild(divElement);
				if(Data[i].estado === 'A'){
					divBotonEditar.innerHTML = "Habilitado";
					divBotonEditar.style.backgroundColor = 'Green';
					divBotonEditar.style.color = "White"
				}else{
					divBotonEditar.innerHTML = "Inhabilitado";
					divBotonEditar.style.backgroundColor = 'Red';
					divBotonEditar.style.color = "White"
				}
				divBotonEditar.MiID = Data[i].idUsuario;
                divBotonEditar.Estado = Data[i].estado;
        		divBotonEditar.style.fontFamily = "sans-serif";
				divBotonEditar.style.fontSize = "x-large";
				divBotonEditar.style.width = '150px';
				divBotonEditar.style.borderBlockColor = 'white';
				divBotonEditar.style.cursor = 'pointer';
				divBotonEditar.addEventListener("click",function(mibutton){
					console.log(mibutton.target.MiID,mibutton.target.Estado);
					Edit(
						mibutton.target.MiID,
						mibutton.target.Estado,
						token		
					);
				})
				divBotonEliminar.Correo = Data[i].correo;
				divBotonEliminar.innerHTML = "Eliminar";
				divBotonEliminar.style.fontFamily = "sans-serif";
				divBotonEliminar.style.fontSize = "x-large";
				divBotonEliminar.style.width = '150px';
				divBotonEliminar.style.backgroundColor = 'Red';
				divBotonEliminar.style.borderBlockColor = 'white';
				divBotonEliminar.style.color = 'white';
				divBotonEliminar.style.cursor = 'pointer';
				divBotonEliminar.addEventListener("click",function(mibutton){
					Delete(mibutton.target.Correo,
						   token
						);
				})

			}
			tabla.appendChild(tblBody);
			// appends <table> into <body>
			
			body.appendChild(tabla);
			// modifica el atributo "border" de la tabla y lo fija a "2";
      tabla.setAttribute("color-background", "white");
      tabla.setAttribute("border", "3");
			tabla.setAttribute("align", "center");
      tabla.setAttribute("text-shadow", "1px 1px 1px black");
      tabla.setAttribute("class", "tablaUsuarios");
      tabla.style.backgroundColor = "white";
      tabla.style.color = "black";
	  tabla.style.margin = "auto";
      tabla.style.margin = "25px 40px";
      tabla.style.fontSize = "0.9em";
      tabla.style.fontFamily = "sans-serif";
	  
    
      
	////////////////////////////////////////////////////////		
// Crea un elemento <table> y un elemento <tbody>

/////////////////////////
		})

	}

	function Delete(correo,token){
		var url ="https://localhost:7076/api/AdminPantalla/EliminarUsuario";
		fetch(url, {
			method: "DELETE",
			body: JSON.stringify({
				correo: correo,
				clave: ""
			}),
			headers:{
				'Accept' : "application/json",
				"Content-Type":"application/json",
				'Authorization': 'Bearer ' + token
			}	
		}).then(function(response){
			if(response.ok){
				return response.text();
			}else{
				alert("Error al ejecutar la solicitud");
			}
		}).then(function(Data){
			alert("El usuario ha sido eliminado correctamente")
			console.log(Data);
			Get(token);
		})

	}


	function Edit(Id,estado,token){
		fetch(url,{
			method: "PUT",
			body: JSON.stringify({
				"estado": estado,
				"idUsuario": Id
			}),
			headers:{
				'Accept' : "application/json",
				"Content-Type": "application/json",
				'Authorization': 'Bearer ' + token
			}
			}).then(function(response){
				if(response.ok){
					return response.text();
				}else{
					alert("Error al ejecutar la solicitud");
				}
			}).then(function(Data){
				
				console.log(Id,estado);
				Get(token);
			
			})
		}
		

