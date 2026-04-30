import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

function PopoverDemo() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-semibold">Popover Title</h4>
          <p className="text-sm text-muted-foreground">
            This is a popover with custom content
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const Default = {
  render: () => <PopoverDemo />,
} satisfies Story

function HelpPopover() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter email"
        className="px-3 py-2 border rounded-lg"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            ?
          </Button>
        </PopoverTrigger>
        <PopoverContent className="text-sm">
          Enter a valid email address for your account
        </PopoverContent>
      </Popover>
    </div>
  )
}

export const WithHelp = {
  render: () => <HelpPopover />,
} satisfies Story
