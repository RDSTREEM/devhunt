
'use client'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import ToolList from '@/component/ToolList'
import ToolSearchBar from '@/component/ToolSearchBar'

export default function HomePage() {
  const [tools, setTools] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTools = async () => {
      const q = query(collection(db, 'tools'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setTools(data)
      setFiltered(data)
      setLoading(false)
    }
    fetchTools()
  }, [])

  const handleSearch = (query: string) => {
    if (!query) {
      setFiltered(tools)
      return
    }
    const q = query.toLowerCase()
    setFiltered(
      tools.filter(tool =>
        tool.name.toLowerCase().includes(q) ||
        tool.tags?.some((tag: string) => tag.toLowerCase().includes(q))
      )
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🚀 Featured Dev Tools</h1>
      <ToolSearchBar onSearch={handleSearch} />
      {loading ? (
        <div className="text-center text-gray-500 mt-8">Loading...</div>
      ) : (
        <ToolList tools={filtered} />
      )}
    </main>
  )
}
