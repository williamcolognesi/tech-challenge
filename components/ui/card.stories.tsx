import type { Meta, StoryObj } from "@storybook/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./card"
import { Button } from "./button"

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Conteúdo do card aqui</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
}

export const Simple: Story = {
  args: {
    children: (
      <CardContent className="pt-6">
        <p>Simple card with just content</p>
      </CardContent>
    ),
  },
}

export const WithImage: Story = {
  args: {
    children: (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400"
          alt="Card image"
          className="w-full"
        />
        <CardHeader>
          <CardTitle>Beautiful Image</CardTitle>
          <CardDescription>Image integrated with card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card includes an image at the top</p>
        </CardContent>
      </>
    ),
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Smaller spacing</p>
        </CardContent>
      </>
    ),
  },
}

export const Interactive = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Feature Card</CardTitle>
        <CardDescription>Explore this awesome feature</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This card demonstrates how to use all the sub-components together to
          create a rich, interactive card layout.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Story

export const MultipleCards = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Card {i}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content for card {i}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
} satisfies Story
