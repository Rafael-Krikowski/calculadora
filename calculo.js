var visor = document.getElementById('visor')
var expressoes = []
var operacoes = ['+', '-', '*', '/']
var expressoesTexto = ''


function inserirValor(){
    if(expressoes.length >= 24){
        return
    }

    expressoes.push(arguments[1])

    var ultimoCaractere = expressoes.slice(-1)[0]
    var penultimoCaractere = expressoes.slice(-2)[0]

    if( operacoes.includes(penultimoCaractere) &&
        operacoes.includes(ultimoCaractere)){
            if(penultimoCaractere == '*' && ultimoCaractere == '*'){
                ultimoCaractere = '^('
            }

            if(penultimoCaractere == '/' && ultimoCaractere == '/'){
                ultimoCaractere = '\u221A' + '('
            }

            if(penultimoCaractere == '+' && ultimoCaractere == '+'){
                ultimoCaractere = '!('
            }

            if(penultimoCaractere == '-' && ultimoCaractere == '-'){
                ultimoCaractere = 'log('
            }
            
            expressoes.pop()
            expressoes[expressoes.length - 1] = ultimoCaractere
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
    console.log(expressoes)
}


