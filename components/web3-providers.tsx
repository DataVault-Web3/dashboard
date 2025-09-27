
'use client'

import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import {
  polygonAmoy
} from 'wagmi/chains'
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { ClientOnly } from './client-only'
import { useState, useEffect } from 'react'

const queryClient = new QueryClient()

export function Web3Providers({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<any>(null)
  
  useEffect(() => {
    // Initialize config on client side only
    const clientConfig = getDefaultConfig({
      appName: 'DataVault Business',
      projectId: 'hackathon-datavault-project-2024',
      chains: [polygonAmoy],
      ssr: false, // Disable SSR for Web3
    })
    setConfig(clientConfig)
  }, [])

  const { resolvedTheme } = useTheme()
  
  if (!config) {
    return <>{children}</>
  }
  
  return (
    <ClientOnly>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={resolvedTheme === 'dark' ? darkTheme() : lightTheme()}
            modalSize="compact"
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ClientOnly>
  )
}
