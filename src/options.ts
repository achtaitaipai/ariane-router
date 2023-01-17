const attributes = ["before", "between", "after"] as const;

type OptionsKeys = typeof attributes[number];

export type Options = Partial<Record<OptionsKeys, string>>;

let userConfig: Options = {};

export const defineConfig = (options: Options) => {
  userConfig = options;
};

export const getOptions = (link: HTMLAnchorElement) => ({
  ...userConfig,
  ...getOptionsFromAttributes(link),
});

const getOptionsFromAttributes = (link: HTMLAnchorElement) =>
  attributes.reduce<Options>((options, current) => {
    const value = link.getAttribute("ariane-" + current);
    if (value === null || value === undefined) return options;
    return { ...options, [current]: value };
  }, {});
