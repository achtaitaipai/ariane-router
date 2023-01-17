declare const attributes: readonly ["before", "between", "after"];
declare type OptionsKeys = typeof attributes[number];
export declare type Options = Partial<Record<OptionsKeys, string>>;
export declare const defineConfig: (options: Options) => void;
export declare const getOptions: (link: HTMLAnchorElement) => {
    before?: string | undefined;
    between?: string | undefined;
    after?: string | undefined;
};
export {};
