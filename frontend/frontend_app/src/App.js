import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './components/home/app';
import DashBoard from './components/dashboard/app';
import './App.css';

function App() {
  localStorage.setItem('toggle', 1);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route 
            exact 
            path={'/'} 
            render={
              props=>(
                <Home 
                  {...props}  />
              )
            } />

          <Route 
            exact 
            path={'/dashboard'}
            render={
              props=>(
                <DashBoard 
                  {...props}  />
              )
            } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
