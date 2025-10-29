class Persona {
    constructor(nombre) {
        this.nombre = nombre;
    }

    static variableEstatica = 'Soy una variable estática';

    // getNombre() {
    //     return this.nombre;
    // }

    getNombre = () => {
        return this.nombre;
    }
}

const instancia1 = new Persona('Carlos');
const instancia2 = new Persona('María');

console.log(instancia1.getNombre());
console.log(instancia2.getNombre());

console.log(Persona.variableEstatica);
