const analizarMovimiento = require("./analizarMovimiento")

function evaluarEvento(serverMsg){
    var myResponse = {}
    switch (serverMsg.event) {
        case "ask_challenge":
            myResponse = {
                "action": "accept_challenge", 
                "data": { 
                    "board_id": serverMsg.data.board_id 
                }
            }
            return myResponse;
    
        case "your_turn":
            var mejorMov = analizarMovimiento(serverMsg)
            myResponse = {
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
            return myResponse;  

        default: 
            return myResponse = {}
    }
}

module.exports = evaluarEvento;