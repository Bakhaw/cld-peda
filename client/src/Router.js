import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AdminInterface from './components/AdminInterface';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';
import UserInterface from './components/UserInterface';

const Router = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Switch>
          <Route path="/calendrier" component={Calendar} />
          <Route path="/admin" component={AdminInterface} />
          <Route path="/" component={UserInterface} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default Router;
