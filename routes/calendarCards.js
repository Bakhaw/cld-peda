import { Router } from 'express';
import moment from 'moment';
import 'moment/locale/fr';  // without this line it didn't work
import CalendarCard from '../models/CalendarCard';

const router = Router();

router.get('/', (req, res) => {
  CalendarCard.find({}, (err, calendarCards) => {
    return err ? console.log(err) : res.json(calendarCards);
  });
});

router.post('/add', (req, res) => {
  const startDates = req.body.startDates.split(',');
  const endDates = req.body.endDates.split(',');

  // TODO FIX SPLIT ERROR
  // TODO HANDLE FRENCH LANGUAGE

  // const calendarObj = {
  //   start: moment(`${d}`, 'DD/MM/YYYY').format('L', 'fr'),
  //   end: moment(`${endDates[i]}`, 'DD/MM/YYYY').format('L', 'fr'),
  //   title: req.body.title
  // }

  try {
    startDates.map((d, i) => {
      CalendarCard.create({
        start: moment(d, 'MM/DD/YYYY').format('MM/DD/YYYY'),
        end: moment(endDates[i], 'MM/DD/YYYY').add(1, 'day').format('MM/DD/YYYY'),
        allDay: true,
        title: req.body.title
      });
    });
  } catch (err) {
    console.log(err);
  }

  res.json('CalendarCard added with success!')
});

router.post('/update/:id', (req, res) => {
  CalendarCard.findByIdAndUpdate(req.params.id, req.body, (err, calendarCard) => {
    return err ? res.send(err) : res.json('CalendarCard updated with success!');
  });
});

router.get('/delete/:id', (req, res) => {
  CalendarCard.findByIdAndRemove(req.params.id, (err, calendarCard) => {
    return err ? res.send(err) : res.json('CalendarCard removed with success!');
  });
});

export default router;