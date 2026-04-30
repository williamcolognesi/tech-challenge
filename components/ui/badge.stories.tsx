import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Badge",
  },
}

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
}

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
}

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
}

export const AllVariants = {
  args: {},
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
} satisfies Story

export const WithText = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <div>
        <span className="text-sm mr-2">Status:</span>
        <Badge>Active</Badge>
      </div>
      <div>
        <span className="text-sm mr-2">Priority:</span>
        <Badge variant="destructive">High</Badge>
      </div>
      <div>
        <span className="text-sm mr-2">Tag:</span>
        <Badge variant="outline">Feature</Badge>
      </div>
    </div>
  ),
} satisfies Story
