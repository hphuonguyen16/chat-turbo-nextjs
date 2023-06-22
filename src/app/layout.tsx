import './globals.css'
import { Inter } from 'next/font/google'
import ThemeProvider from "../theme";
import * as React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat Turbo',
  description: 'Chat Turbo is a chat application built with Next.js and Socket.io',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
            <div className="container">
              {children}
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
