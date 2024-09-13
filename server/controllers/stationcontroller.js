import station from '../models/db.js';
import moment from 'moment';

exports.addstation = async (req,res)=>{
    const { name, distanceFromPrevious }= req.body;

    try{
        const newstation = new station({ name, distanceFromPrevious, times: []});
        await newstation.save();
        res.status(201).json(newstation);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
};

exports.recordtime = async(req,res)=> {
    const { stationName } = req.body;

    try {
        const station = await station.findOne({ name: stationName });
        if (!station) return res.status(404).json({ message: "Station not found" });

        const currentTime = moment().toDate();
        station.times.push({ station: stationName, time: currentTime });
        await station.save();

        res.status(200).json(station);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
exports.estimateTime = async (req, res) => {
    const { stationName } = req.params;

    try {
        const station = await station.findOne({ name: stationName });
        if (!station) return res.status(404).json({ message: "Station not found" });

        const times = station.times;
        if (times.length < 2) return res.status(400).json({ message: "Missing info" });

        const previousTime = moment(times[times.length - 2].time);
        const currentTime = moment(times[times.length - 1].time);
        const timeTaken = currentTime.diff(previousTime, 'minutes');

        const averageSpeed = station.distanceFromPrevious / timeTaken; 
        const estimatedTimeToNext = station.distanceFromPrevious / averageSpeed;

        res.status(200).json({ estimatedTimeToNext });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};