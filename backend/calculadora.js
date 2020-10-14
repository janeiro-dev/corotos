'use strict'
var parametros=process.argv.slice(2);

var numero1=parseFloat(parametros[0]);
var numero2=parseFloat(parametros[1]);

var operaciones=`
sumar:${numero1+numero2}
resta:${numero1-numero2}
multiplicacion:${numero1*numero2}
division:${numero1/numero2}
`;

console.log(operaciones);
// NOTE:

// NOTE: var pNombre=parametros[0];
// NOTE: var pApellido=parametros[1];
// NOTE: var sApellido=parametros[2];
// NOTE: var edad=parametros[3];
// NOTE: var correo=parametros[4];



// NOTE: console.log("Tu primer nombre es:"+pNombre+" Tus apellidos son:"+pApellido+" "+sApellido+" Tu edad es:"+edad+" años"+" y Tu correo electronico es:"+correo);



console.log("hola mundo");
