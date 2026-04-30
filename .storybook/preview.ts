import type { Preview } from "@storybook/nextjs-vite"
import type { ReactNode } from "react"
import React from "react"
import { Geist } from "next/font/google"
import "../app/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: () => ReactNode) => {
      return React.createElement(
        "div",
        {
          className: `${geistSans.variable} antialiased`,
          style: { fontFamily: 'var(--font-geist-sans), sans-serif' },
        },
        React.createElement(Story)
      )
    },
  ],
}

export default preview
