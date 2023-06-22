import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Item from './pages/Item';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/product:id" component={ Item } />
            <Route exact path="/cart" component={ Cart } />
            <Route exact path="/checkout" component={ Checkout } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
