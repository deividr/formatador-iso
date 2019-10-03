import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import Home from './pages/Home';
import Visa from './pages/Visa';
import Elo from './pages/Elo';
import Login from './pages/Login';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: any;
  path: string;
}): JSX.Element => {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps): JSX.Element => {
        return isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        );
      }}
    />
  );
};

export default function(): JSX.Element {
  return (
    <Switch>
      <Route path="/" exact={true} component={Login} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/visa" component={Visa} />
      <PrivateRoute path="/elo" component={Elo} />
      <Route path="/*" component={(): any => <div>Page not found</div>} />
    </Switch>
  );
}
