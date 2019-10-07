/**
 * Module dependencies.
 */
const
  express = require('express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  chalk = require('chalk'),
  errorHandler = require('errorhandler'),
  expressValidator = require('express-validator'),
  Promise = require('bluebird'),
  router = require('./routes/router.js'),
  db = require("./config/dbs"),
  app = express();





class Server {

  constructor() {
    this.initExpress();
    this.initDatabaseCon();
    this.initErrorHandler();
    //  this.initRoutes();
    //  this.initStart()
  }


  initExpress() {
    app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
    app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000);

    app.use(session({
      secret: 'work hard',
      resave: true,
      saveUninitialized: false
    }));

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());

    /**
     * promise config
     */

    Promise.config({
      warnings: true,
      longStackTraces: true,
      cancellation: true,
      monitoring: true
    })
  }

  initDatabaseCon() {
    let that = this;
    db.connect('mongodb://localhost:27017', function (err) {
      if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
      } else {
        console.log("connected");
        that.initRoutes();
        router.load(app, './controllers');
      }
    });
  }

  initStart() {
    app.listen(app.get('port'), () => {
      console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
      console.log('  Press CTRL-C to stop\n');
    });

    // app.listen(3000);


  }
  initRoutes() {
     router.load(app, './controllers');
    this.initStart()
  }

  initErrorHandler() {
    if (process.env.NODE_ENV === 'development') {
      app.use(errorHandler());
    }
  }
}

let server = new Server();
