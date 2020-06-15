"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(_path["default"].join(__dirname, '..', '..', 'public', 'index.html'));
}); // module.exports = router;

var _default = router;
exports["default"] = _default;