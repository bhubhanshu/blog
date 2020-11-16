import React from 'react';
import Main from './components/MainComponent';
import './App.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();


function App() {
  return (
    <Provider store={store}>
        <HashRouter basename={process.env.PUBLIC_URL}>
          <div>
            <Main />
          </div>
        </HashRouter>
    </Provider>
  );
}

export default App;
