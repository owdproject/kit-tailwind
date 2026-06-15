import { createJiti } from "file:///home/dxlliv/Development/Projects/OWD/client/node_modules/.pnpm/jiti@2.6.1/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@owdproject/kit-tailwind": "/home/dxlliv/Development/Projects/OWD/client/packages/kit-tailwind"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/home/dxlliv/Development/Projects/OWD/client/packages/kit-tailwind/src/module.js")} */
const _module = await jiti.import("/home/dxlliv/Development/Projects/OWD/client/packages/kit-tailwind/src/module.ts");

export default _module?.default ?? _module;
export const flattenTailwindContentPaths = _module.flattenTailwindContentPaths;
export const mergeDesktopTailwindContent = _module.mergeDesktopTailwindContent;