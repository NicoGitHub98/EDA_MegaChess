function getMisPiezas(tableroArray, color){
    var misPiezas = []
    if(color == "white"){
        tableroArray.forEach((fila,indexFila) => {
            fila.forEach((elemento,indexColumna) => {
                if(["P","R","H","B","Q","K"].includes(elemento)){
                    misPiezas.push({
                        pieza: elemento,
                        fila: indexFila,
                        columna: indexColumna,
                        movimientosPosibles: []
                    })
                }
            })
        });
    } else {
        tableroArray.forEach((fila,indexFila) => {
            fila.forEach((elemento,indexColumna) => {
                if(["p","r","h","b","q","k"].includes(elemento)){
                    misPiezas.push({
                        pieza: elemento,
                        fila: indexFila,
                        columna: indexColumna,
                        movimientosPosibles: []
                    })
                }
            })
        });
    }
    return misPiezas;
}

module.exports = getMisPiezas;