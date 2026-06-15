import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  failOnWarn: false,
  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    '@owdproject/core',
    '@owdproject/module-fs',
    'vue3-selecto',
    '@nuxt/ui',
    'vue',
    'nuxt',
    'nuxt/app',
  ],
})
