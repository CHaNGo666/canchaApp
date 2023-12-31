
let timerVar, totalSeconds, timeVarTotal = 0, totalSecondsTotal;

// constantes con nro de columna
const coltpj = 4, coltpd = 5, colhttj = 6, colttj = 7, colhttd = 8, colttd = 9, colJd = 10;

let secondsT = 0;

//------------------------------------------------------------------------------------------
// RELOJ
function timerClock() {
    ++secondsT;
    // tiempo total
    let x = parseInt(localStorage.getItem("tiempoTotal") == null ? 0 : localStorage.getItem("tiempoTotal"));
    // calcula tiempo parcial
    let tiempo = calculaTime(secondsT)
    // imprime pantalla
    document.getElementById("timer").innerHTML = formateoTime(tiempo[0], tiempo[1], tiempo[2]);
    // suma tiempo totalanterior + parcial => tiempo total actual
    let tt = (x + secondsT);
    // calcula tiempo total
    tiempo = calculaTime(tt)
    // imprime pantalla
    document.getElementById("timerTotal").innerHTML = formateoTime(tiempo[0], tiempo[1], tiempo[2]);
}
//------------------------------------------------------------------------------------------
// calcula tiempo
const calculaTime = (secondsT) => {

    let hour = Math.floor(secondsT / 3600);
    let minute = Math.floor((secondsT - hour * 3600) / 60);
    let seconds = secondsT - (hour * 3600 + minute * 60);

    const t = [hour, minute, seconds];

    return t;

    
}


//------------------------------------------------------------------------------------------
// FORMATEA TIEMPO
const formateoTime = (h, m, s) => {

    if (h < 10)
        h = "0" + h;
    if (m < 10)
        m = "0" + m;
    if (s < 10)
        s = "0" + s;

    return (h + ":" + m + ":" + s);

}

//------------------------------------------------------------------------------------------
// COMIENZO
start_timer.addEventListener('click', e => {

    console.log("start")

    timerVar = setInterval(timerClock, 1000);
    totalSecondsTotal = localStorage.getItem("tiempoTotal");
    console.log(totalSecondsTotal)

});

//------------------------------------------------------------------------------------------
// PAUSA
pause_timer.addEventListener('click', e => {

    console.log("pausa")
    timeVarTotal = timeVarTotal + secondsT;
    localStorage.setItem("tiempoTotal", timeVarTotal);
    localStorage.setItem("tiempoParcial", secondsT);
    secondsT = 0;

    datosParciales()
    clearInterval(timerVar)

    document.getElementById("timer").innerHTML = ("00:00:0");

});

//------------------------------------------------------------------------------------------
// DETENCION
stop_timer.addEventListener('click', e => {

    localStorage.clear("tiempoTotal");
    clearInterval(timerVar)

});

//------------------------------------------------------------------------------------------
// IMPRIME TIEMPOS EN PANTALLA
function datosParciales() {
    console.log("PARCIALES")
    let totalJugadoXjugador = 0;
    //nodo de tabla
    const parcial = localStorage.getItem("tiempoParcial");
    //nodo tr
    const tr = document.getElementById("listaJugadores").querySelectorAll("#listaJugadores tbody tr");

   // console.log(tr)
 
    // recorre tr
    for (let i = 0; i < tr.length; i++) {
        // asigna parciales
        if (tr[i].children[colJd].textContent === "J") {
            // suma tiempo total acumulado de juego + parcial ==> tiempo total de cada jugador 
            totalJugadoXjugador = parseInt(tr[i].children[colhttj].textContent) + parseInt(parcial);
            let tiempo = calculaTime(totalJugadoXjugador)
            // parcial
            tr[i].children[coltpj].textContent = parcial;
            // imprime total
            tr[i].children[colhttj].textContent = totalJugadoXjugador;
            tr[i].children[colttj].textContent = formateoTime(tiempo[0], tiempo[1], tiempo[2]);
        }
        else {
            // suma tiempo total acumulado de descanso + parcial ==> tiempo total de cada jugador 
            totalJugadoXjugador = parseInt(tr[i].children[colhttd].textContent) + parseInt(parcial);
            let tiempo = calculaTime(totalJugadoXjugador)
            // parcial
            tr[i].children[coltpd].textContent = parcial;
            // imprime total
            tr[i].children[colhttd].textContent = totalJugadoXjugador;
            tr[i].children[colttd].textContent = formateoTime(tiempo[0], tiempo[1], tiempo[2]);
        }
    }
    // J/D
    //document.getElementById(a).children[8].textContent = "J";

}

