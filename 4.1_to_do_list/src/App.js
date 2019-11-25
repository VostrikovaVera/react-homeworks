import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import ToDo from './components/to-do/ToDo';
import Container from './components/container/Container';
import ScrollPage from './components/scroll-page/ScrollPage';
import StickyNav from './components/sticky-nav/StickyNav';

function App() {
  return (
      <Router>
        <Container>
          <div>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
            <p>Some text to scroll and see how sticky menu is working</p>
          </div>
          <StickyNav>
            <div className="navigation">
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/to-do">To-Do List</Link>
                </li>
                <li>
                  <Link to="/scroll-page">Scroll Status Page</Link>
                </li>
              </ul>
            </div>
          </StickyNav>
          <Switch>
            <Route path="/home">
              <div>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
              </div>
            </Route>
            <Route path="/to-do">
              <ToDo />
            </Route>
            <Route path="/scroll-page">
              <ScrollPage />
            </Route>
          </Switch>
        </Container>
      </Router>
  );
}

export default App;