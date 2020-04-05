const State = require('../models/state');
var moment = require('moment');

moment.locale('es-us');

const stateCtrl = {};

stateCtrl.getStatesLastData = async (req, res) => {
    const data = await State.find({}, { _id: 0, __v: 0, id: 0 }).populate({ path: 'data', options: { sort: { date: -1 }, limit: 1, select: { date: 0, __v: 0 } } });
    res.json(data);
};

stateCtrl.getStateData = async(req, res) => {
    const { name } = req.params;
    const { data } = await State.findOne({ name }, { _id: 0, __v: 0, id: 0, name: 0 }).populate({ path: 'data', options: { select: { date: 1, confirmedCases: 1, deaths: 1 } } });
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
}

module.exports = stateCtrl;