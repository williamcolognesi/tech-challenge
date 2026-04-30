import type { Meta, StoryObj } from "@storybook/react"
import { VirtualCard } from "./virtual-card"

const meta: Meta<typeof VirtualCard> = {
  title: "Components/VirtualCard",
  component: VirtualCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A beautiful animated virtual card component that displays a credit card with animated number changes every 2 seconds.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  render: () => (
    <div className="bg-gray-100 p-8 rounded-lg">
      <VirtualCard />
    </div>
  ),
} satisfies Story

export const MultipleCards = {
  render: () => (
    <div className="flex gap-4 flex-wrap justify-center bg-gray-100 p-8 rounded-lg">
      <VirtualCard />
      <VirtualCard />
      <VirtualCard />
    </div>
  ),
} satisfies Story
