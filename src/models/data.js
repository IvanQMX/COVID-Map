const mongoose = require('mongoose');
const { Schema } = mongoose;

// Set the actual Date
var moment = require('moment');
moment().format();
var now = moment().subtract(1, 'days');;

const DataSchema = new Schema({
    confirmedCases: { type: Number, required: true },
    negativeCases: { type: Number, required: true },
    suspectedCases: { type: Number, required: true },
    deaths: { type: Number, required: true },
    date: { type: Date, default: now ,required: true }
});

module.exports = mongoose.model('Data', DataSchema);