import { useState, useEffect } from "react"
import { useAuth } from '@/component/AuthContext'
import { db } from '@/lib/firebase'
import { doc, updateDoc, increment, getDoc, arrayUnion } from 'firebase/firestore'

type Tool = {
  id: string
  name: string
  description: string
  website: string
  tags: string[]
  upvotes: number
  upvoters?: string[]
}

  const [upvotes, setUpvotes] = useState(tool.upvotes)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const { user, signIn } = useAuth()

  useEffect(() => {
    if (!user) {
      setHasUpvoted(false)
      return
    }
    // Check if user has already upvoted
    const checkUpvoted = async () => {
      const toolRef = doc(db, 'tools', tool.id)
      const docSnap = await getDoc(toolRef)
      const data = docSnap.data()
      if (data && Array.isArray(data.upvoters) && data.upvoters.includes(user.uid)) {
        setHasUpvoted(true)
      } else {
        setHasUpvoted(false)
      }
    }
    checkUpvoted()
  }, [user, tool.id])

  const handleUpvote = async () => {
    if (!user) {
      alert('You must be signed in to upvote.')
      return
    }
    if (hasUpvoted) {
      alert('You have already upvoted this tool.')
      return
    }
    setUpvotes(upvotes + 1)
    setHasUpvoted(true)
    try {
      const toolRef = doc(db, 'tools', tool.id)
      await updateDoc(toolRef, {
        upvotes: increment(1),
        upvoters: arrayUnion(user.uid)
      })
    } catch (err) {
      setUpvotes(upvotes)
      setHasUpvoted(false)
      alert('Failed to upvote. Please try again.')
    }
  }

  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold">{tool.name}</h2>
        <button
          onClick={handleUpvote}
          className={`text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition flex items-center gap-1 ${hasUpvoted ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Upvote"
          disabled={hasUpvoted}
        >
          {upvotes} <span aria-hidden>▲</span>
        </button>
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
