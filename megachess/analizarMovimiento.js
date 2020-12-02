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

    var myResponse = {
        "action": "move", 
        "data": {
                "board_id": serverMsg.data.board_id,
                "turn_token": serverMsg.data.turn_token,
                "from_row": mejorMov.fromRow,
                "from_col": mejorMov.fromColumn,
                "to_row": mejorMov.toRow,
                "to_col": mejorMov.toColumn
            }
        }
        console.log(myResponse)
        return myResponse
}

module.exports = analizarMovimiento