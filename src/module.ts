import { defineNuxtModule, installModule } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'

export function flattenTailwindContentPaths(content: unknown): string[] {
  const paths: string[] = []

  if (typeof content === 'string') {
    paths.push(content)
    return paths
  }

  if (Array.isArray(content)) {
    for (const entry of content) {
      paths.push(...flattenTailwindContentPaths(entry))
    }
    return paths
  }

  if (content && typeof content === 'object') {
    const record = content as Record<string, unknown>
    if (Array.isArray(record.files)) {
      for (const entry of record.files) {
        if (typeof entry === 'string') paths.push(entry)
      }
    }
    for (const [key, value] of Object.entries(record)) {
      if (key === 'files') continue
      paths.push(...flattenTailwindContentPaths(value))
    }
  }

  return paths
}

export function mergeDesktopTailwindContent(
  nuxt: Nuxt,
  config: { content?: unknown; darkMode?: unknown },
) {
  const registered = [...(nuxt.options.desktopTailwindContent ?? [])]
  const prior = flattenTailwindContentPaths(config.content)
  const merged = [...new Set([...prior, ...registered])]

  if (merged.length > 0) {
    config.content = { files: merged }
  }

  config.darkMode = ['class', '.dark']

  if (nuxt.options.dev && merged.length > 0) {
    console.info(
      '[desktop-kit-tailwind] Tailwind content:',
      merged.length,
      'paths',
    )
  }
}

export default defineNuxtModule({
  meta: {
    name: 'desktop-kit-tailwind',
    configKey: 'kitTailwind',
  },
  async setup(options, nuxt) {
    nuxt.hook('tailwindcss:config', (config) => {
      mergeDesktopTailwindContent(nuxt, config)
    })

    // If @nuxtjs/tailwindcss or nuxt-ui isn't already taking care of tailwind, install it.
    // However, we avoid reinstalling if nuxt-ui is present to avoid conflicts.
    if (!nuxt.options.modules.includes('@nuxt/ui')) {
      await installModule('@nuxtjs/tailwindcss', {
        viewer: false,
        quiet: true,
      })
    }
  },
})
