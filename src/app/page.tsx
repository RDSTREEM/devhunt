import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import ToolCard from '@/components/ToolCard'

export default async function HomePage() {
  const q = query(collection(db, 'tools'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  const tools = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as any[] // for now

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🚀 Featured Dev Tools</h1>
      <div className="grid gap-4">
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </main>
  )
}
