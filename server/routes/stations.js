import express from 'express';
import { addStation, recordTime, estimateTime } from ('../controllers/stationcontroller');
import router from express.Router();

router.post('/add', addStation);

router.post('/record', recordTime);

router.get('/estimate/:stationName', estimateTime);

module.exports = router;
