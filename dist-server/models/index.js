"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var users = {
  1: {
    id: '1',
    username: 'Andy',
    messageIds: [1]
  },
  2: {
    id: '2',
    username: 'Bob',
    messageIds: [2]
  }
};
var messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'Bye World',
    userId: '2'
  }
};
var _default = {
  users: users,
  messages: messages
};
exports["default"] = _default;