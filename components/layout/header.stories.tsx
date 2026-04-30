import type { Meta, StoryObj } from "@storybook/react"
import { Header } from "./header"

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Header component with notification bell. Fixed positioning at top with left offset for sidebar.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  render: () => (
    <div>
      <Header />
      <div className="mt-20 p-6">
        <p className="text-gray-600">
          Header is fixed at the top. Adjust your browser width to see
          responsive behavior.
        </p>
      </div>
    </div>
  ),
} satisfies Story

export const WithContent = {
  render: () => (
    <div>
      <Header />
      <div className="fixed top-16 left-60 right-0 bottom-0 overflow-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
        <p className="text-gray-600 mb-4">
          This shows how the header sits above the main content area.
        </p>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-100 p-4 rounded">
              Content block {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
} satisfies Story

export const Notification = {
  render: () => (
    <div>
      <Header />
      <div className="mt-20 p-6 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-700">
          ℹ️ The red dot on the notification bell indicates an unread
          notification.
        </p>
      </div>
    </div>
  ),
} satisfies Story
