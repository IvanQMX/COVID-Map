const axios = require('axios');
const State = require('./models/state');
const Data = require('./models/data');
const National = require('./models/national');

const helpers = {};

helpers.fecthData = (URI, testing) => {
    // Send a POST request
    axios({
        method: 'post',
        url: URI,
        headers: {'Content-Type': 'application/json'}
    })
        .then(async (response) => {
            const states = JSON.parse(response.data.d);
            let confirmedCases = 0;
            let deaths = 0;
            for(state of states) {
                confirmedCases += parseInt(state[4]);
                deaths += parseInt(state[7]);
                const stateData = new Data({
                    confirmedCases: parseInt(state[4]),
                    negativeCases: parseInt(state[5]),
                    suspectedCases: parseInt(state[6]),
                    deaths: parseInt(state[7])
                });
                if(testing) {
                    console.log(state[1], stateData);
                }
                else {
                    await stateData.save();
                    await State.findOneAndUpdate({id: parseInt(state[0])}, { $addToSet: {data: stateData._id } });
                }
            }
            const nationalData = new National({
                confirmedCases,
                deaths: deaths
            });
            if(!testing){
                await nationalData.save();
            }
            console.log(nationalData);
        })
        .catch(error => {
            console.log(error);
        })
};

helpers.setStates = async (testing) => {
    const states = [
        {id: 1, name: 'Aguascalientes'},
        {id: 2,name: 'Baja California'},
        { id: 3, name: 'Baja California Sur' },
        { id: 4, name: 'Campeche' },
        { id: 5, name: 'Coahuila' },
        { id: 6, name: 'Colima' },
        { id: 7, name: 'Chiapas' },
        { id: 8, name: 'Chihuahua' },
        { id: 9, name: 'Ciudad de México' },
        { id: 10, name: 'Durango' },
        { id: 11, name: 'Guanajuato' },
        { id: 12, name: 'Guerrero' },
        { id: 13, name: 'Hidalgo' },
        { id: 14, name: 'Jalisco' },
        { id: 15, name: 'México' },
        { id: 16, name: 'Michoacán' },
        { id: 17, name: 'Morelos' },
        { id: 18, name: 'Nayarit' },
        { id: 19, name: 'Nuevo León' },
        { id: 20, name: 'Oaxaca' },
        { id: 21, name: 'Puebla' },
        { id: 22, name: 'Querétaro' },
        { id: 23, name: 'Quintana Roo' },
        { id: 24, name: 'San Luis Potosí' },
        { id: 25, name: 'Sinaloa' },
        { id: 26, name: 'Sonora' },
        { id: 27, name: 'Tabasco' },
        { id: 28, name: 'Tamaulipas' },
        { id: 29, name: 'Tlaxcala' },
        { id: 30, name: 'Veracruz' },
        { id: 31, name: 'Yucatán' },
        { id: 32, name: 'Zacatecas' }
    ]
    for(state of states) {
        const newState = new State({
            id: state.id,
            name: state.name
        });
        if (testing) {
            console.log(newState);
        }
        else {
            await newState.save();
        }
    }
}

module.exports = helpers;