var visor = document.getElementById('visor')
var expressoes = []
var operacoes = ['+', '-', '*', '/']
var operacoesEspeciais = ['^(', '\u221A' + '(', '!(', 'log(']
var expressoesTexto = ''


function inserirValor(){
    if(expressoes.length >= 24){
        return
    }

    expressoes.push(arguments[1])

    var ultimoCaractere = expressoes.slice(-1)[0]
    var penultimoCaractere = expressoes.slice(-2)[0]

            if(penultimoCaractere == '*' && ultimoCaractere == '*'){
                ultimoCaractere = '^'
                expressoes.pop()
                expressoes[expressoes.length - 1] = ultimoCaractere
                expressoes.push('(')
            }

            if(penultimoCaractere == '/' && ultimoCaractere == '/'){
                ultimoCaractere = '\u221A'
                expressoes.pop()
                expressoes[expressoes.length - 1] = ultimoCaractere
                expressoes.push('(')
            }

            if(penultimoCaractere == '+' && ultimoCaractere == '+'){
                ultimoCaractere = '!'
                expressoes.pop()
                expressoes[expressoes.length - 1] = ultimoCaractere
                expressoes.push('(')
            }

            if(penultimoCaractere == '-' && ultimoCaractere == '-'){
                ultimoCaractere = 'log'
                expressoes.pop()
                expressoes[expressoes.length - 1] = ultimoCaractere
                expressoes.push('(')
            }

    expressoesTexto = expressoes.join('')
    visor.value = expressoesTexto

}

function apagar(){
    expressoes.pop()
    expressoesTexto = expressoes.join('')
    visor.value = expressoesTexto
}

function limpar(){
    expressoes = ''
    visor.ariaPlaceholder = '0'
}

function calcular(){
    var indices = []
    var base = []
    var expoente = []

    for(var i = 0; i < expressoes.length; i++){
        if(expressoes[i] == '^'){
            indices.push(i)
        }
    }

    if(expressoes[indices[0] - 1] == ')'){
        var indiceInicio = organizarParenteses(indices[0] - 1)
        var indiceFinal = indices[0] - 1

        console.log('inicio: ' + indiceInicio + ' | ' + 'fim: ' + indiceFinal)
    }
}

function organizarParenteses(valor){
    var parenteses = []
    var indicesParenteses = []

    for(var i = 0; i < expressoes.length; i++){
        if(expressoes[i] == '(' || expressoes[i] == ')'){
            parenteses.push(expressoes[i])
            indicesParenteses.push(i)
        }
    }

    var cont = 1
    var indiceElemento = indicesParenteses.indexOf(valor)
    var indiceProcurado = []

    for(var i = indiceElemento - 1; i >= 0; i--){
        if(parenteses[i] == ")"){
            cont++
        }
        else{
            cont--
        }

        if(cont == 0){
            indiceProcurado.push(indicesParenteses[i])
        }

        console.log('cont: ' + cont)
    }

    return indiceProcurado[0]



    console.log('indice: ' + indicesParenteses)
    console.log(parenteses)
    console.log('indices procurados:' + indiceProcurado)
}



