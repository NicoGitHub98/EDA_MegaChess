const parseTablero = require("./parseTablero")
const getMisPiezas = require ("./misPiezas")
const {getMovimientosPosibles, seleccionarMejorMovimiento} = require ("./movimientosPosibles")


function analizarMovimiento(serverMsg){
    var tableroArray = parseTablero(serverMsg.data.board)
    var arrayMisPiezas = getMisPiezas(tableroArray,serverMsg.data.actual_turn);
    var movimientosPosibles = getMovimientosPosibles(arrayMisPiezas,tableroArray);
    var mejorMov = seleccionarMejorMovimiento(movimientosPosibles)

    console.log("---------------------MEJOR MOVIMIENTO----------------------")
    console.log(mejorMov);
    
    return mejorMov
}

module.exports = analizarMovimiento