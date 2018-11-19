import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import CustomEvents from './CustomEvents';
import Dates from './Dates';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  }
});

class BackOffice extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { value } = this.state;
    const { classes, theme } = this.props;
    console.log(this.state.value);
    return (
      <div className={classes.root}>
        <AppBar position='static' color='default' className='backoffice__tabs_container'>
          <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor='primary' textColor='primary' centered>
            <Tab label='invitations' />
            <Tab label='évènements personnalisés' />
          </Tabs>
        </AppBar>

        {value === 0 && (
          <div className='backoffice__tab'>
            <Dates />
          </div>
        )}
        {value === 1 && (
          <div className='backoffice__tab'>
            <CustomEvents />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BackOffice);
