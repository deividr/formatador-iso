import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Visa from './pages/Visa';
import Elo from './pages/Elo';

export default function(): JSX.Element {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/visa" exact={true} component={Visa} />
      <Route path="/elo" exact={true} component={Elo} />
    </Switch>
  );
}
