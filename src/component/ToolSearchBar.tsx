import { useState } from "react"

export default function ToolSearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search tools by name or tag..."
        className="w-full max-w-md p-2 border rounded shadow-sm"
      />
    </div>
  )
}
