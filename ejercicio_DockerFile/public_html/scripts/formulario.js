window.onload = function() {
    // Un poco de contexto:
    // Los campos del formulario no son realistas, son los que utilicé para practicar
    // La información no se guarda en ningún sitio
    // Los campos opcionales (textarea y checkbox) no son validados

    // Formulario --> array de nodos del formulario
    const formu = document.formulario.elements;

    // Botón enviar --> el botón de enviar el formulario, está fuera del html
    // para que no se recargue la página al pulsarlo
    const botonEnviar = document.querySelector(".enviar");
    // atributo disabled, no podrán utilizar el botón, por ahora
    botonEnviar.disabled = true;

    //variable boolean que decidirá si enviar o no la información del formulario
    //si es false, la información estará bien
    var error = false;

    // Input tipo texto --> nombre, apellido
    const inputText = document.querySelectorAll("input[type='text']");
    for (let inp of inputText) {
        inp.addEventListener("blur", comprobarTexto);
    }

    // Input tipo email --> email
    const inputMail = document.querySelector("input[type='email']");
    inputMail.addEventListener("blur", comprobarEmail);

    // Input tipo password --> contraseña, repetir contraseña
    const inputPassword = document.querySelectorAll("input[type='password']");
    for (let inp of inputPassword) {
        inp.addEventListener("blur", comprobarPassword);
    }

    // Input tipo date --> fecha de nacimiento
    const inputDate = document.querySelector("input[type='date']");
    inputDate.addEventListener("blur", comprobarFecha);

    // Radios
    const radios = document.querySelectorAll("input[type='radio']");
    for (let radio of radios) {
        radio.addEventListener("click", accionRadio);
    }

    // variables para el captcha
    //input number de la respuesta a la suma
    const inputCaptcha = document.querySelector("input[type='number']");

    // metodo que comprueba si el captcha es correcto
    inputCaptcha.addEventListener("blur", comprobarCaptcha);

    // variables para operar con el captcha
    const op1 = document.querySelector(".operador1");
    const op2 = document.querySelector(".operador2");
    const resultado = document.querySelector("#respuesta");
    var resul = 0;

    // variable para avisar de si se resolvió correctamente la suma
    var errorCaptcha = document.querySelector(".errorCaptcha");

    // Referencias a elementos del html
    // lista de nodos de label
    const labels = document.querySelectorAll("label");
    // lista de nodos de iconos (far) --> font awesome
    const iconos = document.querySelectorAll(".far");

    // Variables para utilizar en algunos metodos
    var label = labels[0];
    var text = "";
    var icono;




    //      Funciones       //

    // inicializo el captcha siempre que se recargue la página
    captcha();

    // testea los campos tipo texto, si encajan con la RE continua
    function comprobarTexto(e) {
        let caracteres = /[a-z ]{3}/i

        // dependiendo de si pulsan el nombre o el apellido, el contenido de las variables es diferente
        if (e.target == formu[0]) {
            label = labels[0];
            icono = iconos[0];
            text = "Nombre ";
        } else {
            label = labels[1];
            icono = iconos[1];
            text = "Apellido ";
        }
        // si el test falla o el input está vacio, será invalido --> inputMal
        // sino, inputBien
        if (!(caracteres.test(e.target.value.trim())) || e.target.value == "") {
            text += "inválido";
            inputMal(label, text, icono);
        } else {
            text += "válido";
            inputBien(label, text, icono);
        }
    }


    function comprobarEmail(e) {
        label = labels[2];
        icono = iconos[2];

        // Esta es la ER que diseñé yo, bastante simple
        //let email = /^\S+@\S+\.\S{2,3}/i

        // Esta es la que encontré en internet, con mis emails funciona, tambien testeé errores con ella
        //Confieso que es demasiado compleja para mi
        let email = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (!(email.test(e.target.value.trim())) || e.target.value == "") {
            text = "Email inválido";
            inputMal(label, text, icono);
        } else {
            text = "Email válido";
            inputBien(label, text, icono);
        }
    }

    function comprobarPassword(e) {
        // la contraseña no puede tener caracteres especiales como ( ? = *, 
        //tiene que tener al menos una mayuscula y una minuscula y al menos 8 carácteres de longitud
        let contrasena = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        //este método es complejo...
        //Primero asigno variables según el input pulsado (para acceder a inputBien o inputMal)
        if (e.target == formu[3]) {
            label = labels[3];
            icono = iconos[3];
        } else {
            label = labels[4];
            icono = iconos[4];
        }

        //si la contraseña encaja en el test o esta vacia --> inputMal
        //sino, inputBien
        if (!(contrasena.test(e.target.value.trim())) ||
            e.target.value.trim() == "") {
            text = "Contraseña inválida";
            inputMal(label, text, icono);
        } else {
            text = "Contraseña válida";
            inputBien(label, text, icono);
        }

        // controlando que repetir password avise de que las passwords son diferentes
        if (e.target == formu[4]) {
            if (formu[3].value != formu[4].value) {
                label = labels[4];
                icono = iconos[4]
                text = "Contraseña diferente";
                inputMal(label, text, icono);
            }
        }
        if (e.target == formu[3] && formu[3] != formu[4] && formu[4].value != "") {
            label = labels[4];
            icono = iconos[4];
            text = "Contraseña diferente";
            inputMal(label, text, icono);
        }

        // si se corrige desde el la primera contraseña, el label de repetir contraseña debe cambiar a válido
        if (e.target == formu[3] && iconos[4].style.color == "red" && formu[3].value == formu[4].value) {
            label = labels[4];
            icono = iconos[4];
            text = "Contraseña válida";
            inputBien(label, text, icono);
        }
    }

    // Al ser un input type date no necesité utilizar ninguna comprobación especial
    // compruebo si se ha seleccionado alguna fecha
    // si se introduce una fecha errónea, el input type date la vuelve a empty string
    function comprobarFecha() {
        if (formu[5].value == "") {
            label = labels[5];
            icono = iconos[5];
            text = "Fecha de Nacimiento inválida";
            inputMal(label, text, icono);
        } else {
            label = labels[5];
            icono = iconos[5];
            text = "Fecha de Nacimiento válida";
            inputBien(label, text, icono);
        }
    }


    // Todo el codigo leyendo inputBien, inputMal... Y aquí están
    //son dos metodos similares, reciben 3 parametros: 
    //label del elemento que perdio el foco, texto a poner de ese elemento y el icono de perteneciente al elemento
    // el método mueve el label a la derecha del input (transition) y tras medio segundo
    // cambia su texto, la class del icono (font awesome) y el color
    function inputMal(label, text, icono) {
        label.style.left = "4px";
        setTimeout(() => {
            label.innerText = text;
            icono.classList.remove("fa-check-circle");
            icono.classList.add("fa-times-circle");
            icono.style.color = "red";
            validar();
        }, 500);

    }

    // este es igual, pero a la inversa, solo que al final, llama a validar()
    function inputBien(label, text, icono) {
        label.style.left = "4px";
        setTimeout(() => {
            label.innerText = text;
            icono.classList.remove("fa-times-circle");
            icono.classList.add("fa-check-circle");
            icono.style.color = "green";
            validar();
        }, 500);
    }

    // como no es necesario guardar la información, solo evaluará que se ha seleccionado un radio
    //sino con un for, iterando por los radios y viendo si están checked funcionaría...
    //También llama a validar()
    function accionRadio() {
        if (formu[6].checked || formu[7].checked || formu[8].checked) {
            iconos[6].classList.add("fa-check-circle");
            iconos[6].style.color = "green";
            validar();
        }
    }

    // genera un captcha diferente cada vez que se accede a la página
    function captcha() {
        op1.innerHTML = Math.round(Math.random() * (5 - 1) + 1);
        op2.innerHTML = Math.round(Math.random() * (5 - 1) + 1);
    }

    // comprueba que la suma es correcta, si lo es, modifica el icono de font awesome
    // avisa de que el resultado es correcto y llama a validar()
    //si no es correcto, modifica el icono de font awesome (color red) y avisa de que el resultado no es correcto
    function comprobarCaptcha() {
        resul = parseInt(op1.innerHTML) + parseInt(op2.innerHTML);
        if (resultado.value == resul) {
            iconos[7].classList.remove("fa-times-circle");
            iconos[7].classList.add("fa-check-circle");
            iconos[7].style.color = "green";
            errorCaptcha.innerText = "Resultado Correcto";
            validar();
        } else {
            iconos[7].classList.remove("fa-check-circle");
            iconos[7].classList.add("fa-times-circle");
            iconos[7].style.color = "red";
            errorCaptcha.innerText = "Resultado Incorrecto, inténtelo de nuevo";
            validar();
            // al fallar el captcha se renueva
            captcha();
        }
    }

    // la funcion de validar recorre los nodos de iconos, si alguno está en rojo
    // es que el valor introducido es incorrecto, asi que error true
    // antes del for, error false, si el usuario corrige el error y no se hace esto, no cambiaría nada

    function validar() {
        error = false;
        for (let icon of iconos) {
            if (icon.classList[1] != "fa-check-circle") {
                error = true;
            }
        }

        // Por ultimo, si no hay errores, se modifican los estilos del boton enviar
        // se habilita el boton, se cambia el cursor, la opacidad y el atributo title
        // title de base es "rellene el formulario", al estar activo informa de que se puede enviar
        if (!error) {
            botonEnviar.disabled = false;
            botonEnviar.style.cursor = "pointer";
            botonEnviar.style.opacity = "1";
            botonEnviar.setAttribute("title", "Formulario listo para enviar");
        } else {
            // si hay errores, el botón vuelve a su estado normal
            botonEnviar.disabled = true;
            botonEnviar.style.cursor = "not-allowed";
            botonEnviar.style.opacity = "0.6";
            botonEnviar.setAttribute("title", "Rellene el formulario");
        }
    }
}