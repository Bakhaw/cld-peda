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

// ? GET A SPECIFIC CARD BY ITS ID (CUSTOM EVENT CREATED ON ADMIN INTERFACE)
router.get('/cardById/:cardId', (req, res) => {
  CalendarCard.findById(req.params.cardId, (err, card) => {
    return err ? console.log(err) : res.json([card]);
  })
})

// ? GET ALL CARDS REFERENCED BY THE SAME INVITATIONID (PACKAGE OF DATES)
router.get('/cardsByInvitationId/:invitationId', (req, res) => {
  const query = { invitationId: req.params.invitationId };
  CalendarCard.find(query, (err, cards) => {
    if (err) return console.log(err);
    
    cards.sort((left, right) => {
      const leftDate = moment(left.start, 'MM/DD/YYYY');
      const rightDate = moment(right.start, 'MM/DD/YYYY');
      const diff = leftDate.diff(rightDate);
      return diff > 0;
    });

    res.json(cards)
  })
})

// ? ADD CARD(S)
router.post('/add', (req, res) => {
  // ? Le IF correspond aux cards qui s'ajoute au calendrier quand un user valide un package sur l'interface
  if (req.body.startDates && req.body.endDates) {
    const startDates = req.body.startDates.split(',');
    const endDates = req.body.endDates.split(',');

    startDates.map((d, i) => {
      const newCalendarCard = new CalendarCard({
        start: moment(d, 'MM/DD/YYYY').format('MM/DD/YYYY'),
        end: moment(endDates[i], 'MM/DD/YYYY').add(1, 'day').format('MM/DD/YYYY'),
        allDay: true,
        title: req.body.title,
        invitationId: req.body.invitationId
      })

      newCalendarCard.save();
    });

    res.json('Card created with success');
  } else {
    // ? Le ELSE correspond aux cards custom ajoutées depuis l'interface Admin
    const newCalendarCard = new CalendarCard(req.body);

    newCalendarCard.save((err, card) => {
      return err ? console.log(err) : res.json('Card created with success !');
    })
  }
});

// ? UPDATE A CARD
router.post('/update/:id', (req, res) => {
  CalendarCard.findByIdAndUpdate(req.params.id, req.body, (err, calendarCard) => {
    return err ? res.send(err) : res.json('CalendarCard updated with success!');
  });
});

router.get('/delete/:eventId', (req, res) => {
  CalendarCard.findByIdAndRemove(req.params.eventId, (err, invit) => {
    return err ? console.log(err) : res.json(invit);
  })
})

// ? REMOVE ALL CARDS REFERENCED BY THE SAME INVITATION ID (SAME PACKAGE OF DATES)
router.get('/delete/cardsByInvitationId/:invitationId', (req, res) => {
  const query = { invitationId: req.params.invitationId }
  CalendarCard.find(query).remove().exec((err, cards) => {
    if (err) return console.log(err);
    res.json(cards)
  })

});

export default router;