class JogoDaMemoria {
    
    constructor({ tela, util }) {
        this.tela = tela,
        this.util = util

        this.heroisIniciais = [
            { img: './arquivos/batman.png', nome: 'batman'},
            { img: './arquivos/aranha.png', nome: 'aranha'},
            { img: './arquivos/superman.png', nome: 'superman'},
            { img: './arquivos/volve.png', nome: 'volve'},
        ]
        this.iconePadrao = './arquivos/padrao.png'
        this.heroisEscondidios = []
        this.heroisSelecionados = [] 
        
    }

    inicializar() {
        this.tela.atualizarImagens(this.heroisIniciais)
        this.tela.configurarBotaoJogar(this.jogar.bind(this)) 
        // bind obj e de mante as variavel dessa class tbm na outra no caso na tela, quando ela for exercutar
        // la na tela o this tela o inicializar vai ter os heroisIniciaias ...
        this.tela.configurarBotaoVerificaSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostraTudo(this.mostrarHeroisEscondidos.bind(this))
    }
    async empalharar(){
        const copias = this.heroisIniciais
        .concat(this.heroisIniciais)
        .map(item=>{
            return Object.assign({}, item, {id: Math.random() / 0.5}) 
        })
        //ordernar, aleatorio
        .sort(()=> Math.random()-0.5)

        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idDoIntervalo = this.tela.iniciarContador()
        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
    }

    

    esconderHerois(herois){
        const heroisOcultos = herois.map(({id, nome})=>({
            id,
            nome,
            img: this.iconePadrao
        }))
        this.tela.atualizarImagens(heroisOcultos) 
        this.heroisEscondidos = heroisOcultos
    }

    exibirHerois(nomeDoHeroi){
        const {img} = this.heroisIniciais.find(({nome}) => nomeDoHeroi === nome)
        this.tela.exibirHerois(nomeDoHeroi, img)

    }
    verificarSelecao(id, nome){
        const item ={id, nome}
        const heroisSelecionados = this.heroisSelecionados.length
        switch(heroisSelecionados){
            case 0:
                this.heroisSelecionados.push(item)
                break;
            case 1:
                const [opcao1] = this.heroisSelecionados
                this.heroisSelecionados = []
                if(opcao1.nome === item.nome && opcao1.id !== item.id){
                    this.exibirHerois(item.nome)
                    this.tela.exibirMensagem()
                    return;
                }
                this.tela.exibirMensagem(false)
                break;


        }
    }

    mostrarHeroisEscondidos(){
        const heroisEscondidos = this.heroisEscondidos
        for(const heroi of heroisEscondidos){
            const {img} = this.heroisIniciais.find(item=> item.nome === heroi.nome)
            heroi.img = img 
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }

    jogar(){
        this.empalharar()
    }

}