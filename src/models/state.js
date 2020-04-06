const mongoose = require('mongoose');
const { Schema } = mongoose;
require('./data');

const StateSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    data: [{ type: Schema.Types.ObjectId, ref:'Data', default:[], required: true }]
});

module.exports = mongoose.model('State', StateSchema);