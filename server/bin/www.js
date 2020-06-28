#!/usr/bin/env node

/**
 * Module dependencies.
 */

import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import debugLib from 'debug';
import app from '../app';

dotenv.config();
const debug = debugLib('api.skylerdong.com:server');

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '7020');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

/**
 * Connect to MongoDB server
 */
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      ssl: true,
      connectTimeoutMS: 3000,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(
      `Successfully connected to MongoDB cluster ${process.env.MONGO_CLUSTER}.`
    );
  })
  .catch((err) => {
    console.log(
      `Error: Cannot connect to MongoDB cluster ${process.env.MONGO_CLUSTER}!`
    );
    console.log(err);
  });

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

if (process.env.NODE_ENV === 'development') {
  console.log(`The server is hosted at http://localhost:${port}`);
}
