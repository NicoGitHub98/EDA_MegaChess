const {puntaje_distancia_promote,calcularPuntaje} = require("../puntajes");

function peon_1_adelante(elemento, dirOfMov, promoteRow){
    var movimiento = {};
    movimiento.pieza = elemento.pieza;
    movimiento.fromRow = elemento.fila;
    movimiento.fromColumn = elemento.columna;
    movimiento.toRow = elemento.fila + 1*dirOfMov;
    movimiento.toColumn = elemento.columna;
    movimiento.tipoMov = "mover";
    movimiento.puntajeMov = puntaje_distancia_promote(movimiento,promoteRow);
    return movimiento;
}

function peon_2_adelante(elemento, dirOfMov, promoteRow){
    var movimiento = {};

    movimiento.pieza = elemento.pieza;
    movimiento.fromRow = elemento.fila;
    movimiento.fromColumn = elemento.columna;
    movimiento.toRow = elemento.fila + 2*dirOfMov;
    movimiento.toColumn = elemento.columna;
    movimiento.tipoMov = "mover";
    movimiento.puntajeMov = puntaje_distancia_promote(movimiento,promoteRow);
    return movimiento;
}

function peon_come_izquierda(elemento, dirOfMov, tablero){
    var movimiento = {};

    movimiento.pieza = elemento.pieza;
    movimiento.fromRow = elemento.fila;
    movimiento.fromColumn = elemento.columna;
    movimiento.toRow = elemento.fila + 1*dirOfMov;
    movimiento.toColumn = elemento.columna - 1;
    movimiento.tipoMov = "comer";
    movimiento.puntajeMov = calcularPuntaje(tablero[movimiento.toRow][movimiento.toColumn],"comer")
    
    return movimiento;
}

function peon_come_derecha(elemento,dirOfMov,tablero){
    var movimiento = {};

    movimiento.pieza = elemento.pieza;
    movimiento.fromRow = elemento.fila;
    movimiento.fromColumn = elemento.columna;
    movimiento.toRow = elemento.fila + 1*dirOfMov;
    movimiento.toColumn = elemento.columna + 1;
    movimiento.tipoMov = "comer";
    movimiento.puntajeMov = calcularPuntaje(tablero[movimiento.toRow][movimiento.toColumn],"comer")

    return movimiento;
}

module.exports = {
    peon_1_adelante: peon_1_adelante,
    peon_2_adelante: peon_2_adelante,
    peon_come_izquierda: peon_come_izquierda,
    peon_come_derecha: peon_come_derecha
}