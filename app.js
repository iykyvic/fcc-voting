import dotenv     from 'dotenv';
import debug      from 'debug';
import path       from 'path';
import express    from 'express';
import favicon    from 'serve-favicon';
import logger     from 'morgan';
import Logger     from 'js-logger';
import bodyParser from 'body-parser';
import http       from 'http';
import Routes     from './server/routes';

dotenv.config();
debug('docman:app');
Logger.useDefaults();

const app = express();

/**
 * Normalize a port into a number, string, or false.
 * @param {Number} val a string or number port
 * @returns {Number} a number representing the port
 */
const normalizePort = (val) => {
  const portNumber = parseInt(val, 10);
  if (isNaN(portNumber)) {
    return val;
  }

  if (portNumber >= 0) {
    return portNumber;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 * @param {any} error an error message
 * @returns {null} error already thrown
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      Logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 * @returns {null} server process is continous here, so no returns
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`🚧 App is Listening on ${bind}`);
};
const headers1 = 'Origin, X-Requested-With, Content-Type, Accept';
const headers2 = ',Authorization, Access-Control-Allow-Credentials';

app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'pug');
app.set('port', port);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', `${headers1} ${headers2}`);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(favicon(path.join(__dirname, 'client/public/images/favicon.ico')));
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', Routes.home);
app.use('/api/v1/auth', Routes.auth);
app.use('/api/v1/polls', Routes.polls);

server.on('listening', onListening);
server.on('error', onError);

server.listen(port);

export default app;
