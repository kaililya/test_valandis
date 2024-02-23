import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { setupStore } from './store/store';

const store = setupStore()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>

)
