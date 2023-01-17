declare type AnimOptions = {
    delay?: number;
    direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
    duration: number;
    easing?: string;
    endDelay?: number;
    fill?: "backwards" | "forwards" | "both" | "none";
    iterationStart?: number;
    iterations?: number;
    composite?: "replace" | "add" | "accumulate";
    iterationComposite?: "accumulate" | "replace";
};
export declare const makeAnim: (selector: string, keyframes: Keyframe[], options: number | AnimOptions) => () => Promise<Event>;
export {};
