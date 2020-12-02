const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const express = require('express')
const app = express()
const port = 3000
const MyUser = require("./userData.js");
const evaluarEvento = require("./megachess/evaluarEvento.js")

const WebSocket = require('ws');

var board_id = "";

var ws = new WebSocket('ws://megachess.herokuapp.com/service?authtoken=' + MyUser.auth_token);

app.get('/', (req, res) => {
  res.send('<h1> Hello World! </h1>')
})

app.get('/desafiar', (req, res, next) => {
    const search_params = req.query;
    console.log(search_params)
    const contrincante = search_params.contrincante.toString();
    const mensaje = search_params.mensaje.toString();
    var myResponse = {
        "action":"challenge", 
        "data": {
                "username": contrincante,
                "message": mensaje
                }
    }
    myResponse = JSON.stringify(myResponse)
    ws.send(myResponse)
    res.send("Has desafiado a: '" + contrincante + "' con el mensaje: '" + mensaje +"'");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

ws.on('open', function open(data) {
    console.log('Conectado a MegaChess:');
    setTimeout(esperarInput,1000);
});

ws.on('close', function open(data) {
  console.log('Reconectando a MegaChess:');
  ws = new WebSocket('ws://megachess.herokuapp.com/service?authtoken=' + MyUser.auth_token);
});

ws.on('message', function incoming(data) {
    console.log("-------------------------MENSAJE DEL SERVIDOR--------------------")
    console.log("TIMESTAMP:" + Date.now())
    var serverMsg = JSON.parse(data)
    board_id = serverMsg.data.board_id
    console.log(serverMsg);
    var myResponse = evaluarEvento(serverMsg);
    ws.send(JSON.stringify(myResponse))
    console.log("-------------------------RESPUESTA ENVIADA-----------------------")
    console.log("TIMESTAMP:" + Date.now())
});

function esperarInput(){
  rl.question("¿Que desea hacer?\n", accion =>{
    switch (accion.toLowerCase()) {
      case "desafiar":
      case "d":
        rl.question("Oponente: ", oponente =>{
          rl.question("Mensaje: ", mensaje =>{
            var myResponse = {
              "action":"challenge", 
              "data": {
                      "username": oponente,
                      "message": mensaje
                      }
            }
            ws.send(JSON.stringify(myResponse));
            esperarInput();
          })
        })
        break;
      case "stop":
      case "s":
        ws.send(JSON.stringify({"action": "abort", "data": {"board_id": board_id}}));
        esperarInput();
        break;
      default:
        rl.close()
        break;
    }
  })
}