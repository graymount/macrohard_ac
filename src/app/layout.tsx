import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { GA_TRACKING_ID } from '@/lib/analytics'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Macrohard Academic - Free Academic Tools for Students & Researchers',
  description: 'Free academic tools for students, educators and researchers. Citation generator, GPA calculator, scientific calculator, word counter and more. All tools work privately in your browser.',
  keywords: 'academic tools,citation generator,GPA calculator,scientific calculator,student tools,research tools,APA citation,MLA format,bibliography,study tools,education tools',
  authors: [{ name: 'Macrohard Academic Team' }],
  openGraph: {
    title: 'Macrohard Academic - Free Academic Tools',
    description: 'Essential academic tools for students, educators and researchers',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Macrohard Academic',
    description: 'Free Academic Tools for Students',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2024 Macrohard Academic. All rights reserved.
              </p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
                <a href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</a>
                <a href="/about" className="hover:text-foreground transition-colors">About</a>
                <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}