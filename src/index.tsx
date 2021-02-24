import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-lbvy8s1z.au.auth0.com"
      clientId="JeIqV1iKg4l4K4GWTU4r5BqiX31iDFV4"
      redirectUri={window.location.href}
      audience= "stocktrade"
      scope="write:add_order read:orders write:delete_order read:user_funds write:add_user_funds"
    >

      <App />

    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
