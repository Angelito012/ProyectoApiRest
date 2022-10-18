var datosadmin = JSON.parse(localStorage.getItem('admin'));


var urlEdit = "https://25.60.14.37:80/api/AdminPantalla/EstadoCursos"
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



	var url ="https://25.60.14.37:80/api/AdminPantalla/GetCursos";
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
					var headEstado = document.createElement("th")

					var btnEliminar = document.createElement("th")
					btnEliminar.colSpan= "2";

					var textoID = document.createTextNode( "ID");
					var textoNombre = document.createTextNode( "Nombre");
					var textoDescripcion = document.createTextNode( "Descripcion");
					var textoEstado = document.createTextNode("Estado");

					headID.appendChild(textoID);
					headNombre.appendChild(textoNombre)
					headDescripcion.appendChild(textoDescripcion)
					headEstado.appendChild(textoEstado)


					

					hilera.appendChild(headID);
					hilera.appendChild(headNombre);
					hilera.appendChild(headDescripcion);
					hilera.appendChild(headEstado);
					hilera.appendChild(btnEliminar);
					tblBody.appendChild(hilera);
					for(i=0;i < Data.length;i++){
						let divElement = document.createElement("div");
						let divSpan= document.createElement("span");
						let divDescripcion = document.createElement("Descripcion");
						let divEstado = document.createElement("Estado");
						
						divElement.appendChild(divSpan);
						divElement.appendChild(divDescripcion);
						divElement.appendChild(divEstado);
						var hilera = document.createElement("tr");//Tabla

						var celdaID = document.createElement("td");
						var celdaNombre = document.createElement("td");
						var celdaDescripcion = document.createElement("td");
						var celdaEstado = document.createElement("td");
						var celdaUsuario = document.createElement("td");
						var celdaEliminar = document.createElement("td");
						var textoID = document.createTextNode( Data[i].idCurso);
						var textoNombre = document.createTextNode( Data[i].nombre);
						var textoDescripcion = document.createTextNode( Data[i].descripcion);
						console.log(Data[i].estado)
						if(Data[i].estado == "A"){
							var textoEstado = document.createTextNode("Activo")
						}else{
							var textoEstado = document.createTextNode("Inactivo")
						}
						
						celdaID.appendChild(textoID);
						celdaNombre.appendChild(textoNombre)
						celdaDescripcion.appendChild(textoDescripcion)
						celdaEstado.appendChild(textoEstado)
						hilera.appendChild(celdaID);
						hilera.appendChild(celdaNombre);
						hilera.appendChild(celdaDescripcion);
						hilera.appendChild(celdaEstado);
						tblBody.appendChild(hilera);
						

				var divBotonEliminar = document.createElement("button");
				var divBotonEditar = document.createElement("button");
				
				

				document.getElementById("divLista").appendChild(divElement);
				if(Data[i].estado === 'A'){
					divBotonEditar.innerHTML = "Habilitado";
					
				}else{
					divBotonEditar.innerHTML = "Inhabilitado";
					
				}
				divBotonEditar.MiID = Data[i].idCurso;
                divBotonEditar.Estado = Data[i].estado;


				divBotonEditar.style.cursor = 'pointer';
				divBotonEditar.addEventListener("click",function(mibutton){
					console.log(mibutton.target.MiID,mibutton.target.Estado);
					Edit(
						
						mibutton.target.Estado,
                        mibutton.target.MiID,
						token		
					);
				})
				divBotonEliminar.IDCURSO = Data[i].idCurso;
				divBotonEliminar.innerHTML = "Eliminar";

				

				
				divBotonEliminar.style.cursor = 'pointer';
				divBotonEliminar.addEventListener("click",function(mibutton){
					Delete(mibutton.target.IDCURSO,
						   token
						);
				})


				tblBody.classList.add("tbalaInstructor")
				
				headID.classList.add("claseInstructor1")
				headNombre.classList.add("claseInstructor1")
				headDescripcion.classList.add("claseInstructor1")
				headEstado.classList.add("claseInstructor1")

				btnEliminar.classList.add("claseInstructor1")

				celdaID.classList.add("claseInstructor")
				celdaNombre.classList.add("claseInstructor")
				celdaDescripcion.classList.add("claseInstructor")
				celdaEstado.classList.add("claseInstructor") 

				
				hilera.classList.add("theadInstructor")

				divBotonEditar.classList.add("btnJs1")
				divBotonEliminar.classList.add("btnJs")
				

				celdaUsuario.appendChild(divBotonEditar);
				celdaEliminar.appendChild(divBotonEliminar);
				hilera.appendChild(celdaUsuario);
				hilera.appendChild(celdaEliminar);	
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

	function Delete(IDCURSO,token){
		var url ="https://25.60.14.37:80/api/AdminPantalla/EliminarCursoAdmin";
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				"idCurso": IDCURSO
			}),
			headers:{
				'Accept' : "application/json",
				"Content-Type":"application/json",
				'Authorization': 'Bearer ' + token
			}	
		}).then(function(response){
			if(response.ok){
				alert("El Curso ha sido eliminado correctamente")
				return response.text();
			}else{
				alert("Este curso no puede ser eliminador porque tiene asociado estudiantes");
			}
		}).then(function(Data){
			console.log(Data);
			Get(token);
		})

	}


	function Edit(estado,MiId,token){
		fetch(urlEdit,{
			method: "POST",
			body: JSON.stringify({
				estado: estado,
				idCurso: MiId
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
				
				
				Get(token);
			
			})
		}
		