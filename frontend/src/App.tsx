import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'}></Route>
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
