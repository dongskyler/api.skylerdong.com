import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import { ApolloServer } from 'apollo-server-express';
import indexRouter from './routes/index';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';

// Create Express server
const app = express();

// Create Apollo server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(bodyParser.json()); // use body-parser middleware to parse incoming json

app.use('/', indexRouter);

// if (process.env.NODE_ENV === "development") {
//   app.use(
//     '/graphiql',
//     graphiqlExpress({
//       endpointURL: '/graphql',
//     }),
//   );
// };

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
