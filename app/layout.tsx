import './globals.css'
import type { Metadata } from 'next'
import { PT_Sans } from 'next/font/google'

const inter = PT_Sans({
  weight: "400",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: 'Manishop Admin',
  description: 'Manishop admin panel.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="en">
      <link rel="icon" href="/MS.svg" sizes="any" />
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}
