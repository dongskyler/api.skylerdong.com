"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = require("uuid");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var resolvers = {
  Query: {
    me: function me(parent, args, _ref) {
      var _me = _ref.me;
      return _me;
    },
    user: function user(parent, _ref2) {
      var id = _ref2.id;
      return users[id];
    },
    users: function (_users) {
      function users() {
        return _users.apply(this, arguments);
      }

      users.toString = function () {
        return _users.toString();
      };

      return users;
    }(function () {
      return Object.values(users);
    }),
    message: function message(parent, _ref3) {
      var id = _ref3.id;
      return messages[id];
    },
    messages: function (_messages) {
      function messages() {
        return _messages.apply(this, arguments);
      }

      messages.toString = function () {
        return _messages.toString();
      };

      return messages;
    }(function () {
      return Object.values(messages);
    })
  },
  Mutation: {
    createMessage: function createMessage(parent, _ref4, _ref5) {
      var text = _ref4.text;
      var me = _ref5.me;
      var id = (0, _uuid.v4)();
      var message = {
        id: id,
        text: text,
        userId: me.id
      };
      messages[id] = message;
      users[me.id].messageIds.push(id);
      return message;
    },
    updateMessage: function updateMessage(parent, _ref6, _ref7) {
      var id = _ref6.id,
          text = _ref6.text;
      var me = _ref7.me;

      if (!id || !text) {
        return false;
      }

      var message = {
        id: id,
        text: text,
        userId: me.id
      };
      messages[id] = message;
      return true;
    },
    deleteMessage: function deleteMessage(parent, _ref8) {
      var id = _ref8.id;

      var _messages2 = messages,
          message = _messages2[id],
          otherMessages = _objectWithoutProperties(_messages2, [id].map(_toPropertyKey));

      if (!message) {
        return false;
      }

      messages = otherMessages;
      return true;
    }
  },
  User: {
    messages: function (_messages3) {
      function messages(_x) {
        return _messages3.apply(this, arguments);
      }

      messages.toString = function () {
        return _messages3.toString();
      };

      return messages;
    }(function (user) {
      return Object.values(messages).filter(function (message) {
        return message.userId === user.id;
      });
    })
  },
  Message: {
    // user: (parent, args, { me }) => {
    //   return me;
    // },
    user: function user(message) {
      return users[message.userId];
    }
  }
};
var _default = resolvers;
exports["default"] = _default;