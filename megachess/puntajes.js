function calcularPuntaje(pieza,tipoMov){
    switch (pieza) {
        case "p":
        case "P":
            if(tipoMov == "comer") return 100;
            else return 10;

        case "r":
        case "R":
            if(tipoMov == "comer") return 600;
            else return 10//60;

        case "h":
        case "H":
            if(tipoMov == "comer") return 300;
            else return 10//30;

        case "b":
        case "B":
            if(tipoMov == "comer") return 400;
            else return 10//40;

        case "q":
        case "Q":
            if(tipoMov == "comer") return 500;
            else return 5;

        case "k":
        case "K":
            if(tipoMov == "comer") return 1000;
            else return 10//100; 

        default:
            break;
    }
}

function puntaje_distancia_promote(movimiento, promoteRow){
    var puntajeMov = calcularPuntaje(movimiento.pieza,"mover");
    if(movimiento.toRow == 7 || movimiento.toRow == 8) puntajeMov = 50; //Mov de Promote
    else {
        var promoteDis = Math.abs(movimiento.fromRow - promoteRow)
        puntajeMov += 4/promoteDis;
    }
    return puntajeMov;
}

module.exports = {
    calcularPuntaje: calcularPuntaje,
    puntaje_distancia_promote: puntaje_distancia_promote
}