import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Nav} from 'react-router-dom'
import MainPage from './pages/main-page'
import NavBar from './components/nav-bar'
import Footer from './components/footer'
import AddPage from './pages/add-page'
import UpdatePage from './pages/update-page'
import LoginPage from './pages/login-page'
import SearchPage from './pages/search-page'
import ViewPage from './pages/view-page'
import RegisterPage from './pages/register-page'
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/add" component={AddPage}/>
          <Route exact path="/update"render={(props)=><UpdatePage {...props}/>}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/search" component={SearchPage}/>
          <Route exact path ="/posts" render={(props)=><ViewPage {...props}/>}/>
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
