import { describe, expect, it, vi } from 'vitest'

import { enableImmediateServiceWorkerActivation } from './serviceWorkerLifecycle'

describe('enableImmediateServiceWorkerActivation', () => {
  it('应立即激活新 Service Worker 并接管当前页面', () => {
    const skipWaiting = vi.fn()
    const claimClients = vi.fn()

    enableImmediateServiceWorkerActivation({
      skipWaiting,
      claimClients
    })

    expect(skipWaiting).toHaveBeenCalledTimes(1)
    expect(claimClients).toHaveBeenCalledTimes(1)
  })
})
