//Class Main (clase padre)
class Dato{
    constructor(description, valor){
        this._descripction = description;
        this._valor = valor;
    }
    get description(){
        return this._descripction;
    }
    get valor(){
        return this._valor;
    }
    set description(description){
        this._descripction = description;
    }
    set valor(valor){
        this._valor = valor;
    }
}