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

    if(expressoes.length >= 24){
        return
    }

    organizarOperacoes()

    expressoesTexto = expressoes.join('')
    visor.value = expressoesTexto
}

function calcular(){
    potenciacao()
    logaritmo()
    numeroPi()
    numeroE()
    fatorial()

    expressoesTexto = expressoes.join('')
    console.log(expressoes)

    try {
        visor.value = eval(expressoesTexto)

        if(visor.value == 'NaN'){
            visor.value = 'Indeterminado'
        }
    } catch (error) {
        visor.value = 'Erro!! Verifique a sintaxe'
    }

    expressoes = []
    expressoesTexto = ''
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
            var indiceInicioBase = determinarIndiceParentesesFechamento(indiceOperacao - 1, ')')
            var indiceFinalBase = indiceOperacao - 1
    
            indiceInicioCorte = indiceInicioBase
    
            for(var j = indiceInicioBase + 1; j < indiceFinalBase; j++){
                base.push(expressoes[j])
            }
        }
        else{
            indiceInicioCorte = determinarIndiceOperacaolimitante(indiceOperacao, -1)

            for(var k = determinarIndiceOperacaolimitante(indiceOperacao, -1); k < indiceOperacao; k++){
                base.push(expressoes[k])
            }
        }

        if(expressoes[indiceOperacao + 1] == '('){
            var indiceInicioExpoente = indiceOperacao + 1
            var indiceFinalExpoente = determinarIndiceParentesesFechamento(indiceOperacao + 1, '(')
    
            indiceFinalCorte = indiceFinalExpoente
    
            for(var j2 = indiceInicioExpoente + 1; j2 < indiceFinalExpoente; j2++){
                expoente.push(expressoes[j2])
            }
        }
        else{
            indiceFinalCorte = determinarIndiceOperacaolimitante(indiceOperacao, 1) - 1
            for(var k = indiceOperacao + 1; k < determinarIndiceOperacaolimitante(indiceOperacao, 1); k++){
                expoente.push(expressoes[k])
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
            indiceFinalLog = determinarIndiceParentesesFechamento(indiceInicioLog, '(')

            if(expressoes[indiceFinalLog + 1] == '('){
                for(var j2 = indiceInicioLog + 1; j2 < indiceFinalLog;  j2++){
                    baseLog.push(expressoes[j2])
                }

                for(var j3 = indiceFinalLog + 2; j3 < determinarIndiceParentesesFechamento(indiceFinalLog + 1, '('); j3++){
                    logaritmando.push(expressoes[j3])
                }

                indiceFinalLog = determinarIndiceParentesesFechamento(indiceFinalLog + 1, '(')
            }
            else{
                baseLog.push('10')

                for(var j4 = indiceInicioLog + 1; j4 < indiceFinalLog;  j4++){
                    logaritmando.push(expressoes[j4])
                }
            }
        }
        else{
            indiceFinalLog = determinarIndiceOperacaolimitante(indiceLog, 1) + 1

            for(var k = indiceLog + 1; k < determinarIndiceOperacaolimitante(indiceLog, 1); k++){
                logaritmando.push(expressoes[k])
            }
            baseLog.push('10')
        }

        logaritmoResultado = ['Math.log', '(']
        logaritmoResultado = logaritmoResultado.concat(logaritmando)
        logaritmoResultado.push(')', '/', 'Math.log', '(')
        logaritmoResultado = logaritmoResultado.concat(baseLog)
        logaritmoResultado.push(')')

        var parte1Log = []
        var parte2Log = []

        for(var n = 0; n < indiceLog; n++){
            parte1Log.push(expressoes[n])
        }

        for(var n2 = indiceFinalLog + 1; n2 < expressoes.length; n2++){
            parte2Log.push(expressoes[n2])
        }

        expressoes = parte1Log.concat(logaritmoResultado, parte2Log)

        parte1Log = []
        parte2Log = []
        baseLog = []
        logaritmando = []
    }
}

function numeroPi(){
    var qtdePi = 0
    var indicePi = 0

    for(var i = 0; i < expressoes.length; i++){
        if(expressoes[i] == String.fromCharCode(960)){
            qtdePi++
        }
    }

    for(var i = 0; i < qtdePi; i++){
        for(var j = 0; j < expressoes.length; j++){
            if(expressoes[j] == String.fromCharCode(960)){
                indicePi = j
            }
        }

        expressoes[indicePi] = 'Math.PI'
    }

}

function numeroE(){
    var qtdeE = 0
    var indiceE = 0

    for(var i = 0; i < expressoes.length; i++){
        if(expressoes[i] == 'e'){
            qtdeE++
        }
    }

    for(var i = 0; i < qtdeE; i++){
        for(var j = 0; j < expressoes.length; j++){
            if(expressoes[j] == 'e'){
                indiceE = j
            }
        }

        expressoes[indiceE] = 'Math.E'
    }

}

function fatorial(){
    var qtdeFat = 0
    var indiceFat = 0
    var expressaoFatorial = []
    var fatorialResultado = []

    for(var i = 0; i < expressoes.length; i++){
        if(expressoes[i] == '!'){
            qtdeFat++
        }
    }

    for(var i = 0; i < qtdeFat; i++){
        var indiceInicioFat = null
        var indiceFinalFat = null

        for(var j = 0; j < expressoes.length; j++){
            if(expressoes[j] == '!'){
                indiceFat = j
            }
        }

        if(expressoes[indiceFat + 1] == '('){
            indiceInicioFat = indiceFat + 1
            indiceFinalFat = determinarIndiceParentesesFechamento(indiceInicioFat, '(')

            for(var j = indiceInicioFat + 1; j < indiceFinalFat; j++){
                expressaoFatorial.push(expressoes[j])
            }
        }

        fatorialResultado = ['calcularFatorial', '(']
        fatorialResultado = fatorialResultado.concat(expressaoFatorial)
        fatorialResultado.push(')')

        var parte1Fat = []
        var parte2Fat = []

        for(var j = 0; j < indiceFat; j++){
            parte1Fat.push(expressoes[j])
        }

        for(var j = indiceFinalFat + 1; j < expressoes.length; j++){
            parte2Fat.push(expressoes[j])
        }

        expressoes = parte1Fat.concat(fatorialResultado, parte2Fat)

        expressaoFatorial = []
        parte1Fat = []
        parte2Fat = []
        fatorialResultado = []
    }
}

function calcularFatorial(n){
    if(n == 1 || n == 0){
        return 1
    }
    else{
        return n * calcularFatorial(n - 1)
    }
}

function determinarIndiceParentesesFechamento(valor, direcao){
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

function determinarIndiceOperacaolimitante(indiceElemento, direcao){
    var indiceOperacoes = []
    var indiceElementoNasOperacoes = null
    var indiceLocal = null
    var indiceRetorno = null

    for(var i = 0; i < expressoes.length; i++){
        if(!(parseFloat(expressoes[i])) && expressoes[i] != 0){
            indiceOperacoes.push(i)
        }
    }

    indiceElementoNasOperacoes = indiceOperacoes.indexOf(indiceElemento)

    if(direcao == -1){
        if(indiceElementoNasOperacoes == 0){
            return 0
        }

        indiceLocal = indiceElementoNasOperacoes - 1
        indiceRetorno = indiceOperacoes[indiceLocal] + 1
    }

    if(direcao != -1){
        if(indiceElementoNasOperacoes == indiceOperacoes.length - 1){
            return expressoes.length
        }

        indiceLocal = indiceElementoNasOperacoes + 1
        indiceRetorno = indiceOperacoes[indiceLocal]
    }

    return indiceRetorno
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


