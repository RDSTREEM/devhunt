import ToolCard from "./ToolCard"

type Tool = {
  id: string
  name: string
  description: string
  website: string
  tags: string[]
  upvotes: number
}

export default function ToolList({ tools }: { tools: Tool[] }) {
  if (!tools.length) {
    return <div className="text-center text-gray-500 mt-8">No tools found.</div>
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tools.map(tool => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}
