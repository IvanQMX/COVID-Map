const National = require('../models/national');
var moment = require('moment');

moment.locale('es-us');

const nationalCtrl = {};

nationalCtrl.getData = async (req, res) => {
    const data = await National.find({},{ _id: 0, __v: 0 }).sort({ date: 1 });
    let formattedData = new Array();
    for(let datum of data) {
        const newDatum = {
            date: moment(datum.date).format('D/M/YY'),
            confirmedCases: datum.confirmedCases,
            deaths: datum.deaths
        }
        formattedData.push(newDatum);
    }
    res.json(formattedData);
};

module.exports = nationalCtrl;