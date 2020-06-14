const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
// const { buildSchema } = require('graphql');
// const { gql } = require('apollo-server');
const { ApolloServer, gql } = require('apollo-server-express');
// const { typeDefs, resolvers } = require('./schema');
// const graphqlExpress = require('apollo-server-express');

const indexRouter = require('./routes/index');

const app = express(); // create express server



let users = {
  1: {
    id: '1',
    username: 'Andy',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Bob',
    messageIds: [2],
  },
};

// const me = users[1];

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'Bye World',
    userId: '2',
  },
};

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]

    message(id: ID!): Message!
    messages: [Message!]!
  }

  type Mutation {
    createMessage(text: String!): Message!
    updateMessage(id: ID!, text: String!): Boolean!
    deleteMessage(id: ID!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
    messages: () => {
      return Object.values(messages);
    },
  },

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },
    updateMessage: (parent, { id, text }, { me }) => {
      if (!id || !text) {
        return false;
      }

      const message = {
        id,
        text,
        userId: me.id,
      };

      messages[id] = message;

      return true;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;

      if (!message) {
        return false;
      }

      messages = otherMessages;

      return true;
    },
  },

  User: {
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id
      )
    },
  },

  Message: {
    // user: (parent, args, { me }) => {
    //   return me;
    // },
    user: message => {
      return users[message.userId];
    }
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

// server.applyMiddleware({ app });
server.applyMiddleware({ app, path: '/graphql' });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json()); // use body-parser middleware to parse incoming json

app.use('/', indexRouter);

// // Apollo server
// const myGraphQLSchema = gql`
//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

// // Hardcoded dummy dataset
// const books = [
//   {
//     title: 'Harry Potter and the Chamber of Secrets',
//     author: 'J.K. Rowling',
//   },
//   {
//     title: 'Jurassic Park',
//     author: 'Michael Crichton',
//   },
// ];

// // Resolver
// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

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
