import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  typedoc: {
    config: ['./typedoc.{config,dev}.js'],
  },
  ignoreDependencies: ['@changesets/cli'],
}

export default config
