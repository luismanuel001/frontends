import type { Metadata, ResolvingMetadata } from "next"
import { headers } from "next/headers"
import Router from "next/router"
import React from "react"
import { TssCacheProvider } from "tss-react"
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { default as ScrollToTop } from "@/components/ScrollToTop"
import RainbowProvider from "@/contexts/RainbowProvider"
import { checkMatchPath, findCurrentRoute } from "@/hooks/useMatchedRoute"
import { VersionChecker } from "@/hooks/useVersionCheck"
import ScrollThemeProvider from "@/theme"

import "./globals.css"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getImageUrl = (pathname, type = "") => {
  if (pathname.startsWith("/developer-nft")) {
    return `/${type || "og"}_scroll_origins_nft.png`
  } else if (pathname.startsWith("/brand-kit")) {
    return `/og_scroll_brand.png`
  }
  return "/og_scroll.png"
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { pathname, origin } = new URL(headers().get("x-url")!)
  const route = findCurrentRoute(pathname)
  const title = `Scroll${route ? " – " + route.name : null}`
  const description = route.description || "Native zkEVM Layer 2 for Ethereum"

  return {
    metadataBase: new URL(origin),
    title,
    description,
    keywords: ["layer 2", "ethereum", "zero knowledge proof", "scalability", "ZKP", "l2", "EVM compatible", "zk rollup"],
    openGraph: {
      title,
      description,
      siteName: title,
      url: pathname,
      images: [getImageUrl(pathname)],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title,
      description,
      images: [getImageUrl(pathname, "twitter")],
    },
    icons: {
      apple: "/logo.png",
    },
    // See https://developers.google.com/web/fundamentals/web-app-manifest/
    manifest: "/manifest.json",
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_BASE_URI} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_BASE_URI} crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400;8..144,500;8..144,600;8..144,700;8..144,800&display=swap"
          rel="stylesheet"
        />
        {/* TODO: only on blog detail page */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
          integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
          <ScrollThemeProvider>
            <VersionChecker>
              <RainbowProvider>{children}</RainbowProvider>
            </VersionChecker>
            <ScrollToTop />
          </ScrollThemeProvider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  )
}
