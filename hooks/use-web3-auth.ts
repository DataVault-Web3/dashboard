
'use client'

import { useAccount, useDisconnect } from 'wagmi'
import { useEffect, useState } from 'react'

export function useWeb3Auth() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()

  // Don't return connection state until client is mounted
  if (!mounted) {
    return {
      address: undefined,
      isConnected: false,
      isConnecting: false,
      disconnect: () => {},
      shortAddress: undefined,
    }
  }

  return {
    address,
    isConnected,
    isConnecting,
    disconnect,
    // Helper to get short address format
    shortAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : undefined,
  }
}
