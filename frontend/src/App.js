import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Wall from './pages/Wall';


const App = () => {


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Accueil}/>
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/wall" exact component={Wall} />
       
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;