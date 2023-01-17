# Ariane-Router

## Introduction

Ariane-Router is a library that allows you to navigate through your website as if it were a single-page application (SPA) while it's actually a multi-page application (MPA)

- 🛠 With Ariane-Router you can easily manage navigation using hooks before, between, and after loading each page.
- 🎨 It also enables you to create custom animations to enhance user experience.
- 🚦 All you have to do is import Ariane-Router, define actions and hooks, and call the `start()` function to start navigating.

## Getting Started

1. Installation

   ```bash
   npm install ariane-router
   ```

2. Import Ariane-Router

   ```ts
   import { addActions, defineConfig, start } from "ariane-router";
   ```

3. Define actions

   To use the before, between and after hooks, you'll need to define some actions. These actions are simple JavaScript functions that perform the desired behavior. Here's an example of how you might define some actions for your site:

   ```ts
   addActions({
     fadeOut: () => document.querySelector("body").classList.add("fade-out"),
     fadeIn: () => document.querySelector("body").classList.remove("fade-out"),
   });
   ```

4. Define default hooks

   You can set default values for the before, between and after hooks with the defineConfig function. Here's an example of how you might set the before hook to use the fadeOut action by default:

   ```ts
   defineConfig({ before: "fadeOut", between: "fadeIn" });
   ```

5. Start Ariane-Router

   ```ts
   start();
   ```

   After this call, all the links that contain an attribute starting with "ariane-" will have the following behavior: when the user hovers over the link, the destination page will be preloaded, and when the user clicks on the link, the content of the current page will be replaced by that of the preloaded page using the morphdom library. If a before hook is specified for the link, the action associated with that hook will be executed before loading the target page.

   By using this page preloading and replacing behavior on hover and click, the user experience is improved as pages load faster and the application is more fluid.

6. Use the ariane-before/between/after attributes

   To specify a hook for a specific link, you can add the ariane-before, ariane-between and ariane-after attributes to the link, and set their value to the key of the corresponding action. Here's an example:

   ```html
   <a href="/about" ariane-before="fadeOut" ariane-after="fadeIn">About</a>
   ```

7. Use the makeAnim function

   You can also use the makeAnim function to define animation function that can be used in the hook. It takes in as input a selector for the element on which the animation should be applied, an array of keyframes describing the states of the animation and an options object for the animation's parameters such as duration and easing. It returns a function that when called it triggers the animation. This function can be added to Ariane-Router's actions to be used in hooks. It returns a promise that resolves when the animation is completed.
   Here's an example of how you might use it:

   ```ts
   const moveRight = makeAnim(
     "#some-element",
     [{ transform: "translateX(0px)" }, { transform: "translateX(200px)" }],
     { duration: 1000, easing: "ease-in-out" }
   );
   ```

   You can add it to hook by calling the function in the hook, here's an example :

   ```ts
   addActions({ moveRight });
   ```

And that's it! You're now ready to start using Ariane-Router on your site. Happy coding!
