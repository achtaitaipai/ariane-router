export declare const addActions: (newActions: {
    [k: string]: Function;
}) => void;
export declare const hasAction: (key: string) => boolean;
export declare const deleteAction: (key: string) => void;
export declare const resetActions: () => void;
export declare const playAction: (key: string) => any;
