import { Router } from 'express';
import moment from 'moment';
import 'moment/locale/fr';  // without this line it didn't work
import CalendarCard from '../models/CalendarCard';

const router = Router();

// ? GET ALL CARDS
router.get('/', (req, res) => {
  CalendarCard.find({}, (err, calendarCards) => {
    return err ? console.log(err) : res.json(calendarCards);
  });
});

// ? GET ALL CARDS REFERENCED BY THE SAME INVITATIONID (PACKAGE OF DATES)
router.get('/:invitationId', (req, res) => {
  const query = { invitationId: req.params.invitationId };
  CalendarCard.find(query, (err, cards) => {
    if (err) return console.log(err);
    console.log('Cards trouvées')
    res.json(cards)
  })
})

// ? ADD CARD(S)
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
    console.log('HEREEE', req.body);
    startDates.map((d, i) => {
      const newCalendarCard = new CalendarCard({
        start: moment(d, 'MM/DD/YYYY').format('MM/DD/YYYY'),
        end: moment(endDates[i], 'MM/DD/YYYY').add(1, 'day').format('MM/DD/YYYY'),
        allDay: true,
        title: req.body.title,
        invitationId: req.body.invitationId
      })

      newCalendarCard.populate('invitationId').save();
    });
  } catch (err) {
    console.log(err);
  }

  res.json('CalendarCard added with success!')
});

// ? UPDATE A CARD
router.post('/update/:id', (req, res) => {
  CalendarCard.findByIdAndUpdate(req.params.id, req.body, (err, calendarCard) => {
    return err ? res.send(err) : res.json('CalendarCard updated with success!');
  });
});

// ? REMOVE ALL CARDS REFERENCED BY THE SAME INVITATION ID (SAME PACKAGE OF DATES)
router.get('/delete/:invitationId', (req, res) => {
  console.log(req.params.invitationId)
  const query = { invitationId: req.params.invitationId }
  CalendarCard.find(query).remove().exec((err, cards) => {
    if (err) return console.log(err);
    console.log('Cards supprimées')
    res.json(cards)
  })

});

export default router;