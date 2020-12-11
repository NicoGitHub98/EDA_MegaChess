const {peon_1_adelante, peon_2_adelante, peon_come_izquierda,peon_come_derecha} = require("../movimientos/peon") 

const tablero1 = [
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","q","","","","","","","","","","",""],
    ["","","","","","P","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
];

const tablero2 = [
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","p","","","","","","","","","","","",""],
    ["","","","","Q","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","",""],
];

const elemento1 = {
    pieza: "p",
    fila: 3,
    columna: 3,
}
const elemento2 = {
    pieza: "P",
    fila: 12,
    columna: 5,
}
const dirOfMov1 = 1;
const dirOfMov2 = -1;

const promoteRow1 = 7;
const promoteRow2 = 8;

const movimiento1 = {
    pieza: "p",
    fromRow: 3,
    fromColumn: 3,
    toRow: 4,
    toColumn: 3,
    tipoMov: "mover",
    puntajeMov: 135,
}
const movimiento2 = {
    pieza: "P",
    fromRow: 12,
    fromColumn: 5,
    toRow: 10,
    toColumn: 5,
    tipoMov: "mover",
    puntajeMov: 135,
}
const movimiento3 = {
    pieza: "P",
    fromRow: 12,
    fromColumn: 5,
    toRow: 11,
    toColumn: 4,
    tipoMov: "comer",
    puntajeMov: 50,
}
const movimiento4 = {
    pieza: "p",
    fromRow: 3,
    fromColumn: 3,
    toRow: 4,
    toColumn: 4,
    tipoMov: "comer",
    puntajeMov: 50,
}

test('Peon NEGRO mueve 1 hacia adelante', () => {
    expect(peon_1_adelante(elemento1, dirOfMov1, promoteRow1)).toEqual(movimiento1);
  });

test('Peon BLANCO mueve 2 hacia adelante', () => {
    expect(peon_2_adelante(elemento2, dirOfMov2, promoteRow2)).toEqual(movimiento2);
});

test('Peon BLANCO come hacia la izquierda', () => {
    expect(peon_come_izquierda(elemento2, dirOfMov2, tablero1)).toEqual(movimiento3);
});

test('Peon BLANCO come hacia la derecha', () => {
    expect(peon_come_derecha(elemento1, dirOfMov1, tablero2)).toEqual(movimiento4);
});