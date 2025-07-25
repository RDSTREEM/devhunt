import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function ToolSubmitForm({ onSubmit }: { onSubmit?: (tool: any) => void }) {
  const { user, signIn } = useAuth()
  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    tags: "",
  })
  const [submitting, setSubmitting] = useState(false)

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-4 border rounded bg-white shadow text-center">
        <p className="mb-4">You must be signed in to submit a tool.</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={signIn}
        >
          Sign In with Google
        </button>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // TODO: Integrate with backend
    if (onSubmit) onSubmit({ ...form, tags: form.tags.split(",").map(t => t.trim()), upvotes: 0 })
    setSubmitting(false)
    setForm({ name: "", description: "", website: "", tags: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Submit a New Tool</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tool Name"
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        name="website"
        value={form.website}
        onChange={handleChange}
        placeholder="Website URL"
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}
