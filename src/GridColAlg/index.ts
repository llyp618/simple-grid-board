import deepClone from './deepClone';

/** *********************************Types*************************************** */

export interface IGridItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  area?: {
    sx?: number; // startX
    ex?: number; // endX
    sy?: number; // startY
    ey?: number; // endY
  };
}

export type TGridItemOrNull = IGridItem | null;

export type TGridBoard = TGridItemOrNull[][];

/** *********************************Utils*************************************** */

const isEmpty = (v: TGridItemOrNull) => {
  return v === null;
};

/**
 * debug switch
 */
let LOG = false;

export const debug = (on: boolean) => {
  LOG = on;
};

const log = (message: string) => {
  LOG && console.warn('[grid-board]' + message);
};
/** *********************************Main*************************************** */

/**
 * 1. 是否重叠
 */
export const getOverlaps = (item: IGridItem, board: TGridBoard): IGridItem[] => {
  const { x, y, w, h, id } = item;
  let result: IGridItem[] = [];
  for (let j = y; j < y + h; j++) {
    for (let i = x; i < x + w; i++) {
      if (!isEmpty(board[j][i]) && result.findIndex((g) => g && g.id === board[j][i]?.id) === -1) {
        result.push(board[j][i]!);
        log(`${id} overlaps with ${board[j][i]?.id}`);
      }
    }
  }
  return result.sort((a, b) => {
    return b.w * b.h - a.w * a.h; // 从大到小排序
  });
};

/**
 * 2. 是否超出边界 是否非法
 */
export const isInvalid = (item: IGridItem, board: TGridBoard): boolean => {
  const { x, y, w, h, id, area } = item;
  if (w < 1 || h < 1) {
    log(`The width and height of '${id}' must be greater than or equal to 1`);
    return true;
  }
  let startx = 0;
  let starty = 0;
  let endx = board[0].length;
  let endy = board.length;

  if (area) {
    area.sx && (startx = Math.max(startx, area.sx));
    area.sy && (starty = Math.max(starty, area.sy));
    area.ex && (endx = Math.min(endx, area.ex));
    area.ey && (endy = Math.min(endy, area.ey));
  }

  const isOut = !(
    x < endx &&
    x >= startx &&
    y < endy &&
    y >= starty &&
    x + w <= endx &&
    y + h <= endy
  );

  if (isOut) {
    log(`'${id}' is out of bounds`);
    return true;
  }

  return false;
};

/**
 * 3. 向指定坐标填入GridItem,不考虑重叠问题，不考虑出界问题
 */
const insertItemAnyway = (item: IGridItem, board: TGridBoard): TGridBoard => {
  const _board = deepClone(board);
  const { x, y, w, h } = item;
  for (let j = y; j < y + h; j++) {
    for (let i = x; i < x + w; i++) {
      _board[j][i] = item;
    }
  }
  return _board;
};

// 4.2  找到空位并填入，否则跳过 原算法
export const insertItemIfEmpty = (
  item: Omit<IGridItem, 'x' | 'y'>,
  board: TGridBoard,
): { board: TGridBoard; success: boolean } => {
  const { w, h, id, area } = item;
  let startx = 0;
  let starty = 0;
  let endx = board[0].length;
  let endy = board.length;

  if (area) {
    area.sx && (startx = Math.max(startx, area.sx));
    area.sy && (starty = Math.max(starty, area.sy));
    area.ex && (endx = Math.min(endx, area.ex));
    area.ey && (endy = Math.min(endy, area.ey));
  }

  let success = false;
  let _board = board;
  for (let j = starty; j <= endy - h; j++) {
    for (let i = startx; i <= endx - w; i++) {
      let tmp = { id, x: i, y: j, w, h, area };
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
    success,
    board: _board,
  };
};

/**
 * 5. 从board移除某个item
 */
export const removeItem = (item: IGridItem, board: TGridBoard): TGridBoard => {
  const { x, y, w, h } = item;
  const _board = deepClone(board);
  for (let j = y; j < y + h; j++) {
    for (let i = x; i < x + w; i++) {
      _board[j][i] = null;
    }
  }
  return _board;
};

/**
 * 6. 初始化返回 GridBoard
 */
export const initBoard = (col: number, row: number, items?: IGridItem[]): TGridBoard => {
  let _board = Array(row)
    .fill('')
    .map(() => Array(col).fill(null));
  if (items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
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
export const insertItem = (
  item: IGridItem,
  board: TGridBoard,
): { board: TGridBoard; success: boolean } => {
  if (isInvalid(item, board)) {
    log(`'${item.id}' is out of bounds`);
    return {
      success: false,
      board,
    };
  }
  const overlaps = getOverlaps(item, board);
  // 如果没有重叠
  if (overlaps.length === 0) {
    return {
      success: true,
      board: insertItemAnyway(item, board),
    };
  }
  // 如果重叠了，计算是否有剩余空间调整被挤占空间的原元素单位
  let tmp = deepClone(board);
  overlaps.forEach((i) => {
    tmp = removeItem(i, tmp);
  });
  tmp = insertItemAnyway(item, tmp);
  // 依次从大到小填入
  let succ = true;
  for (let i = 0; i < overlaps.length; i++) {
    const { success, board: _board } = insertItemIfEmpty(overlaps[i], tmp);
    if (!success) {
      succ = false;
      break;
    }
    tmp = _board;
  }

  return {
    success: succ,
    board: succ ? tmp : board,
  };
};

/**
 * 8. 移动元素至目标位置
 */
export const moveItem = (item: IGridItem, board: TGridBoard, coord: { x: number; y: number }) => {
  const tmp = removeItem(item, board);
  const insertRes = insertItem(
    {
      id: item.id,
      x: coord.x,
      y: coord.y,
      h: item.h,
      w: item.w,
      area: item.area,
    },
    tmp,
  );
  return {
    success: insertRes.success,
    board: insertRes.success ? insertRes.board : board,
  };
};

/**
 * 9. 从grid board 返回内部元素
 */
export const getItems = (board: TGridBoard): IGridItem[] => {
  const tmp: any = {};

  board.forEach((row) => {
    row.forEach((item) => {
      if (item) {
        tmp[item.id] = item;
      }
    });
  });

  const result: IGridItem[] = Object.values(tmp);

  return result;
};

/**
 * 10. 寻找空位
 */
export const getEmptyPosition = (
  item: Omit<IGridItem, 'x' | 'y'>,
  board: TGridBoard,
): { x: number; y: number } | null => {
  const { w, h, id, area } = item;
  let startx = 0;
  let starty = 0;
  let endx = board[0].length;
  let endy = board.length;

  if (area) {
    area.sx && (startx = Math.max(startx, area.sx));
    area.sy && (starty = Math.max(starty, area.sy));
    area.ex && (endx = Math.min(endx, area.ex));
    area.ey && (endy = Math.min(endy, area.ey));
  }

  for (let j = starty; j <= endy - h; j++) {
    for (let i = startx; i <= endx - w; i++) {
      let tmp = { id, x: i, y: j, w, h, area };
      if (getOverlaps(tmp, board).length === 0) {
        return { x: i, y: j };
      }
    }
  }
  return null;
};
