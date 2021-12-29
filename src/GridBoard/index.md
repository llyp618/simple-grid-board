---
sidemenu: false
---

## GridBoard

```tsx
import React from 'react';
import GridBoard from 'simple-grid-board';

export default () => (
  <GridBoard
    col={6}
    row={6}
    width={600}
    height={500}
    items={[
      { id: 'a', x: 0, y: 0, w: 2, h: 1 },
      { id: 'b', x: 0, y: 1, w: 1, h: 1 },
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

### With item render

```tsx
import React from 'react';
import GridBoard from 'simple-grid-board';
export default () => (
  <GridBoard
    col={6}
    row={6}
    width={600}
    height={500}
    items={[
      { id: 'b', x: 0, y: 1, w: 1, h: 1 },
      { id: 'd', x: 1, y: 1, w: 2, h: 2 },
      { id: 'c', x: 2, y: 0, w: 2, h: 1 },
      {
        id: 'e',
        x: 3,
        y: 3,
        w: 3,
        h: 3,
        render: (item, ph) => {
          const x = ph?.x ?? item.x
          const src = x < 2 ? '/simple-grid-board/img/p2.jpg' : '/simple-grid-board/img/p3.jpg';
          return <img draggable={false} src={src} />;
        },
      },
      { id: 'f', x: 1, y: 3, w: 2, h: 1 },
      { id: 'h', x: 1, y: 5, w: 1, h: 1 },
      { id: 'i', x: 0, y: 2, w: 1, h: 1 },
      { id: 'j', x: 0, y: 3, w: 1, h: 1 },
      { id: 'k', x: 0, y: 4, w: 1, h: 1 },
      {
        id: 'z',
        x: 4,
        y: 0,
        w: 2,
        h: 2,
        render: (item, ph) => {
          const x = ph?.x ?? item.x
          return x < 3 ? 'I am on the left' : 'I am on the right';
        },
      },
      { id: 'y', x: 3, y: 1, w: 1, h: 2 },
    ]}
  />
);
```
