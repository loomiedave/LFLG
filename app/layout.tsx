// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="fr" className="h-full" suppressHydrationWarning>
        <body className={`${inter.className} h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}