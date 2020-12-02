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
            break;
    
        case "your_turn":
            myResponse = analizarMovimiento(serverMsg)
            return myResponse;  
            break;

        default: 
            return myResponse = {}
            break;
    }
}

module.exports = evaluarEvento;