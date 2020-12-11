const {calcularPuntaje} = require("./puntajes");
const {peon_1_adelante} = require("./movimientos/peon");
const {peon_2_adelante} = require("./movimientos/peon");
const {peon_come_izquierda} = require("./movimientos/peon");
const {peon_come_derecha} = require("./movimientos/peon");

function getMovimientosPosibles(misPiezas,tablero){
    var movimientosPosibles = []
    misPiezas.forEach(elemento => {
        calcularMovimientosPosibles(elemento,tablero,movimientosPosibles)
    });
    return movimientosPosibles;
}

function calcularMovimientosPosibles(elemento,tablero,movimientosPosibles){
    var piezasEnemigas;
    var dirOfMov;
    var promoteRow;
    
    //Checkeo color de jugador y seteo las piezas enemigas
    if(elemento.pieza.charCodeAt()<=90){
        piezasEnemigas = ["r","h","b","q","k","p"];
        dirOfMov = -1;
        promoteRow = 8;
    }else{
        piezasEnemigas = ["R","H","B","Q","K","P"];
        dirOfMov = 1;
        promoteRow = 7;
    }

    // Objeto Movimiento
    var movimiento = {
        pieza: "",
        fromRow: "",
        fromColumn: "",
        toRow: "",
        toColumn: "",
        tipoMov: "",
        puntajeMov: ""
    };

    switch (elemento.pieza) {
        case "p":
        case "P":
            //Si puede moverse hacia adelante:
            if(tablero[elemento.fila + 1*dirOfMov][elemento.columna]==" "){
               
                /*
                movimiento.pieza = elemento.pieza;
                movimiento.fromRow = elemento.fila;
                movimiento.fromColumn = elemento.columna;
                movimiento.toRow = elemento.fila + 1*dirOfMov;
                movimiento.toColumn = elemento.columna;
                movimiento.tipoMov = "mover";
                movimiento.puntajeMov = calcularPuntaje(elemento.pieza,"mover");

                if(movimiento.toRow == 7 || movimiento.toRow == 8) movimiento.puntajeMov = 50; //Mov de Promote
                var promoteDis = Math.abs(elemento.fila - promoteRow)
                movimiento.puntajeMov += 4/promoteDis;
                movimientosPosibles.push(JSON.parse(JSON.stringify(movimiento)))
                */
                var movimiento = peon_1_adelante(elemento, dirOfMov, promoteRow);
                movimientosPosibles.push(movimiento)
            }
            
            //Si puede moverse dos casillas porque se encuentra en la fila 12/13 (blancas) o 2/3 (negras)
            if(
                tablero[elemento.fila + 2*dirOfMov][elemento.columna]==" " &&
                tablero[elemento.fila + 1*dirOfMov][elemento.columna]==" " &&
                (elemento.fila == 12 || elemento.fila == 13 || elemento.fila == 2 || elemento.fila == 3)
            ){
                /*
                movimiento.pieza = elemento.pieza;
                movimiento.fromRow = elemento.fila;
                movimiento.fromColumn = elemento.columna;
                movimiento.toRow = elemento.fila + 2*dirOfMov;
                movimiento.toColumn = elemento.columna;
                movimiento.tipoMov = "mover";

                movimiento.puntajeMov = calcularPuntaje(elemento.pieza,"mover");
                var promoteDis = Math.abs(elemento.fila - promoteRow)
                movimiento.puntajeMov += 4/promoteDis;

                movimientosPosibles.push(JSON.parse(JSON.stringify(movimiento)))
                */
                var movimiento = peon_2_adelante(elemento, dirOfMov, promoteRow);
                movimientosPosibles.push(movimiento)
            }
            
            //Movimiento de comida diag derecha
            if(piezasEnemigas.includes(tablero[elemento.fila+1*dirOfMov][elemento.columna+1])){
                /*
                movimiento.pieza = elemento.pieza;
                movimiento.fromRow = elemento.fila;
                movimiento.fromColumn = elemento.columna;
                movimiento.toRow = elemento.fila + 1*dirOfMov;
                movimiento.toColumn = elemento.columna + 1;
                movimiento.tipoMov = "comer";
                movimiento.puntajeMov = calcularPuntaje(tablero[elemento.fila+1*dirOfMov][elemento.columna+1],"comer")
                movimientosPosibles.push(JSON.parse(JSON.stringify(movimiento)))
                */
                var movimiento = peon_come_derecha(elemento, dirOfMov, tablero);
                movimientosPosibles.push(movimiento)
            }
            //Movimiento de comida diag izquierda
            if(piezasEnemigas.includes(tablero[elemento.fila+1*dirOfMov][elemento.columna-1])){
                /*
                movimiento.pieza = elemento.pieza;
                movimiento.fromRow = elemento.fila;
                movimiento.fromColumn = elemento.columna;
                movimiento.toRow = elemento.fila + 1*dirOfMov;
                movimiento.toColumn = elemento.columna - 1;
                movimiento.tipoMov = "comer";
                movimiento.puntajeMov = calcularPuntaje(tablero[elemento.fila+1*dirOfMov][elemento.columna-1],"comer")

                movimientosPosibles.push(JSON.parse(JSON.stringify(movimiento)));
                */
                var movimiento = peon_come_izquierda(elemento, dirOfMov, tablero);
                movimientosPosibles.push(movimiento)
            }
            break;
            case "h":
            case "H":
                for (var dir_x=-1; dir_x < 2; dir_x++) {
                    for (var dir_y=-1; dir_y < 2; dir_y++) {
                        //Las direcciones representan la direccion del mov, siendo -1 izq o abajo y 1 derecha o arriba
                        if(dir_y==0 || dir_x==0) continue;
                        if(
                            movDentroTablero(elemento,1*dir_x,2*dir_y)
                            &&
                            (
                                tablero[elemento.fila + 2*dir_y][elemento.columna + 1*dir_x]==" " || 
                                piezasEnemigas.includes(tablero[elemento.fila + 2*dir_y][elemento.columna + 1*dir_x])
                            )
                        ){
                            movimiento.pieza = elemento.pieza;
                            movimiento.fromRow = elemento.fila;
                            movimiento.fromColumn = elemento.columna;
                            movimiento.toRow = elemento.fila + 2*dir_y;
                            movimiento.toColumn = elemento.columna + 1*dir_x;
                            
                            if(tablero[movimiento.toRow][movimiento.toColumn]==" "){
                                movimiento.tipoMov = "mover"
                                movimiento.puntajeMov = calcularPuntaje(elemento.pieza, "mover")
                            } else {
                                movimiento.tipoMov = "comer"
                                movimiento.puntajeMov = calcularPuntaje(tablero[movimiento.toRow][movimiento.toColumn], "comer")
                            }

                            movimientosPosibles.push(JSON.parse(JSON.stringify(movimiento)));
                        }
                        if(
                            movDentroTablero(elemento,2*dir_x,1 *dir_y)
                            &&
                            (
                                tablero[elemento.fila + 1*dir_y][elemento.columna + 2*dir_x]==" " || 
                                piezasEnemigas.includes(tablero[elemento.fila + 1*dir_y][elemento.columna + 2*dir_x])
                            )
                        ){
                            movimiento.pieza = elemento.pieza;
                            movimiento.fromRow = elemento.fila;
                            movimiento.fromColumn = elemento.columna;
                            movimiento.toRow = elemento.fila + 1*dir_y;
                            movimiento.toColumn = elemento.columna + 2*dir_x;
                            
                            if(tablero[movimiento.toRow][movimiento.toColumn]==" "){
                                movimiento.tipoMov = "mover"
                                movimiento.puntajeMov = calcularPuntaje(elemento.pieza, "mover")
                            } else {
                                movimiento.tipoMov = "comer"
                                movimiento.puntajeMov = calcularPuntaje(tablero[movimiento.toRow][movimiento.toColumn], "comer")
                            }
                            
                            movimientosPosibles.push(JSON.parse(JSON.stringify(movimiento)));
                        }
                    }
                }
                
                break;

        case "b":
        case "B":
            var dis_x; // desplazamiento horizontal
            var dis_y; // desplazamiento vertical
            for (var dir_x=-1; dir_x < 2; dir_x++) {
                for (var dir_y=-1; dir_y < 2; dir_y++) {
                    //Las direcciones representan la direccion del mov, siendo -1 izq o abajo y 1 derecha o arriba
                    dis_x = dir_x;
                    dis_y = dir_y;
                    if(
                        (dir_y==0 && dir_x==0)
                        || Math.abs(dir_x)!=Math.abs(dir_y)
                        ) continue;//Como es alfil, las direcciones solo pueden ser lineas diagonales
                    while (
                        movDentroTablero(elemento,dis_x,dis_y)
                        && casillaFinalValida(tablero,elemento,dis_x,dis_y,piezasEnemigas)
                    ){
                        movimiento.pieza = elemento.pieza;
                        movimiento.fromRow = elemento.fila;
                        movimiento.fromColumn = elemento.columna;
                        movimiento.toRow = elemento.fila+dis_y;
                        movimiento.toColumn = elemento.columna+dis_x;
                        movimiento.tipoMov = "";
                        movimiento.puntajeMov = 0;

                        if(tablero[movimiento.toRow][movimiento.toColumn]==" "){
                            movimiento.tipoMov = "mover";
                            movimiento.puntajeMov = calcularPuntaje(elemento.pieza,"mover");;
                        } else {
                            movimiento.tipoMov = "comer";
                            movimiento.puntajeMov = calcularPuntaje(tablero[movimiento.toRow][movimiento.toColumn],"comer");
                        }
                        movimientosPosibles.push(JSON.parse(JSON.stringify(movimiento)))
                        if(tablero[elemento.fila+dis_y][elemento.columna+dis_x]!=" ") break;
                        dis_x+=dir_x;
                        dis_y+=dir_y;
                        
                    }
                }
            }
            break;
            

        case "r":
        case "R":
            var dis_x; // desplazamiento horizontal
            var dis_y; // desplazamiento vertical
            for (var dir_x=-1; dir_x < 2; dir_x++) {
                for (var dir_y=-1; dir_y < 2; dir_y++) {
                    //Las direcciones representan la direccion del mov, siendo -1 izq o abajo y 1 derecha o arriba
                    dis_x = dir_x;
                    dis_y = dir_y;
                    if(
                        Math.abs(dir_x)==Math.abs(dir_y) //Como es torre, las direcciones solo pueden ser lineas rectas
                    ) continue;
                    while (
                        movDentroTablero(elemento,dis_x,dis_y)
                        && casillaFinalValida(tablero,elemento,dis_x,dis_y,piezasEnemigas)
                    ){
                        movimiento.pieza = elemento.pieza;
                        movimiento.fromRow = elemento.fila;
                        movimiento.fromColumn = elemento.columna;
                        movimiento.toRow = elemento.fila+dis_y;
                        movimiento.toColumn = elemento.columna+dis_x;
                        movimiento.tipoMov = "";
                        movimiento.puntajeMov = 0;

                        if(tablero[movimiento.toRow][movimiento.toColumn]==" "){
                            movimiento.tipoMov = "mover";
                            movimiento.puntajeMov = calcularPuntaje(elemento.pieza,"mover");
                        } else {
                            movimiento.tipoMov = "comer";
                            movimiento.puntajeMov = calcularPuntaje(tablero[movimiento.toRow][movimiento.toColumn],"comer");
                        }
                        movimientosPosibles.push(JSON.parse(JSON.stringify(movimiento)))
                        if(tablero[elemento.fila+dis_y][elemento.columna+dis_x]!=" ") break;
                        dis_x+=dir_x;
                        dis_y+=dir_y;
                        
                    }
                }
            }
            break;

        case "Q":
        case "q":
            var dis_x; // desplazamiento horizontal
            var dis_y; // desplazamiento vertical
            for (var dir_x=-1; dir_x < 2; dir_x++) {
                for (var dir_y=-1; dir_y < 2; dir_y++) {
                    //Las direcciones representan la direccion del mov, siendo -1 izq o abajo y 1 derecha o arriba
                    dis_x = dir_x;
                    dis_y = dir_y;
                    if(dir_y==0 && dir_x==0) continue;
                    while (
                        movDentroTablero(elemento,dis_x,dis_y)
                        && casillaFinalValida(tablero,elemento,dis_x,dis_y,piezasEnemigas)
                    ){
                        movimiento.pieza = elemento.pieza;
                        movimiento.tipoMov = "";
                        movimiento.fromRow = elemento.fila;
                        movimiento.fromColumn = elemento.columna;
                        movimiento.toRow = elemento.fila+dis_y;
                        movimiento.toColumn = elemento.columna+dis_x;
                        movimiento.puntajeMov = 0;
                        
                        if(tablero[movimiento.toRow][movimiento.toColumn]==" "){
                            movimiento.tipoMov = "mover";
                            movimiento.puntajeMov = calcularPuntaje(elemento.pieza,"mover");
                        } else {
                            movimiento.tipoMov = "comer";
                            movimiento.puntajeMov = calcularPuntaje(tablero[movimiento.toRow][movimiento.toColumn],"comer");
                        }
                        movimientosPosibles.push(JSON.parse(JSON.stringify(movimiento)))
                        if(tablero[elemento.fila+dis_y][elemento.columna+dis_x]!=" ") break;
                        dis_x+=dir_x;
                        dis_y+=dir_y;
                        
                    }
                }
            }
            break;
            
        case "k":
        case "K":
            var dis_x; // desplazamiento horizontal
            var dis_y; // desplazamiento vertical
            for (var dir_x=-1; dir_x < 2; dir_x++) {
                for (var dir_y=-1; dir_y < 2; dir_y++) {
                    //Las direcciones representan la direccion del mov, siendo -1 izq o abajo y 1 derecha o arriba
                    dis_x = dir_x;
                    dis_y = dir_y;
                    if(dir_y==0 && dir_x==0) continue;
                    while (
                        movDentroTablero(elemento,dis_x,dis_y)
                        && casillaFinalValida(tablero,elemento,dis_x,dis_y,piezasEnemigas)
                        && dis_x<2 && dis_y<2 //Como es rey, el incremento solo puede ser 1
                    ){
                        movimiento.pieza = elemento.pieza;
                        movimiento.fromRow = elemento.fila;
                        movimiento.fromColumn = elemento.columna;
                        movimiento.toRow = elemento.fila+dis_y;
                        movimiento.toColumn = elemento.columna+dis_x;
                        movimiento.tipoMov = "";
                        movimiento.puntajeMov = 0;

                        if(tablero[movimiento.toRow][movimiento.toColumn]==" "){
                            movimiento.tipoMov = "mover";
                            movimiento.puntajeMov = calcularPuntaje(elemento.pieza,"mover");
                        } else {
                            movimiento.tipoMov = "comer";
                            movimiento.puntajeMov = calcularPuntaje(tablero[movimiento.toRow][movimiento.toColumn],"comer");
                        }
                        movimientosPosibles.push(JSON.parse(JSON.stringify(movimiento)))
                        if(tablero[elemento.fila+dis_y][elemento.columna+dis_x]!=" ") break;
                        dis_x+=dir_x;
                        dis_y+=dir_y;
                        
                    }
                }
            }
            break;
        
        default:
            break;
    }
}



function seleccionarMejorMovimiento(movimientosPosibles){

    var mejorMov = movimientosPosibles.reduce((prev,current)=>{
        if (prev.puntajeMov > current.puntajeMov){
            return prev;
        } else if (prev.puntajeMov < current.puntajeMov){
            return current;
        } else {
            return Math.random() >= 0.5 ? prev : current; 
        }
    })
    return mejorMov
}

function movDentroTablero(elemento,dis_x,dis_y){
    return (
        elemento.fila+dis_y>=0 &&
        elemento.columna+dis_x>=0 && 
        elemento.fila+dis_y<=15 && 
        elemento.columna+dis_x<=15
        ? true 
        : false
    )
}

function casillaFinalValida(tablero,elemento,dis_x,dis_y,piezasEnemigas){
    return (
    tablero[elemento.fila+dis_y][elemento.columna+dis_x]==" " || //Si la casilla final esta vacia
    piezasEnemigas.includes(tablero[elemento.fila+dis_y][elemento.columna+dis_x]) //O tiene una pieza enemiga
    ? true
    : false
    )
}

module.exports = {
    getMovimientosPosibles: getMovimientosPosibles,
    seleccionarMejorMovimiento: seleccionarMejorMovimiento,
};