"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _GridColAlg = require("../GridColAlg");

var _reactDraggable = _interopRequireDefault(require("react-draggable"));

var _reactMotion = require("@serprex/react-motion");

require("./index.less");

var _excluded = ["render"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var parseItems = function parseItems(items) {
  var renders = {};
  var gridItems = items.map(function (item) {
    var render = item.render,
        rest = _objectWithoutProperties(item, _excluded);

    renders[item.id] = render;
    return rest;
  });
  return {
    renders: renders,
    gridItems: gridItems
  };
};

var GridBoard = function GridBoard(props) {
  var col = props.col,
      row = props.row,
      width = props.width,
      height = props.height,
      items = props.items,
      _props$boardClassName = props.boardClassName,
      boardClassName = _props$boardClassName === void 0 ? '' : _props$boardClassName,
      _props$itemClassName = props.itemClassName,
      itemClassName = _props$itemClassName === void 0 ? '' : _props$itemClassName,
      _props$phClassName = props.phClassName,
      phClassName = _props$phClassName === void 0 ? '' : _props$phClassName;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      dragging = _useState2[0],
      setDragging = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      placeholder = _useState4[0],
      setPlaceholder = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      board = _useState6[0],
      setBoard = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
      _useState8 = _slicedToArray(_useState7, 2),
      renders = _useState8[0],
      setRenders = _useState8[1];

  var unitHeight = height / row;
  var unitWidth = width / col;
  (0, _react.useLayoutEffect)(function () {
    var _parseItems = parseItems(items),
        renders = _parseItems.renders,
        gridItems = _parseItems.gridItems;

    setBoard((0, _GridColAlg.initBoard)(col, row, gridItems));
    setRenders(renders);
  }, [items, col, row]);
  (0, _react.useEffect)(function () {
    setPlaceholder(null);
    setDragging(null);
  }, [board]);
  var itemList = (0, _GridColAlg.getItems)(board);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "grid-board ".concat(boardClassName),
    style: {
      width: width,
      height: height
    }
  }, placeholder ? /*#__PURE__*/_react.default.createElement(_reactMotion.Motion, {
    key: "ph",
    style: {
      x: (0, _reactMotion.spring)(placeholder.x, _reactMotion.presets.wobbly),
      y: (0, _reactMotion.spring)(placeholder.y)
    }
  }, function (style) {
    return /*#__PURE__*/_react.default.createElement("span", {
      className: "grid-ph ".concat(phClassName),
      style: {
        position: 'absolute',
        width: placeholder.w * unitWidth,
        height: placeholder.h * unitHeight,
        transform: "translate(".concat(style.x * unitWidth, "px, ").concat(style.y * unitHeight, "px)")
      }
    });
  }) : null, itemList.map(function (item, i) {
    var uw = item.w * unitWidth;
    var ux = item.x * unitWidth;
    var uh = item.h * unitHeight;
    var uy = item.y * unitHeight;
    return /*#__PURE__*/_react.default.createElement(_reactMotion.Motion, {
      key: item.id,
      style: {
        x: item.id === (dragging === null || dragging === void 0 ? void 0 : dragging.id) ? dragging.dx : (0, _reactMotion.spring)(ux, _reactMotion.presets.noWobble),
        y: item.id === (dragging === null || dragging === void 0 ? void 0 : dragging.id) ? dragging.dy : (0, _reactMotion.spring)(uy, _reactMotion.presets.noWobble)
      }
    }, function (style) {
      var _renders$item$id;

      return /*#__PURE__*/_react.default.createElement(_reactDraggable.default, {
        key: item.id,
        position: {
          x: style.x,
          y: style.y
        },
        onDrag: function onDrag(e, data) {
          var dragging = _objectSpread(_objectSpread({}, item), {}, {
            dx: data.x,
            dy: data.y
          });

          var px = Math.round(dragging.dx / unitWidth);
          var py = Math.round(dragging.dy / unitHeight);
          px = Math.max(px, 0);
          px = Math.min(px, col - item.w);
          py = Math.max(py, 0);
          py = Math.min(py, row - item.h);
          setDragging(dragging);
          setPlaceholder({
            x: px,
            y: py,
            w: item.w,
            h: item.h
          });
        },
        onStop: function onStop(e) {
          if (dragging) {
            var x = placeholder.x;
            var y = placeholder.y;
            var tmp = (0, _GridColAlg.moveItem)(item, board, {
              x: x,
              y: y
            });
            setBoard(_toConsumableArray(tmp.board));
          }
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "grid-item ".concat(itemClassName),
        style: {
          width: uw,
          height: uh
        }
      }, ((_renders$item$id = renders[item.id]) === null || _renders$item$id === void 0 ? void 0 : _renders$item$id.call(renders, item, (dragging === null || dragging === void 0 ? void 0 : dragging.id) === item.id ? placeholder : null)) || item.id));
    });
  }));
};

var _default = GridBoard;
exports.default = _default;