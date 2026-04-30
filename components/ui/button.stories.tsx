import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { Trash2, Plus, Check } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "ghost",
        "destructive",
        "outline",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "xs", "icon"],
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "default",
  },
}

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
}

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
}

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
}

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
}

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
}

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus size={16} />
        Add New
      </>
    ),
    variant: "default",
  },
}

export const IconOnly: Story = {
  args: {
    size: "icon",
    children: <Trash2 size={16} />,
    variant: "destructive",
  },
}

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
}

export const LoadingState: Story = {
  args: {
    children: "Loading...",
    disabled: true,
  },
}

export const AllVariants = {
  args: {},
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
} satisfies Story

export const AllSizes = {
  args: {},
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="xs">XS</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Check size={16} />
      </Button>
    </div>
  ),
} satisfies Story
