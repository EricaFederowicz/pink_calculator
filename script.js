/* let, const e var sao formas de declarar uma variavel. var tem escopo global se for declarada fora de uma funcao e let tem escopo de bloco. */

let numeroAtual = "";
let operacaoAtual = null;
let numeroAnterior = "";

/* funcao somaNumero serve para concatenar dois numeros como se fossem str ao inves de somar. Por exemplo: 1+2 = 12 ao inves de = 3. Serve para o usuario poder formar numeros com mais de 1 digito. */
function somaNumero (number) {
    numeroAtual = numeroAtual.toString() + number.toString(); /* toString retorna uma representacao em str de uma str */
    updateDisplay();
}

function limpaVisor () {
    numeroAtual = "";
    numeroAnterior = "";
    operacaoAtual = null; /* null representa a ausencia intencional de valor na variavel */
    updateDisplay();
}

function calcular () {
    let resultado;
    const anterior = parseFloat(numeroAnterior) /* const é para variaveis constantes */
    const atual = parseFloat(numeroAtual)

    if (isNaN(anterior) || isNaN(atual)) return; /* || é o operador lógico que retorna true se pelo menos uma das expressoes for verdadeira. O isNaN verifica se o valor passado nao é um numero, se nao for ele vai retornar true. Se a expressao for de valor true entao nada sera retornado, encerrando a funcao calcular. */


    /* o switch é estrutura de controle condicional usada quando se tem muitas alternativas a serem testadas. Neste caso ela verifica qual foi o sinal passado na variavel operacaoAtual. */
    switch (operacaoAtual) {
        case '+': 
            resultado = anterior + atual;
            break
        /* caso o sinal passado na operacaoAtual seja + entao ele executará esta linha de código e depois o brak, saindo da funcao calcular. */
        case '-':
            resultado = anterior - atual;
            break
        case '*':
            resultado = anterior * atual;
            break
        case '/':
            resultado = anterior / atual;
            break
        default:
            return;
        /* no caso de nao ser nenhum dos sinais anteriores, a funcao retornara undifined, encerrando a funcao. */
    }

    numeroAtual = resultado; /* transforma o resultado da operacao no novo numero atual. */
    operacaoAtual = null; /* retorna a operacao atual ao estado nulo. */
    numeroAnterior = ""; /* limpa o numero anterior. */
    updateDisplay();
}

/* funcao serve para mostar no visor o numero atual. */
function updateDisplay() {
    document.getElementById("display").value = numeroAtual;
}


document.addEventListener("DOMContentLoaded", function() {
    const numberButtons = document.querySelectorAll("[data-number]"); /* seleciona todos os buttoms com atributo data-number e faz uma lista. */
    const operationButtons = document.querySelectorAll("[data-operation]"); /* seleciona todos os buttoms com o atributo data-operation e faz uma lista. */
    const equalsButton = document.getElementById("igual"); /* seleciona o elemento com id= igual */
    const clearButton = document.getElementById("limpa"); /* seleciona o elemento com id= limpa */

    /* percorre a lista numberButtons, e executa o codigo para cada item da lista. */
    numberButtons.forEach(button => {
        /* addEventListener("click") faz com que o arquivo js saiba quando o botao for clicado. O parametro function() define a acao que sera executada quando houver o clique. */
        button.addEventListener("click", function() {
            somaNumero(button.getAttribute("data-number"));
            /* a funcao somaNumero vai receber o valor data-number atribuido ao buttom que foi clicado */
        });
    });

    /* percorre a lista operationButtons, e pra cada item da lista aplica o codigo. */
    operationButtons.forEach(button => {
        /* deixa o js saber quando o botao for clicado e executa a funcao chamada quando for. */
        button.addEventListener("click", function() {
            defineOperacao(button.getAttribute("data-operation"));
            /* atribui o data-operation do botao clicado a variavel defineOperacao */
        });
    });

    /* quando o botao = for clicado a funcao calcular é chamada. */
    equalsButton.addEventListener("click", calcular);
    /* quando o botao C for clicado a funcao limpaVisor é chamada. */
    clearButton.addEventListener("click", limpaVisor);
});

function defineOperacao(operation) {
    /* se a variavel numeroAtual for igual em valor e tipo a uma str vazia a funcao defineOperecao retorna undefined e é encerrada. */
    if (numeroAtual === "") return;
    /* se a variavel numeroAnterior for diferente em valor e tipo de uma str vazia entao a funcao calcular sera chamada. */
    if (numeroAnterior !== "") {
        calcular();
    }
    operacaoAtual = operation;
    /* atribui o valor de numeroAtual a numeroAnterior */
    numeroAnterior = numeroAtual;
    /* limpa o valor atribuido a numeroAtual. */
    numeroAtual = "";
}

