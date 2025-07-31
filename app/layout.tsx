import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rentify - Find Your Perfect Rental Property",
  description: "Discover and book rental properties with ease. Connect property owners with tenants on our secure platform.",
  keywords: "rental properties, apartments, houses, property owners, tenants, real estate",
  authors: [{ name: "Rentify Team" }],
  creator: "Rentify",
  publisher: "Rentify",
  openGraph: {
    title: "Rentify - Find Your Perfect Rental Property",
    description: "Discover and book rental properties with ease. Connect property owners with tenants on our secure platform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rentify - Find Your Perfect Rental Property",
    description: "Discover and book rental properties with ease.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function removeDevTools() {
                document.querySelectorAll('button[data-nextjs-dev-tools-button="true"], button[data-next-mark="true"], button[aria-label="Open Next.js Dev Tools"]').forEach(el => el.remove());
              }
              setInterval(removeDevTools, 100);
              removeDevTools();
            `,
          }}
        />
      </body>
    </html>
  )
}
