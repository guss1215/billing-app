import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';


Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router> {/* Wrap with BrowserRouter */}
        <App />
      </Router>
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
