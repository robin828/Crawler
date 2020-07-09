import React from 'react';
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Publish from './components/Publish'
import Nav from './components/Nav'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './user_page/Dashboard'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  const [local, setLocal] = React.useState({});
  return (
   
    <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" render={()=><Login setLocal={setLocal}/>}/>
        <Route exact path="/Signup" component={Signup}/>
        <Route exact path="/forgotPassword" component={ForgotPassword}/>
        <Route exact path="/dashboard" render={()=><Dashboard local={local}/>}/>
        <Route exact path="/dashboard/publish" render={()=><Publish local={local}/>}/>
      </Switch>  
    </div>
    </Router>
  );
}
export default App;
