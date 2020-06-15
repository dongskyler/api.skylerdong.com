"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Query {\n    me: User\n    user(id: ID!): User\n    users: [User!]\n\n    message(id: ID!): Message!\n    messages: [Message!]!\n  }\n\n  type Mutation {\n    createMessage(text: String!): Message!\n    updateMessage(id: ID!, text: String!): Boolean!\n    deleteMessage(id: ID!): Boolean!\n  }\n\n  type User {\n    id: ID!\n    username: String!\n    messages: [Message!]\n  }\n\n  type Message {\n    id: ID!\n    text: String!\n    user: User!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var schema = (0, _apolloServerExpress.gql)(_templateObject());
var _default = schema;
exports["default"] = _default;