//Child class (clase hij@)
class Egreso extends Dato{

    static conEgresos = 0;

    constructor(description, valor){
        //llamar constructor de clase padre
        super(description, valor);
        this._id = ++Egreso.conEgresos;
    }
    get id(){
        return this._id;
    }
}