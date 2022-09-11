window.addEventListener('load',(event) => {
    deleteCookie("email");
    deleteCookie("rol");
    document.getElementById('correo').value = "";
    document.getElementById('clave').value = "";
})

var formulario = document.getElementById('btnLogin');
localStorage.clear();

formulario.addEventListener('click',obtenerToken);

function obtenerToken(){
    var url = "https://localhost:7076/api/Autenticacion/Validar";
    var correo = document.getElementById('correo').value;
    var clave = document.getElementById('clave').value;

    fetch(url,{
        method: "POST",
        body: JSON.stringify({
            correo: document.getElementById('correo').value,
            clave: document.getElementById('clave').value
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
        validarVentana(Data.token,correo,clave)
        document.getElementById('correo').value = "";
        document.getElementById('clave').value = "";
    })
}

function validarEstado(correo,clave){
    if(correo != ""){
        var url = "https://localhost:7076/api/Autenticacion/ValidarEstado";
        fetch(url,{
            method: "POST",
            body: JSON.stringify({
                correo : correo,
                clave: clave
            }),
            headers : {
                'Accept' : "application/json",
                "Content-Type":"application/json"
            }
        }).then(function(respose){
            return respose.json();
        }).then(function(Data){
            console.log(Data[0].estado);
            if(Data[0].estado == "I"){
                alert('Usuario Desactivado');
            }else {
                alert('Correo o contraseña invalido');
            }

        })
    }
}

function validarVentana(data,correo,clave){
    if(data != ""){
        var url = "https://localhost:7076/api/Usuarios/Get";
        fetch(url,{
            method: "POST",
            body: JSON.stringify({
                correo : correo,
                clave: clave
            }),
            headers : {
                'Accept' : "application/json",
                "Content-Type":"application/json",
                'Authorization': 'Bearer ' + data
            }
        }).then(function(respose){
            return respose.json();
        }).then(function(Data){
            console.log(Data);
            var email = correo; //formulario es el name de form y email name del input
            var rol = Data[0].rol;
            setCookie("email",email, 10);
            setCookie("rol", rol, 10);
            redireccionarVista(Data[0].rol);

        })
    }
}

function redireccionarVista(rol){
    if(rol === "Instructor"){
        location.href="./Instructor/Instructor.html"
    }else if(rol === "Administrador"){
        location.href="./Admin/Admin.html"
    }else if(rol === "Estudiante"){
        location.href="./Estudiante/Estudiante.html"
    }
}

//---------------------------------------
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

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

  function deleteCookie(cname){
    setCookie(cname,"",-1)
  }