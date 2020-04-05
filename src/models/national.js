const mongoose = require('mongoose');
const { Schema } = mongoose;

// Set the actual Date
var moment = require('moment');
moment().format();
var now = moment().subtract(1, 'days');

const NationalSchema = new Schema({
    confirmedCases: { type: Number, required: true },
    deaths: { type: Number, required: true },
    date: { type: Date, default: now ,required: true }
});

module.exports = mongoose.model('National', NationalSchema);