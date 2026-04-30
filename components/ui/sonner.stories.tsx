import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { toast } from "sonner"

const meta: Meta = {
  title: "UI/Sonner",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast("Hello World")}>Show Toast</Button>
  ),
}

export const Success: Story = {
  render: () => (
    <Button
      onClick={() => toast.success("Operation successful!")}
      className="bg-green-600 hover:bg-green-700"
    >
      Show Success
    </Button>
  ),
}

export const Error: Story = {
  render: () => (
    <Button
      onClick={() => toast.error("Something went wrong")}
      className="bg-red-600 hover:bg-red-700"
    >
      Show Error
    </Button>
  ),
}

export const Loading: Story = {
  render: () => (
    <Button
      onClick={() => toast.loading("Loading...")}
      className="bg-blue-600 hover:bg-blue-700"
    >
      Show Loading
    </Button>
  ),
}

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-2">
      <Button onClick={() => toast("Regular toast")}>Regular</Button>
      <Button onClick={() => toast.success("Success!")} variant="secondary">
        Success
      </Button>
      <Button onClick={() => toast.error("Error!")} variant="destructive">
        Error
      </Button>
      <Button onClick={() => toast.loading("Loading...")} variant="outline">
        Loading
      </Button>
    </div>
  ),
}
