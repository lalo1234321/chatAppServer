
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function () {
    // this.toObject apunta a la instancia del objeto que tenemos creado en este momento
    // operador rest, las demás propiedades serán almacenadas en un objeto llamado object
    const { __v, _id, password, ...object } = this.toObject();
    object.iud = _id;
    // Es decir cuando se mande a llamar el toJSON, este mismo se llama cuando usamos el JSON()
    // entonces va a regresar el objecto que tiene el uid y todas las propiedades que no incluí
    return object;
});

module.exports = model('Usuario', UsuarioSchema);


