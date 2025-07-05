'use client'

import { db } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SubmitPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await addDoc(collection(db, 'tools'), {
      name,
      description,
      website,
      tags: tags.split(',').map(t => t.trim().toLowerCase()),
      upvotes: 0,
      createdAt: serverTimestamp(),
    })

    setLoading(false)
    router.push('/')
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit a Dev Tool</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          className="border px-3 py-2 rounded"
          placeholder="Tool Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          required
          className="border px-3 py-2 rounded"
          placeholder="Website URL"
          value={website}
          onChange={e => setWebsite(e.target.value)}
        />
        <textarea
          required
          className="border px-3 py-2 rounded"
          placeholder="Short Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </main>
  )
}
