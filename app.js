const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const Blog = require('./models/blog');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const imagesRouter = require('./routes/images');
const blogsRouter = require('./routes/blogs');

const app = express(); // create express server

// const blogs = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // use body-parser middleware to parse incoming json

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/images', imagesRouter);
app.use('/blogs', blogsRouter);

app.use('/graphql', graphqlHttp({ // set up our graphql endpoint with the express-graphql middleware
  // build a graphql schema
  schema: buildSchema(`
        type Blog {
            _id: ID!
            title: String!
            text: String!
            description: String!
            date: String
        }

        input BlogInput {
            title: String!
            text: String!
            description: String!
            date: String
        }


        type blogQuery {
            blogs: [Blog!]!
        }

        type blogMutation {
            createBlog(blogInput: BlogInput): Blog
        }

        schema {
            query: blogQuery
            mutation: blogMutation
        }
    `),
  rootValue: {
    blogs: () => {
      // return all the blogs unfiltered using Model
      return Blog.find().then(blogs => {
        return blogs
      }).catch(err => {
        throw err
      })
    },
    createBlog: (args) => {
      const blog = new Blog({
        title: args.blogInput.title,
        text: args.blogInput.text,
        description: args.blogInput.description,
        date: new Date()
      })

      // save new blog using model which will save in MongoDB
      return blog.save().then(result => {
        console.log(result)
        return result
      }).catch(err => {
        console.log(err)
        throw err
      })
    }
  }, // an object with resolver functions
  graphiql: true // enable the graphiql interface to test our queries
}))

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
