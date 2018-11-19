import React, { Fragment } from 'react';
import AddDates from './AddDates';
import Typography from '@material-ui/core/Typography';
import Invitations from '../../Invitations';

export default function Dates() {
  return (
    <Fragment>
      <AddDates />
      <Typography variant='h2'>Invitations encore disponibles</Typography>
      <Invitations isAdmin={true} />
    </Fragment>
  );
}
