

//script que me retorne o IMC
var imc = function (peso, altura) {
    return peso / (altura * altura);
}

var peso = parseFloat(prompt("Digite seu peso: "));
var altura = parseFloat(prompt("Digite sua altura: "));

console.log("Seu IMC é: " + imc(peso, altura));
//
