function onLoad () {
   const dependencias = {
       tela: Tela,
       util: Util
       // para tonar a glasse Globa e usar elas no jogoDaMemoria
   }

   const jogoDaMemoria = new JogoDaMemoria(dependencias)
   jogoDaMemoria.inicializar()
}

window.onload = onLoad