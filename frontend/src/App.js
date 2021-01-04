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
import PersonalPage from './pages/personal-page'
import {userContext} from './contexts/userContext'
import {idContext} from './contexts/idContext'
import SettingsPage from './pages/settings-page'
import ErrorPage from './pages/error-page'
import UnauthPage from './pages/unauth-page';
import TagsPage from './pages/tags-page'
import Authentication from './components/authentication'
import Helmet from 'react-helmet'
import SEO from './components/seo'
import UserPage from './pages/user-page'

function App() {
  return (
    <idContext.Provider value={""}>
    <userContext.Provider value={""}>
    <Router>
    <div className="App">
      <Helmet>
        <title>{localStorage.getItem('site-name')}</title>
        <meta name="description" content="Blogsite produced using mongoDB and React"/>
        <SEO/>
      </Helmet>
      <Authentication/>
        <Switch>
          <Route exact path="/" render={(props)=><MainPage {...props}/>}/>
          <Route exact path="/add" component={AddPage}/>
          <Route exact path="/update/:id"render={(props)=><UpdatePage {...props}/>}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/search" component={SearchPage}/>
          <Route exact path ="/posts/:id" render={(props)=><ViewPage {...props}/>}/>
          <Route exact path ="/settings" render={(props)=><SettingsPage {...props}/>}/>
          <Route exact path ="/myposts" component={PersonalPage}/>
          <Route path="/tags/:tag" component={TagsPage}/>
          <Route path="/users/:user" component={UserPage}/>
          <Route exact path="/unauth" component={UnauthPage}/>
          <Route component={ErrorPage}/>
        </Switch>
      <Footer/>
    </div>
    </Router>
    </userContext.Provider>
    </idContext.Provider>
  );
}

export default App;
