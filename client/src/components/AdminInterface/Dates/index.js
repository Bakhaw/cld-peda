import React, { Fragment } from 'react';
import AddDates from './AddDates';
import Invitations from '../../Invitations';

export default function Dates() {
  return (
    <Fragment>
      <AddDates />
      <Invitations isAdmin={true} />
    </Fragment>
  );
}
