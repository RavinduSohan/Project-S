import mongoose from 'mongoose';

const stationschema = mongoose.Schema({

    name: { type: String, required: true },
    distanceFromPrevious: { type: Number, required: true }, 
    times: [{ station: String, time: Date }]
});

module.exports = mongoose.model('station', stationschema);