const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        unique: true
    },
    message: {
        type: String,
        requered: true
    }
}, {
    timestamps: true
});

MensajeSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('Message', MensajeSchema);