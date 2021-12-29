import React from 'react';
import { IGridItem } from '../GridColAlg';
import './index.less';
declare type TPlaceholder = Omit<IGridItem, 'id'> | null;
interface Item extends IGridItem {
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
declare const GridBoard: React.FC<GBProps>;
export default GridBoard;
