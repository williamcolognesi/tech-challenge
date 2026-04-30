import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "./calendar"
import { useState } from "react"

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return <Calendar mode="single" selected={date} onSelect={setDate} />
  },
} satisfies Story

export const Multiple = {
  render: () => {
    const [dates, setDates] = useState<Date[] | undefined>()
    return <Calendar mode="multiple" selected={dates} onSelect={setDates} />
  },
} satisfies Story

export const Range = {
  render: () => {
    const [range, setRange] = useState<{ from: Date; to?: Date } | undefined>()
    return <Calendar mode="range" selected={range} onSelect={setRange} />
  },
} satisfies Story
