import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as Sentry from '@sentry/browser';
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

Sentry.init({dsn: "https://fb3990b3772f49d680582d4d19cc92ce@o377361.ingest.sentry.io/5199417"});
// Set user information, as well as tags and further extras
Sentry.configureScope(scope => {
    scope.setExtra('battery', 0.7);
    scope.setTag('user_mode', 'admin');
    scope.setUser({ id: '4711' });
    // scope.clear();
  });
   
  // Add a breadcrumb for future events
  Sentry.addBreadcrumb({
    message: 'My Breadcrumb',
    // ...
  });
   
 
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
