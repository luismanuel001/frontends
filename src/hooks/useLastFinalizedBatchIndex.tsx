import { ethers } from "ethers"
import useSWR from "swr"

import ScrollChain from "@/assets/abis/ScrollChain.json"
import { CHAIN_ID } from "@/constants"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"

const useLastFinalizedBatchIndex = () => {
  const { networksAndSigners } = useBrigeContext()

  async function fetchLastFinalizedBatchIndex() {
    const provider = networksAndSigners[CHAIN_ID.L1].provider
    try {
      if (!provider) {
        return null
      }
      const scrollChain = new ethers.Contract(process.env.NEXT_PUBLIC_SCROLL_CHAIN, ScrollChain, provider)
      return await scrollChain.lastFinalizedBatchIndex()
    } catch (error) {}
  }

  const { data, error, isLoading } = useSWR(() => "lastFinalizedBatchIndex", fetchLastFinalizedBatchIndex, {
    refreshInterval: 3e3,
  })
  return {
    loading: isLoading,
    lastFinalizedBatchIndex: data || 0,
    error,
  }
}

export default useLastFinalizedBatchIndex
