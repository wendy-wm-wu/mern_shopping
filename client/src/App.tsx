import React from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';

import { Provider } from 'react-redux';
import store from './flux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <ShoppingList />
      </div>
    </Provider>
  );
};

export default App;