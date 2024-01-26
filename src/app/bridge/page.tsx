"use client"

import { useEffect } from "react"

import { Stack, Typography } from "@mui/material"

import GlobalComponents from "@/components/GlobalComponents"
import SectionWrapper from "@/components/SectionWrapper"
import { NETWORKS } from "@/constants"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import { PriceFeeProvider } from "@/contexts/PriceFeeProvider"
import useBridgeStore from "@/stores/bridgeStore"
import { isSepolia } from "@/utils"

import Send from "./Send"
import HistoryButton from "./components/HistoryButton"
import FAQsLink from "./faq/link"

const Bridge = () => {
  const { txType, changeFromNetwork, changeToNetwork } = useBridgeStore()

  useEffect(() => {
    if (txType === "Deposit") {
      changeFromNetwork(NETWORKS[0])
      changeToNetwork(NETWORKS[1])
    } else {
      changeFromNetwork(NETWORKS[1])
      changeToNetwork(NETWORKS[0])
    }
  }, [txType])

  return (
    <BridgeContextProvider>
      <PriceFeeProvider>
        <GlobalComponents></GlobalComponents>
        <SectionWrapper
          sx={{
            pt: ["4.8rem", "8.4rem"],
            pb: "6rem",
            minHeight: "calc(100vh - 69.2rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: ["flex-start", "center"],
            maxWidth: ["100% !important"],
          }}
        >
          <Stack
            direction="row"
            sx={{ mb: "2.4rem", width: "64rem", maxWidth: "100%" }}
            spacing="2rem"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                fontSize: ["4rem", "4.8rem"],
                lineHeight: ["4.8rem", "7.2rem"],
                fontWeight: 600,
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {isSepolia ? `${process.env.REACT_APP_SCROLL_ENVIRONMENT} Testnet` : ""} Bridge
            </Typography>
            <HistoryButton></HistoryButton>
          </Stack>
          <Send></Send>
          <FAQsLink />
        </SectionWrapper>
      </PriceFeeProvider>
    </BridgeContextProvider>
  )
}

export default Bridge
