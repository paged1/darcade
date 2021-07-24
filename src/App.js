import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
//import {createBrowserHistory} from 'history';
import Home from "./Home";
import './App.css';

//var hist = createBrowserHistory();

function App() {
  return (
    <BrowserRouter >
        <Switch>
            <Route path="/" component={Home}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
