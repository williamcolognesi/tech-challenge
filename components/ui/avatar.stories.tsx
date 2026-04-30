import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </>
    ),
  },
}

export const WithFallback = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://invalid-url.com/image.png" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
} satisfies Story

export const MultipleAvatars = {
  render: () => (
    <div className="flex gap-2">
      {["CN", "JD", "AB", "XY"].map((initials) => (
        <Avatar key={initials}>
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${initials}`}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
} satisfies Story
