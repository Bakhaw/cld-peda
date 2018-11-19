import React, { Fragment } from 'react'
import AddIcon from '@material-ui/icons/Add'

import AddDates from './AddDates'
import AddCustomEvent from './AddCustomEvent'

const CreateInvitation = () => {
  return (
    <Fragment>
      <Button
        variant="fab"
        color="primary"
        aria-label="Add"
        className={classes.button}
      >
        <AddIcon />
      </Button>
      {/* <AddDates />
      <AddCustomEvent /> */}
    </Fragment>
  )
}

export default CreateInvitation
