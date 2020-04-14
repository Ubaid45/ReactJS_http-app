import axios from "axios";
import * as Sentry from '@sentry/browser';
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(error);
     // Capture exceptions, messages or manual events
  //Sentry.captureMessage('Hello, world!');
  Sentry.captureException(new Error(error));
 /* Sentry.captureEvent({
    message: 'Manual',
    stacktrace: [
      // ...
    ],
  });*/
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
