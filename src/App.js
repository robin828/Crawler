import React from 'react';
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Nav from './components/Nav'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './user_page/Dashboard'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" render={()=><Login />}/>
        <Route exact path="/Signup" component={Signup}/>
        <Route exact path="/forgotPassword" component={ForgotPassword}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      </Switch>  
      
    </div>
    </Router>
  );
}
export default App;
