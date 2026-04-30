import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal = {
  render: () => (
    <div className="w-96">
      <div>
        <h3 className="text-lg font-semibold">Item 1</h3>
      </div>
      <Separator className="my-4" />
      <div>
        <h3 className="text-lg font-semibold">Item 2</h3>
      </div>
    </div>
  ),
} satisfies Story

export const Vertical = {
  render: () => (
    <div className="flex gap-4">
      <div>Left Content</div>
      <Separator orientation="vertical" />
      <div>Right Content</div>
    </div>
  ),
} satisfies Story

export const InList = {
  render: () => (
    <div className="w-96">
      {["Item 1", "Item 2", "Item 3"].map((item, i) => (
        <div key={i}>
          <p>{item}</p>
          {i < 2 && <Separator className="my-2" />}
        </div>
      ))}
    </div>
  ),
} satisfies Story
