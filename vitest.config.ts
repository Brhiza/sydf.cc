import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const testEnv: ConfigEnv = {
  command: 'serve',
  mode: 'test',
  isSsrBuild: false,
  isPreview: false,
}

const resolvedViteConfig =
  typeof viteConfig === 'function'
    ? (viteConfig(testEnv) as UserConfig)
    : (viteConfig as UserConfig)

const nodeMajorVersion = Number.parseInt(process.versions.node.split('.')[0] ?? '0', 10)
const execArgv = nodeMajorVersion >= 25 ? ['--no-webstorage'] : []

export default mergeConfig(
  resolvedViteConfig,
  defineConfig({
    test: {
      environment: 'node',
      clearMocks: true,
      restoreMocks: true,
      include: ['src/**/*.test.ts'],
      execArgv,
    },
  })
)
