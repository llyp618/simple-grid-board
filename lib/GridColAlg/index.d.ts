/** *********************************Types*************************************** */
export interface IGridItem {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    area?: {
        sx?: number;
        ex?: number;
        sy?: number;
        ey?: number;
    };
}
export declare type TGridItemOrNull = IGridItem | null;
export declare type TGridBoard = TGridItemOrNull[][];
export declare const debug: (on: boolean) => void;
/** *********************************Main*************************************** */
/**
 * 1. 是否重叠
 */
export declare const getOverlaps: (item: IGridItem, board: TGridBoard) => IGridItem[];
/**
 * 2. 是否超出边界 是否非法
 */
export declare const isInvalid: (item: IGridItem, board: TGridBoard) => boolean;
export declare const insertItemIfEmpty: (item: Omit<IGridItem, 'x' | 'y'>, board: TGridBoard) => {
    board: TGridBoard;
    success: boolean;
};
/**
 * 5. 从board移除某个item
 */
export declare const removeItem: (item: IGridItem, board: TGridBoard) => TGridBoard;
/**
 * 6. 初始化返回 GridBoard
 */
export declare const initBoard: (col: number, row: number, items?: IGridItem[] | undefined) => TGridBoard;
/**
 * 7. 塞入新元素，重排布局，如果没有剩余空间则返回提示
 */
export declare const insertItem: (item: IGridItem, board: TGridBoard) => {
    board: TGridBoard;
    success: boolean;
};
/**
 * 8. 移动元素至目标位置
 */
export declare const moveItem: (item: IGridItem, board: TGridBoard, coord: {
    x: number;
    y: number;
}) => {
    success: boolean;
    board: TGridBoard;
};
/**
 * 9. 从grid board 返回内部元素
 */
export declare const getItems: (board: TGridBoard) => IGridItem[];
/**
 * 10. 寻找空位
 */
export declare const getEmptyPosition: (item: Omit<IGridItem, 'x' | 'y'>, board: TGridBoard) => {
    x: number;
    y: number;
} | null;
