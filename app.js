const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const bodyParser = require('body-parser');
// const graphqlHttp = require('express-graphql');
// const { buildSchema } = require('graphql');
// const { gql } = require('apollo-server');
const { ApolloServer, gql } = require('apollo-server-express');
// const { typeDefs, resolvers } = require('./schema');
const graphqlExpress = require('apollo-server-express');

const indexRouter = require('./routes/index');

const app = express(); // create express server

const typeDefs = gql`
  type Query {
    me: User
  }
 
  type User {
    username: String!
  }
`;
 
const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Robin Wieruch',
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// server.applyMiddleware({ app });
server.applyMiddleware({ app, path: '/graphql' });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json()); // use body-parser middleware to parse incoming json

app.use('/', indexRouter);

// Apollo server
const myGraphQLSchema = gql`
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

// Hardcoded dummy dataset
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Resolver
const resolvers = {
  Query: {
    books: () => books,
  },
};

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

if (process.env.NODE_ENV === "development") {
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    }),
  );
};

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
