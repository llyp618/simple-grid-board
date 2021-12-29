import React, { useState, useLayoutEffect, useEffect } from 'react';
import { initBoard, getItems, moveItem, IGridItem, TGridBoard } from '../GridColAlg';
import Draggable from 'react-draggable';
import { Motion, presets, spring } from '@serprex/react-motion';
import './index.less';

type TPlaceholder = Omit<IGridItem, 'id'> | null;

type TDragging = (IGridItem & { dx: number; dy: number }) | null;

interface Item extends IGridItem {
  render?: (item: IGridItem, placeholder: TPlaceholder) => React.ReactNode;
}

interface ItemRenders {
  [key: string]: ((item: IGridItem, placeholder: TPlaceholder) => React.ReactNode) | undefined;
}

interface GBProps {
  col: number;
  row: number;
  width: number;
  height: number;
  items: Item[];
  boardClassName?: string;
  itemClassName?: string;
  phClassName?: string;
}

const parseItems = (items: Item[]) => {
  const renders: ItemRenders = {};
  const gridItems = items.map((item) => {
    const { render, ...rest } = item;
    renders[item.id] = render;
    return rest;
  });
  return {
    renders,
    gridItems,
  };
};

const GridBoard: React.FC<GBProps> = (props) => {
  const {
    col,
    row,
    width,
    height,
    items,
    boardClassName = '',
    itemClassName = '',
    phClassName = '',
  } = props;
  const [dragging, setDragging] = useState<TDragging>(null);
  const [placeholder, setPlaceholder] = useState<TPlaceholder>(null);
  const [board, setBoard] = useState<TGridBoard>([]);
  const [renders, setRenders] = useState<ItemRenders>({});
  const unitHeight = height / row;
  const unitWidth = width / col;

  useLayoutEffect(() => {
    const { renders, gridItems } = parseItems(items);
    setBoard(initBoard(col, row, gridItems));
    setRenders(renders);
  }, [items, col, row]);

  useEffect(() => {
    setPlaceholder(null);
    setDragging(null);
  }, [board]);

  const itemList = getItems(board);

  return (
    <div className={`grid-board ${boardClassName}`} style={{ width, height }}>
      {placeholder ? (
        <Motion
          key="ph"
          style={{
            x: spring(placeholder!.x, presets.wobbly),
            y: spring(placeholder!.y),
          }}
        >
          {(style) => (
            <span
              className={`grid-ph ${phClassName}`}
              style={{
                position: 'absolute',
                width: placeholder.w * unitWidth,
                height: placeholder.h * unitHeight,
                transform: `translate(${style.x * unitWidth}px, ${style.y * unitHeight}px)`,
              }}
            ></span>
          )}
        </Motion>
      ) : null}
      {itemList.map((item, i: number) => {
        const uw = item.w * unitWidth;
        const ux = item.x * unitWidth;
        const uh = item.h * unitHeight;
        const uy = item.y * unitHeight;
        return (
          <Motion
            key={item.id}
            style={{
              x: item.id === dragging?.id ? dragging.dx : spring(ux, presets.noWobble),
              y: item.id === dragging?.id ? dragging.dy : spring(uy, presets.noWobble),
            }}
          >
            {(style) => {
              return (
                <Draggable
                  key={item.id}
                  position={{ x: style.x, y: style.y }}
                  onDrag={(e, data) => {
                    const dragging = {
                      ...item,
                      dx: data.x,
                      dy: data.y,
                    };
                    let px = Math.round(dragging.dx / unitWidth);
                    let py = Math.round(dragging.dy / unitHeight);
                    px = Math.max(px, 0);
                    px = Math.min(px, col - item.w);
                    py = Math.max(py, 0);
                    py = Math.min(py, row - item.h);
                    setDragging(dragging);
                    setPlaceholder({
                      x: px,
                      y: py,
                      w: item.w,
                      h: item.h,
                    });
                  }}
                  onStop={(e) => {
                    if (dragging) {
                      const x = placeholder!.x;
                      const y = placeholder!.y;
                      const tmp = moveItem(item, board, { x, y });
                      setBoard([...tmp.board]);
                    }
                  }}
                >
                  <div className={`grid-item ${itemClassName}`} style={{ width: uw, height: uh }}>
                    {renders[item.id]?.(item, dragging?.id === item.id ? placeholder : null) ||
                      item.id}
                  </div>
                </Draggable>
              );
            }}
          </Motion>
        );
      })}
    </div>
  );
};

export default GridBoard;
