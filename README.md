## API

Simple and easy!

#### Type Declaration

```js
interface Item {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  render?: (item: IGridItem, placeholder: TPlaceholder) => React.ReactNode;
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
```

#### Board Props

| props           | type   | explain              |
| :-------------- | :----- | :------------------- |
| col             | number | columns of the board |
| row             | number | rows of the board    |
| width           | number | width of the board   |
| height          | number | height of the board  |
| items           | Item   | the items            |
| boardClassName? | string | board class          |
| itemClassName?  | string | item class           |
| phClassName?    | string | placeholder class    |

#### Item Props

| props   | type                             | explain                                 |
| :------ | :------------------------------- | :-------------------------------------- |
| id      | string                           | key of the item                         |
| x       | number                           | X coordinate of the item, range 0 - col |
| y       | number                           | Y coordinate of the item range 0 - row  |
| w       | number                           | width of the item, range 1 - col        |
| h       | number                           | height of the item ,range 1 - row       |
| render? | (item, placeholder) => ReactNode | the element children of the item        |

#### Demo

```js
import React from 'react';
import GridBoard from 'simple-grid-board';

export default () => (
  <GridBoard
    col={6}
    row={6}
    width={600}
    height={500}
    items={[
      {
        id: 'a',
        x: 0,
        y: 0,
        w: 2,
        h: 1,
        render() {
          return <div>AAAA</div>;
        },
      },
      {
        id: 'b',
        x: 0,
        y: 1,
        w: 1,
        h: 1,
        render() {
          return <div>BBBB</div>;
        },
      },
      { id: 'd', x: 1, y: 1, w: 2, h: 2 },
      { id: 'c', x: 2, y: 0, w: 2, h: 1 },
      { id: 'e', x: 3, y: 3, w: 3, h: 3 },
      { id: 'f', x: 1, y: 3, w: 2, h: 1 },
      { id: 'h', x: 1, y: 5, w: 1, h: 1 },
      { id: 'i', x: 0, y: 2, w: 1, h: 1 },
      { id: 'j', x: 0, y: 3, w: 1, h: 1 },
      { id: 'k', x: 0, y: 4, w: 1, h: 1 },
      { id: 'z', x: 4, y: 0, w: 2, h: 2 },
      { id: 'y', x: 3, y: 1, w: 1, h: 2 },
    ]}
  />
);
```
for more demo: see [DEMO](https://llyp618.github.io/simple-grid-board/grid-board)