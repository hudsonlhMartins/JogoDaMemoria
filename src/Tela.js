const util = Util

const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = 'jogar'
const ID_MENSAGEM = 'mensagem'
const CLASSE_INVISIBLE = 'invisible'
const ID_CARREGANDO = 'carregando'
const ID_CONTADOR = 'contador'
const ID_BTN_MOSTRAR_TUDO = 'mostrarTudo'

const MENSAGENS = {
    sucesso: {
        texto: 'Combinação Certa, Vc é Bom',
        classe: 'alert-success' // qual classe do bootstrap ele vai usar
    },
    erro:{
        texto: 'Combinaçã Errada, Ai não né Amigo',
        classe: 'alert-danger'
    }
}
class Tela {
    static obterCodigoHtml(item) {
       return `
        <div class="col-md-3">
            <div class="card" style="width: 50%;" onclick=" window.verificaSelecao('${item.id}', '${item.nome}')">
                <img name="${item.nome}" src="${item.img}" class="card-img-top" alt="..." />
            </div>
            <br />
        </div> 
        `
    }
    static configurarBotaoVerificaSelecao(funcaoOnClick){
        window.verificaSelecao = funcaoOnClick
    }
    static alterarConteudoHTML(codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }
    static gerarStringHTMLPelaImagem(itens){
        // map() cada item da lista vai executar o obtercodigoHtml
        // join e para juntar o array ele todo de acordo com o separador que vc escolher, escolhi vazio
        return itens.map(Tela.obterCodigoHtml).join('')
    }
    static atualizarImagens(itens){
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens) 
        Tela.alterarConteudoHTML(codigoHtml)
    }
    static configurarBotaoJogar(funcaoOnClick){
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick
    }
    static exibirHerois(nomeDoHeroi, img){
        const elementosHtml = document.getElementsByName(nomeDoHeroi) // pegar pelo name
        elementosHtml.forEach(item=>(item.src = img)) 
        // para cada item que ele encontar ele vai alterar o src pela img que eu estou passando por parametro
    }
    static async exibirMensagem(sucesso = true){
        // sucesso ja esta recebendo true, e o default, 
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso){
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerHTML = MENSAGENS.sucesso.texto
        }
        else{
            elemento. classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerHTML = MENSAGENS.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIBLE)
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIBLE)
    }

    static exibirCarregando(mostrar = true){
        const carregando =  document.getElementById(ID_CARREGANDO)
        if(mostrar){
            carregando.classList.remove(CLASSE_INVISIBLE)
            return
        }
        carregando.classList.add(CLASSE_INVISIBLE)
    }

    static iniciarContador () {
        let contarAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR)
        // vamos substituir o texto começando $$contador segundos
        // onde esta o $$ contador adicionaremos o valor
        const indentificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${indentificadorNoTexto} segundos`
        // vamos criar um função na linha para atualizar o texto
        // a cada segundo
        const atualizarTexto = () => (elementoContador.innerHTML = textoPadrao.replace(indentificadorNoTexto, contarAte--))
        // replace quer tizer aonde estive indentificadorNoTexto, substituir por isso contarAte--
        atualizarTexto()
        const idDointervalo = setInterval(atualizarTexto, 1000)
        // cada segundo vai chamar a função atualizarTexto, Então todo vez que chmar a função vai da -- e vai diminuir de 3 para 2...
        return idDointervalo
    }
    static limparContador(idDointervalo){
        clearInterval(idDointervalo)
        // para parar o setInterval
        document.getElementById(ID_CONTADOR).innerHTML=""
    }

    static configurarBotaoMostraTudo (funcaoOnClick){
        const BtnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
        BtnMostrarTudo.onclick = funcaoOnClick
    }
}