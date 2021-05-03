const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    msg: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

MensajeSchema.method('toJSON', function () {
    // this.toObject apunta a la instancia del objeto que tenemos creado en este momento
    // operador rest, las demás propiedades serán almacenadas en un objeto llamado object
    const { __v, _id, ...object } = this.toObject();
    object.iud = _id;
    // Es decir cuando se mande a llamar el toJSON, este mismo se llama cuando usamos el JSON()
    // entonces va a regresar el objecto que tiene el uid y todas las propiedades que no incluí
    return object;
});

module.exports = model('Mensaje', MensajeSchema);