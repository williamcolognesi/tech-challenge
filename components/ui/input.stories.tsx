import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "date"],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Digite algo...",
  },
}

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "seu@email.com",
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Senha",
  },
}

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Digite um número",
  },
}

export const Date: Story = {
  args: {
    type: "date",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Desabilitado",
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    placeholder: "Digite algo...",
    defaultValue: "Valor pré-preenchido",
  },
}

export const AllTypes = {
  args: {},
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="text-sm font-medium mb-1 block">Text</label>
        <Input type="text" placeholder="Texto" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Email</label>
        <Input type="email" placeholder="seu@email.com" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Password</label>
        <Input type="password" placeholder="Senha" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Number</label>
        <Input type="number" placeholder="Número" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Date</label>
        <Input type="date" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Disabled</label>
        <Input placeholder="Desabilitado" disabled />
      </div>
    </div>
  ),
} satisfies Story
