'use client'
import Script from 'next/script'

export default function AdsenseProvider({
  children,
  pubId,
}: {
  children: React.ReactNode
  pubId: string
}) {
  return (
    <>
      {pubId && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      {children}
    </>
  )
}
