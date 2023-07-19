const mongoose = require('mongoose');
const Schemae = mongoose.Schema;

const crudSchema = Schemae({
    name: { type: String },
    email: { type: String },
    contact: { type: String },
    image: { type: String },
    age: { type: Number },
    isDeleted: { type: Boolean, enum: [true, false], default: false }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('crud', crudSchema);