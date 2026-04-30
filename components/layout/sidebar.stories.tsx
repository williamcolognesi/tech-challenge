import type { Meta, StoryObj } from "@storybook/react"
import { Sidebar } from "./sidebar"

const meta: Meta<typeof Sidebar> = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sidebar navigation component with logo, menu items, and responsive mobile drawer. Uses Next.js routing.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  render: () => (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-60 p-6">
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>
        <p className="text-gray-600 mb-4">
          Sidebar is positioned on the left side. Main content area has left
          margin.
        </p>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 p-4 rounded">
              Content section {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
} satisfies Story

export const Navigation = {
  render: () => (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-60 p-6">
        <h2 className="text-xl font-bold mb-4">Navigation Items</h2>
        <div className="bg-blue-50 border border-blue-200 rounded p-4 space-y-2">
          <p className="text-sm">
            📊 <strong>Dashboard</strong> - View financial overview
          </p>
          <p className="text-sm">
            💱 <strong>Transações</strong> - Manage income and expenses
          </p>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Click on navigation items to navigate. Logo also acts as home link.
        </p>
      </div>
    </div>
  ),
} satisfies Story

export const WithHeader = {
  render: () => (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-60 right-0 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-end z-40">
        <button className="p-2 hover:bg-gray-100 rounded">🔔</button>
      </div>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 ml-60 mt-16 p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-600">
            This shows how Sidebar and Header work together in the layout.
          </p>
        </div>
      </div>
    </div>
  ),
} satisfies Story

export const Mobile = {
  render: () => (
    <div className="w-96">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="font-bold">No Bolso</h1>
        <button className="p-2 hover:bg-gray-100 rounded">☰ Menu</button>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600">
          On mobile, the sidebar appears as a drawer triggered by the menu
          button.
        </p>
      </div>
    </div>
  ),
} satisfies Story
