declare const _default: {
    start: () => void;
    defineConfig: (options: Partial<Record<"before" | "between" | "after", string>>) => void;
    addActions: (newActions: {
        [k: string]: Function;
    }) => void;
    makeAnim: (selector: string, keyframes: Keyframe[], options: number | {
        delay?: number | undefined;
        direction?: "normal" | "reverse" | "alternate" | "alternate-reverse" | undefined;
        duration: number;
        easing?: string | undefined;
        endDelay?: number | undefined;
        fill?: "backwards" | "forwards" | "both" | "none" | undefined;
        iterationStart?: number | undefined;
        iterations?: number | undefined;
        composite?: "replace" | "add" | "accumulate" | undefined;
        iterationComposite?: "replace" | "accumulate" | undefined;
    }) => () => Promise<Event>;
};
export default _default;
