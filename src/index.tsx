import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM
import { Provider } from 'react-redux'; // Import the Provider
import './index.css';
import App from './App';
import store from './redux/store'; // Import your Redux store
import reportWebVitals from './reportWebVitals';

// Use ReactDOM.render instead of ReactDOM.createRoot
ReactDOM.render(
  <React.StrictMode>
    {/* Wrap the App component with the Provider and pass the Redux store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
