type AnimOptions = {
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

type AnimateParameters = [keyframes: Keyframe[], options: AnimOptions | number];
const playAnim = ({
  selector,
  anim,
}: {
  selector: string;
  anim: AnimateParameters;
}) => {
  const element = document.querySelector(selector);
  return new Promise<Event>((res, rej) => {
    if (!element) {
      rej(new Error("No Element for " + selector));
      return;
    }
    if (!element?.animate) {
      rej("Element.animate is not supported in this environment");
      return;
    }
    const animation = element?.animate(...anim);
    animation.addEventListener("finish", (e) => {
      res(e);
    });
  });
};

export const makeAnim =
  (selector: string, ...anim: AnimateParameters) =>
  () =>
    playAnim({ selector, anim });
