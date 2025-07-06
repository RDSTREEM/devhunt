type Tool = {
  id: string
  name: string
  description: string
  website: string
  tags: string[]
  upvotes: number
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold">{tool.name}</h2>
        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
          {tool.upvotes} ▲
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
      <a href={tool.website} target="_blank" className="text-blue-600 text-sm mt-2 inline-block">
        Visit Website →
      </a>
      <div className="flex flex-wrap gap-1 mt-2">
        {tool.tags?.map(tag => (
          <span key={tag} className="bg-gray-200 text-xs px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}
