 //let titulo = document.querySelector("h1");
/* Para manipular elementos del documento HTML que tenemos se utiliza el operador "document" lo que vuekve esta linea un "objeto"
 y junto con el ".querySelector" nos permite traer partes especificas de el html y manejarlo en JavaScript*/ 

 //titulo.innerHTML = "Juego del número secreto";
// el "innerHTML se utiliza para obtener o establecer el contenido HTML de un elemento. "

//let parrafo = document.querySelector("p");
//parrafo.innerHTML = "indica un número del 1 al 10";

//lo que se hizo para no repetir el codigo fue convertir las primeras dos lineas en una funcion llamada "asignarTextoElemento"
let numeroSecreto = 0;
let intentos = 0;
let listaNumeroSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) 
{
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

    if (numeroDeUsuario === numeroSecreto)//condicion si ambos numeros son iguales
    {
        asignarTextoElemento ("p" , `Acertaste el número en ${intentos} ${(intentos == 1)  ? "vez"  : "veces"}`);//en caso positivo se muestra este mensaje utilizando la funcion previamente declarada "asignarTextoElemento" alterando su "valor" que en este caso seria el texo
        document.getElementById("reiniciar").removeAttribute("disabled");//"activamos" el boton de nuevo juego removiendo su atributo previo "disabled"
    } //utilizamos template strins para ggenerar variables dentro del texto haciendo que dependiendo de la cantidad de intentos se diga vez o veces el "?" y ":" son abrebiaciones del if y else 
//a esto se le llama operador ternario 

        else//en caso de que no se cumple esta condicion
    {
        if(numeroDeUsuario > numeroSecreto) //se crea una segunda condicion , si el numero del usuario es mayor al numero secreto 
        {
            asignarTextoElemento("p" , "El número secreto es menor");//si esta condicion se cumple se muestra este mensaje utilizando el metodo anterior
        } else//y si no
        {
            asignarTextoElemento("p" , "El número secreto es mayor");//se muestra este otro 
        }
        intentos++;//cada que falle se aumentara en 1 la cantidad de intentos
        limpiarCaja();//como esta condicion es en caso de que el usuario no acierte, se coloca la funcion limpiarCaja dentro de esta condicion para que cuimpla su proposito 

    }
    return;

}

  function limpiarCaja()//primero generamos la funcion de limpiarCaja con el objetivo de que limpie el espacio donde se coloca el numero en caso de que el usuario no acierte
  {
   document.querySelector("#valorUsuario").value = ";"//version reducida de lo de abajo 
  //el queryselector al colocar el parametero # le hacemos entender que queremos que seleccione por ID
  //valorCaja.value = "";//hacemos que el valor en caso de cumplirse la funcion sea vacio, o que lo "limpie"
  }
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    //si ya sorteamos todos los numeros disponibles
    if (listaNumeroSorteados.length == numeroMaximo)
    {
        asignarTextoElemento("p" , "Ya se sotearon todos los números posibles");//condicion de salida
    } else 
    {
      //si el numero generado esta en la lista
        if (listaNumeroSorteados.includes(numeroGenerado))
        {
            return generarNumeroSecreto();
        }
        
            {
             listaNumeroSorteados.push(numeroGenerado);
                return numeroGenerado;
            }//se utuliza la recursividad para evitrar crear funciones por cada posible conbinacion y evitar que el juego nos arroje el mismo numero dos veces seguidas
    }
}

function condicionesIniciales()
{
    asignarTextoElemento("h1", "Juego del número secreto");
    asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;

}

function reiniciarJuego()
{
//limpiar caja
limpiarCaja();
//indicar mensaje de intervalo de números 
//generar el número aleatorio
//inicializar el numero de intentos
condicionesIniciales();
//deshabilitar el boton de nuevo juego
document.querySelector("#reiniciar").setAttribute("disable" , "true");

}


condicionesIniciales();