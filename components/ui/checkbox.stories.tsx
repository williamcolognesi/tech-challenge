import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"
import { useState } from "react"

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: "terms",
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor={args.id} className="text-sm cursor-pointer">
        Accept terms
      </label>
    </div>
  ),
}

export const Checked: Story = {
  args: {
    id: "checked",
    checked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor={args.id} className="text-sm cursor-pointer">
        Already checked
      </label>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    id: "disabled",
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor={args.id} className="text-sm cursor-pointer opacity-50">
        Disabled option
      </label>
    </div>
  ),
}

function CheckboxList() {
  const [checks, setChecks] = useState({
    option1: false,
    option2: false,
    option3: false,
  })

  return (
    <div className="space-y-3">
      {Object.entries(checks).map(([key, value]) => (
        <div key={key} className="flex items-center space-x-2">
          <Checkbox
            id={key}
            checked={value}
            onCheckedChange={(checked) =>
              setChecks({ ...checks, [key]: checked })
            }
          />
          <label htmlFor={key} className="text-sm cursor-pointer">
            Option {key.replace("option", "")}
          </label>
        </div>
      ))}
    </div>
  )
}

export const MultipleOptions = {
  render: () => <CheckboxList />,
} satisfies Story
