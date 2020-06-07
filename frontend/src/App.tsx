import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tracker from './pages/Tracker';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'}>
          <Tracker />
        </Route>
        <Route path={'/login'}>
          <Login />
        </Route>
        <Route path={'/register'}>
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
