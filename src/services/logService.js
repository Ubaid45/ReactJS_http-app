import * as Sentry from '@sentry/browser';

function init() {
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
}

function log(error) {
  // Capture exceptions, messages or manual events
  //Sentry.captureMessage('Hello, world!');
  Sentry.captureException(new Error(error));
 /* Sentry.captureEvent({
    message: 'Manual',
    stacktrace: [
      // ...
    ],
  });*/
}

export default {
  init,
  log
};
