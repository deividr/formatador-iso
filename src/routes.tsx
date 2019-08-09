import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Visa from './pages/Visa';
import Elo from './pages/Elo';

export default function() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/visa" exact component={Visa} />
      <Route path="/elo" exact component={Elo} />
    </Switch>
  );
}
