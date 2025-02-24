// Inicializamos la variable para el número de intentos
let intentos = 0;
let numeroAleatorio; // Declaramos la variable aquí para poder usarla en todo el código
const audioIntentos = new Audio("/audios/error-126627.mp3");
const audioGanador = new Audio("/audios/audio_ganador.mp3");
const audioErrorIngresaNam = new Audio("/audios/error_ingresa_num.mp3");

// Temporizador de inicio del juego
let timerInterval;
Swal.fire({
  title: "LISTX PARA SER CRACK EN LA ADIVINANZA",
  html: "EN CONTADOS SEGUNDOS INICIAMOS!! <b></b> ESTAS A SEGUNDOS DE INICIAR ¿ESTAS LISTX?.",
  timer: 5000,
  timerProgressBar: true,
  didOpen: () => {
    
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
    // Generar un número aleatorio entre 1 y 10 al iniciar el juego
    numeroAleatorio = Math.floor(Math.random() * 10) + 1;
    console.log(`Número generado al azar: ${numeroAleatorio}`);
  },
}).then((result) => { 
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("Cerrado por el temporizador");
    // Aquí puedes habilitar el input o botón del juego si estaba deshabilitado
    document.getElementById("guess").disabled = false; // Asegúrate de que este ID coincida con el de tu input
  }
});

function checkGuess() {
  // Verificar si se han alcanzado los tres intentos
  if (intentos >= 3) {
    Swal.fire({
      icon: "info",
      title: "Fin de intentos",
      text: `Has agotado tus 3 intentos. El número a adivinar era ${numeroAleatorio}.`,
      didOpen: audioIntentos.play(),
    });
    
    // Reiniciar el número de intentos
    intentos = 0;
    return;
  }

  // Incrementamos el número de intentos
  intentos++;

  // Obtener el valor ingresado por el usuario
  const numeroaAdivinar = parseInt(document.getElementById("guess").value);
   
  if (isNaN(numeroaAdivinar)) {
    Swal.fire({
      didOpen: audioErrorIngresaNam.play(),
      icon: "error",
      title: "Debes ingresar un Número entre el 1 y 10, Pilas!!",
    });

    return;
  }

  // Comprobar si el número ingresado es igual al aleatorio
  if (numeroaAdivinar === numeroAleatorio) {
    Swal.fire({
      didOpen: audioGanador.play(),
      title: "¡Felicidades, la rompiste!",
      text: `Adivinaste en ${intentos} intentos.`,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff",
      backdrop: `
                rgba(0,0,123,0.4)
                url('/img/nyan-cat-medium.gif')
                left top
                no-repeat
            `,
    });
    confetti();

    // Reiniciar el contador de intentos
    intentos = 0;
  } else {
    let mensaje = "No adivinaste el número. ";

    // Comprobar si el número a adivinar es mayor o menor al número generado aleatoriamente
    if (numeroaAdivinar > numeroAleatorio) {
      mensaje += "El número a adivinar es menor.";
    } else {
      mensaje += "El número a adivinar es mayor.";
    }

    Swal.fire({
      icon: "error",
      title: "Ops, perdiste.",
      text: `${mensaje} Llevas ${intentos} de 3 intentos permitidos.`,
      didOpen: audioIntentos.play(),
    });
  }
}
