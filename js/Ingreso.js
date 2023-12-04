//Child Class (clase hij@)
class Ingreso extends Dato{

    static conIngresos = 0;

    constructor(description, valor){
        //llamar constructor de clase padre
        super(description, valor);
        this._id = ++Ingreso.conIngresos;
    }
    get id(){
        return this._id;
    }
}