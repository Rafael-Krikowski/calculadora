var visor = document.getElementById('visor')
var expressoes = []
var expressoesTexto = ''

function inserirValor(){
    if(arguments[0] == 'pi'){
        expressoes.push(String.fromCharCode(960))
    }
    else{
        expressoes.push(arguments[0])
    }

    console.log(expressoes)

    organizarOperacoes()

    if(expressoes.length >= 24){
        return
    }

    expressoesTexto = expressoes.join('')
    visor.value = expressoesTexto
}

function calcular(){
    potenciacao()
    logaritmo()
}

function potenciacao(){
    var qtdeOperacoes = 0
    var indiceOperacao = 0
    var base = []
    var expoente = []
    var potencia = []

    for(var i = 0; i < expressoes.length; i++){
        if(expressoes[i] == '^'){
            qtdeOperacoes++
        }
    }

    for(var i2 = 0; i2 < qtdeOperacoes; i2++){
        var indiceInicioCorte = null
        var indiceFinalCorte = null

        for(var n = 0; n < expressoes.length; n++){
            if(expressoes[n] == '^'){
                indiceOperacao = n
            }
        }

        if(expressoes[indiceOperacao - 1] == ')'){
            var indiceInicioBase = organizarParenteses(indiceOperacao - 1, ')')
            var indiceFinalBase = indiceOperacao - 1
    
            indiceInicioCorte = indiceInicioBase
    
            for(var j = indiceInicioBase + 1; j < indiceFinalBase; j++){
                base.push(expressoes[j])
            }
        }

        if(expressoes[indiceOperacao + 1] == '('){
            var indiceInicioExpoente = indiceOperacao + 1
            var indiceFinalExpoente = organizarParenteses(indiceOperacao + 1, '(')
    
            indiceFinalCorte = indiceFinalExpoente
    
            for(var j2 = indiceInicioExpoente + 1; j2 < indiceFinalExpoente; j2++){
                expoente.push(expressoes[j2])
            }
        }

        potencia = ['Math.pow', '(']
        potencia = potencia.concat(base)
        potencia.push(',')
        potencia = potencia.concat(expoente)
        potencia.push(')')

        base = []
        expoente = []

        var parte1 = []
        var parte2 = []

        for(var i3 = 0; i3 < indiceInicioCorte; i3++){
            parte1.push(expressoes[i3])
        }

        for(var i4 = indiceFinalCorte + 1; i4 < expressoes.length; i4++){
            parte2.push(expressoes[i4])
        }
        
        expressoes = parte1.concat(potencia, parte2)
        expressoesTexto = expressoes.join('')
    }

    console.log(expressoesTexto)
}

function logaritmo(){
    var qtdeOperacoesLog = 0
    var indiceLog = 0

    var logaritmoResultado = []
    var logaritmando = []
    var baseLog = []

    for(var i = 0; i < expressoes.length; i++){
        if(expressoes[i] == 'log'){
            qtdeOperacoesLog++
        }
    }

    for(var i = 0; i < qtdeOperacoesLog; i++){
        var indiceInicioLog = null
        var indiceFinalLog = null

        for(var j = 0; j < expressoes.length; j++){
            if(expressoes[j] == 'log'){
                indiceLog = j
            }
        }

        if(expressoes[indiceLog + 1] == '('){
            indiceInicioLog = indiceLog + 1
            indiceFinalLog = organizarParenteses(indiceLog + 1, '(')

            if(expressoes[indiceFinalLog + 1] == '('){
                for(var j2 = indiceInicioLog + 1; j2 < indiceFinalLog;  j2++){
                    baseLog.push(expressoes[j2])
                }

                for(var j3 = indiceFinalLog + 2; j3 < organizarParenteses(indiceFinalLog + 1, '('); j3++){
                    logaritmando.push(expressoes[j3])
                }
            }
            else{
                baseLog.push('10')

                for(var j4 = indiceInicioLog + 1; j4 < indiceFinalLog;  j4++){
                    logaritmando.push(expressoes[j4])
                }
            }
        }

        logaritmoResultado = ['Math.log', '(']
        logaritmoResultado = logaritmoResultado.concat(logaritmando)
        logaritmoResultado.push(')', '/', 'Math.log', '(')
        logaritmoResultado = logaritmoResultado.concat(baseLog)
        logaritmoResultado.push(')')

        console.log(baseLog)
        console.log(logaritmando)
        console.log(logaritmoResultado)
    }

    console.log(expressoes)
}

function organizarParenteses(valor, direcao){
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

    if(direcao == ')'){
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
        }
    }

    if(direcao == '('){
        for(var i = indiceElemento + 1; i < expressoes.length; i++){
            if(parenteses[i] == '('){
                cont++
            }
            else{
                cont--
            }

            if(cont == 0){
                indiceProcurado.push(indicesParenteses[i])
            }
        }
    }

    return indiceProcurado[0]
}

function organizarOperacoes(){
    if( expressoes[expressoes.length - 1] == '+' &&
    expressoes[expressoes.length - 2] == '+'){
        expressoes.pop()
        expressoes.pop()
        expressoes.push('-')
    }

    if( expressoes[expressoes.length - 1] == '+' &&
        expressoes[expressoes.length - 2] == '-'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('+')
    }

    if( expressoes[expressoes.length - 1] == '*' &&
        expressoes[expressoes.length - 2] == '*'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('/')
    }

    if( expressoes[expressoes.length - 1] == '*' &&
        expressoes[expressoes.length - 2] == '/'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('*')
    }

    if( expressoes[expressoes.length - 1] == '+' &&
        expressoes[expressoes.length - 2] == '*'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('+')
    }

    if( expressoes[expressoes.length - 1] == '*' &&
        expressoes[expressoes.length - 2] == '+'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('*')
    }

    if( expressoes[expressoes.length - 1] == '/' &&
        expressoes[expressoes.length - 2] == '+'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('/')
    }

    if( expressoes[expressoes.length - 1] == '+' &&
        expressoes[expressoes.length - 2] == '/'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('+')
    }

    if( expressoes[expressoes.length - 1] == '/' &&
        expressoes[expressoes.length - 2] == '-'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('/')
    }

    if( expressoes[expressoes.length - 1] == '-' &&
        expressoes[expressoes.length - 2] == '/'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('-')
    }

    if( expressoes[expressoes.length - 1] == '*' &&
        expressoes[expressoes.length - 2] == '-'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('*')
    }

    if( expressoes[expressoes.length - 1] == '-' &&
        expressoes[expressoes.length - 2] == '*'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('-')
    }

    if( expressoes[expressoes.length - 1] == '^' &&
        expressoes[expressoes.length - 2] == '^'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('log')
    }

    if( expressoes[expressoes.length - 1] == '^' &&
        expressoes[expressoes.length - 2] == 'log'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('!')
    }

    if( expressoes[expressoes.length - 1] == '^' &&
        expressoes[expressoes.length - 2] == '!'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('^')
    }

    if( expressoes[expressoes.length - 1] == '.' &&
        expressoes[expressoes.length - 2] == '.'){
            expressoes.pop()
            
    }

    if( expressoes[expressoes.length - 1] == String.fromCharCode(960) &&
        expressoes[expressoes.length - 2] == String.fromCharCode(960)){
            expressoes.pop()
            expressoes.pop()
            expressoes.push('e')
            
    }

    if( expressoes[expressoes.length - 1] == String.fromCharCode(960) &&
        expressoes[expressoes.length - 2] == 'e'){
            expressoes.pop()
            expressoes.pop()
            expressoes.push(String.fromCharCode(960))
            
    }
}

function apagar(){
    expressoes.pop()
    expressoesTexto = expressoes.join('')
    visor.value = expressoesTexto
}

function limpar(){
    expressoes = []
    expressoesTexto = expressoes.join('')
    visor.value = expressoesTexto
    visor.ariaPlaceholder = '0'
}


