class Util{
    static timeout(tempo){
        return new Promise(resolve => setTimeout(resolve, tempo))
        // resolve o setTimeout
    }
}