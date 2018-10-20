import { Router } from 'express';
import Invitation from '../models/Invitation';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (req, res) => {
  Invitation.find({}, (err, invitations) => {
    return err ? console.log(err) : res.json(invitations);
  });
});

router.get('/availables', (req, res) => {
  Invitation.find({ checked: false }, (err, invitations) => {
    return err ? console.log(err) : res.json(invitations);
  });
});

router.post('/add', (req, res) => {
  const newInvitation = new Invitation(req.body);
  newInvitation.save((err, invitation) => {
    return err ? console.log(err) : res.json('Invitation created with success!')
  });
});

router.post('/update/:id', (req, res) => {
  Invitation.findByIdAndUpdate(req.params.id, req.body, (err, invitation) => {
    return err ? res.send(err) : res.json('Invitation updated with success!');
  });
});

router.post('/toggleCheckedDates', (req, res) => {
  const query = { _id: { $in: req.body.selectedDatesIds } };
  const update = { checked: true };
  const options = { upsert: false, 'new': false };

  Invitation.findOneAndUpdate(query, update, options, (err, inv) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!inv) {
      return res.status(400).send({ msg: 'Already exist or not found' });
    }
    return res.status(200).send({ message: "Thanks :)" });
  })
});

router.get('/delete/:id', (req, res) => {
  Invitation.findByIdAndRemove(req.params.id, (err, invitation) => {
    return err ? res.send(err) : res.json('Invitation removed with success!');
  });
});

export default router;