let APIURL = '';

switch(window.location.hostname) {
  case 'localhost' || '127.0.0.1': 
    APIURL = 'http://localhost:3005';
    break;

  case 'red-badge-project.herokuapp.com':
    APIURL = 'https://red-badge-project.herokuapp.com/';
    break;
}

export default APIURL;