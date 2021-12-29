"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeItem = exports.moveItem = exports.isInvalid = exports.insertItemIfEmpty = exports.insertItem = exports.initBoard = exports.getOverlaps = exports.getItems = exports.getEmptyPosition = exports.debug = void 0;

var _deepClone = _interopRequireDefault(require("./deepClone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** *********************************Utils*************************************** */
var isEmpty = function isEmpty(v) {
  return v === null;
};
/**
 * debug switch
 */


var LOG = false;

var debug = function debug(on) {
  LOG = on;
};

exports.debug = debug;

var log = function log(message) {
  LOG && console.warn('[grid-board]' + message);
};
/** *********************************Main*************************************** */

/**
 * 1. 是否重叠
 */


var getOverlaps = function getOverlaps(item, board) {
  var x = item.x,
      y = item.y,
      w = item.w,
      h = item.h,
      id = item.id;
  var result = [];

  var _loop = function _loop(j) {
    var _loop2 = function _loop2(i) {
      if (!isEmpty(board[j][i]) && result.findIndex(function (g) {
        var _board$j$i;

        return g && g.id === ((_board$j$i = board[j][i]) === null || _board$j$i === void 0 ? void 0 : _board$j$i.id);
      }) === -1) {
        var _board$j$i2;

        result.push(board[j][i]);
        log("".concat(id, " overlaps with ").concat((_board$j$i2 = board[j][i]) === null || _board$j$i2 === void 0 ? void 0 : _board$j$i2.id));
      }
    };

    for (var i = x; i < x + w; i++) {
      _loop2(i);
    }
  };

  for (var j = y; j < y + h; j++) {
    _loop(j);
  }

  return result.sort(function (a, b) {
    return b.w * b.h - a.w * a.h; // 从大到小排序
  });
};
/**
 * 2. 是否超出边界 是否非法
 */


exports.getOverlaps = getOverlaps;

var isInvalid = function isInvalid(item, board) {
  var x = item.x,
      y = item.y,
      w = item.w,
      h = item.h,
      id = item.id,
      area = item.area;

  if (w < 1 || h < 1) {
    log("The width and height of '".concat(id, "' must be greater than or equal to 1"));
    return true;
  }

  var startx = 0;
  var starty = 0;
  var endx = board[0].length;
  var endy = board.length;

  if (area) {
    area.sx && (startx = Math.max(startx, area.sx));
    area.sy && (starty = Math.max(starty, area.sy));
    area.ex && (endx = Math.min(endx, area.ex));
    area.ey && (endy = Math.min(endy, area.ey));
  }

  var isOut = !(x < endx && x >= startx && y < endy && y >= starty && x + w <= endx && y + h <= endy);

  if (isOut) {
    log("'".concat(id, "' is out of bounds"));
    return true;
  }

  return false;
};
/**
 * 3. 向指定坐标填入GridItem,不考虑重叠问题，不考虑出界问题
 */


exports.isInvalid = isInvalid;

var insertItemAnyway = function insertItemAnyway(item, board) {
  var _board = (0, _deepClone.default)(board);

  var x = item.x,
      y = item.y,
      w = item.w,
      h = item.h;

  for (var j = y; j < y + h; j++) {
    for (var i = x; i < x + w; i++) {
      _board[j][i] = item;
    }
  }

  return _board;
}; // 4.2  找到空位并填入，否则跳过 原算法


var insertItemIfEmpty = function insertItemIfEmpty(item, board) {
  var _item = item,
      w = _item.w,
      h = _item.h,
      id = _item.id,
      area = _item.area;
  var startx = 0;
  var starty = 0;
  var endx = board[0].length;
  var endy = board.length;

  if (area) {
    area.sx && (startx = Math.max(startx, area.sx));
    area.sy && (starty = Math.max(starty, area.sy));
    area.ex && (endx = Math.min(endx, area.ex));
    area.ey && (endy = Math.min(endy, area.ey));
  }

  var success = false;
  var _board = board;

  for (var j = starty; j <= endy - h; j++) {
    for (var i = startx; i <= endx - w; i++) {
      var tmp = {
        id: id,
        x: i,
        y: j,
        w: w,
        h: h,
        area: area
      };

      if (getOverlaps(tmp, board).length === 0) {
        success = true;
        item = tmp;
        _board = insertItemAnyway(tmp, board);
        break;
      }
    }

    if (success) {
      break;
    }
  }

  return {
    success: success,
    board: _board
  };
};
/**
 * 5. 从board移除某个item
 */


exports.insertItemIfEmpty = insertItemIfEmpty;

var removeItem = function removeItem(item, board) {
  var x = item.x,
      y = item.y,
      w = item.w,
      h = item.h;

  var _board = (0, _deepClone.default)(board);

  for (var j = y; j < y + h; j++) {
    for (var i = x; i < x + w; i++) {
      _board[j][i] = null;
    }
  }

  return _board;
};
/**
 * 6. 初始化返回 GridBoard
 */


exports.removeItem = removeItem;

var initBoard = function initBoard(col, row, items) {
  var _board = Array(row).fill('').map(function () {
    return Array(col).fill(null);
  });

  if (items) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (isInvalid(item, _board)) continue;
      if (getOverlaps(item, _board).length > 0) continue;
      _board = insertItemAnyway(item, _board);
    }
  }

  return _board;
};
/**
 * 7. 塞入新元素，重排布局，如果没有剩余空间则返回提示
 */


exports.initBoard = initBoard;

var insertItem = function insertItem(item, board) {
  if (isInvalid(item, board)) {
    log("'".concat(item.id, "' is out of bounds"));
    return {
      success: false,
      board: board
    };
  }

  var overlaps = getOverlaps(item, board); // 如果没有重叠

  if (overlaps.length === 0) {
    return {
      success: true,
      board: insertItemAnyway(item, board)
    };
  } // 如果重叠了，计算是否有剩余空间调整被挤占空间的原元素单位


  var tmp = (0, _deepClone.default)(board);
  overlaps.forEach(function (i) {
    tmp = removeItem(i, tmp);
  });
  tmp = insertItemAnyway(item, tmp); // 依次从大到小填入

  var succ = true;

  for (var i = 0; i < overlaps.length; i++) {
    var _insertItemIfEmpty = insertItemIfEmpty(overlaps[i], tmp),
        success = _insertItemIfEmpty.success,
        _board = _insertItemIfEmpty.board;

    if (!success) {
      succ = false;
      break;
    }

    tmp = _board;
  }

  return {
    success: succ,
    board: succ ? tmp : board
  };
};
/**
 * 8. 移动元素至目标位置
 */


exports.insertItem = insertItem;

var moveItem = function moveItem(item, board, coord) {
  var tmp = removeItem(item, board);
  var insertRes = insertItem({
    id: item.id,
    x: coord.x,
    y: coord.y,
    h: item.h,
    w: item.w,
    area: item.area
  }, tmp);
  return {
    success: insertRes.success,
    board: insertRes.success ? insertRes.board : board
  };
};
/**
 * 9. 从grid board 返回内部元素
 */


exports.moveItem = moveItem;

var getItems = function getItems(board) {
  var tmp = {};
  board.forEach(function (row) {
    row.forEach(function (item) {
      if (item) {
        tmp[item.id] = item;
      }
    });
  });
  var result = Object.values(tmp);
  return result;
};
/**
 * 10. 寻找空位
 */


exports.getItems = getItems;

var getEmptyPosition = function getEmptyPosition(item, board) {
  var w = item.w,
      h = item.h,
      id = item.id,
      area = item.area;
  var startx = 0;
  var starty = 0;
  var endx = board[0].length;
  var endy = board.length;

  if (area) {
    area.sx && (startx = Math.max(startx, area.sx));
    area.sy && (starty = Math.max(starty, area.sy));
    area.ex && (endx = Math.min(endx, area.ex));
    area.ey && (endy = Math.min(endy, area.ey));
  }

  for (var j = starty; j <= endy - h; j++) {
    for (var i = startx; i <= endx - w; i++) {
      var tmp = {
        id: id,
        x: i,
        y: j,
        w: w,
        h: h,
        area: area
      };

      if (getOverlaps(tmp, board).length === 0) {
        return {
          x: i,
          y: j
        };
      }
    }
  }

  return null;
};

exports.getEmptyPosition = getEmptyPosition;