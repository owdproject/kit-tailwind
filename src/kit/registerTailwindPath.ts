import { createResolver } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'

declare module '@nuxt/schema' {
  interface NuxtConfig {
    desktopTailwindContent?: string[]
  }
}

const DEFAULT_THEME_TAILWIND_GLOBS = [
  './runtime/components/**/*.{vue,mjs,ts}',
  './runtime/apps/**/*.{vue,mjs,ts}',
]

function tailwindContentPaths(nuxt: Nuxt): string[] {
  nuxt.options.desktopTailwindContent ??= []
  return nuxt.options.desktopTailwindContent
}

/**
 * Register a Tailwind content glob; merged on `tailwindcss:config` when kit installs `@nuxtjs/tailwindcss`.
 * Call from themes, built-in apps, or extension modules that ship Vue templates with utility classes.
 */
export function registerTailwindPath(nuxt: Nuxt, path: string): void {
  const paths = tailwindContentPaths(nuxt)
  if (!paths.includes(path)) {
    paths.push(path)
  }
}

/**
 * Register default theme component globs relative to a theme module root (`import.meta.url`).
 */
export function registerThemeTailwindPath(
  nuxt: Nuxt,
  moduleUrl: string,
  glob: string | string[] = DEFAULT_THEME_TAILWIND_GLOBS,
): void {
  const { resolve } = createResolver(moduleUrl)
  const globs = Array.isArray(glob) ? glob : [glob]
  for (const entry of globs) {
    registerTailwindPath(nuxt, resolve(entry))
  }
}
