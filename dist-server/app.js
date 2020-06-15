"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _serveFavicon = _interopRequireDefault(require("serve-favicon"));

var _index = _interopRequireDefault(require("./routes/index"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _models = _interopRequireDefault(require("./models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create Express server
var app = (0, _express["default"])(); // Create Apollo server

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema["default"],
  resolvers: _resolvers["default"],
  context: {
    models: _models["default"],
    me: _models["default"].users[1]
  }
});
server.applyMiddleware({
  app: app,
  path: '/graphql'
}); // view engine setup

app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use((0, _serveFavicon["default"])(_path["default"].join(__dirname, '..', 'public', 'favicon.ico')));
app.use(_bodyParser["default"].json()); // use body-parser middleware to parse incoming json

app.use('/', _index["default"]); // if (process.env.NODE_ENV === "development") {
//   app.use(
//     '/graphiql',
//     graphiqlExpress({
//       endpointURL: '/graphql',
//     }),
//   );
// };
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
}); // module.exports = app;

var _default = app;
exports["default"] = _default;