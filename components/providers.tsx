
'use client'

import { Web3Providers } from './web3-providers'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3Providers>
      {children}
    </Web3Providers>
  )
}
