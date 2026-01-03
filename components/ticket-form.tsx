"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTickets, type Ticket } from "@/lib/ticket-context"

interface TicketFormProps {
  onSuccess?: () => void
  initialData?: Ticket
  isEditing?: boolean
}

export function TicketForm({ onSuccess, initialData, isEditing }: TicketFormProps) {
  const { createTicket, updateTicket } = useTickets()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    subject: initialData?.subject || "",
    description: initialData?.description || "",
    category: (initialData?.category || "General") as "Technical" | "Billing" | "General",
    priority: (initialData?.priority || "Medium") as "Low" | "Medium" | "High",
  })
  const [errors, setErrors] = useState<{ subject?: string; category?: string; priority?: string }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.priority) newErrors.priority = "Priority is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError("")
    try {
      if (isEditing && initialData) {
        await updateTicket(initialData.id, formData)
      } else {
        await createTicket(formData)
      }
      onSuccess?.()
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <Input
          id="subject"
          placeholder="Brief description of the issue"
          value={formData.subject}
          onChange={(e) => {
            setFormData({ ...formData, subject: e.target.value })
            setErrors({ ...errors, subject: undefined })
          }}
          aria-invalid={!!errors.subject}
        />
        {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description (Optional)
        </label>
        <Textarea
          id="description"
          placeholder="Provide more details about the issue"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            value={formData.category}
            onValueChange={(value) => {
              setFormData({ ...formData, category: value as typeof formData.category })
              setErrors({ ...errors, category: undefined })
            }}
          >
            <SelectTrigger aria-invalid={!!errors.category}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technical">Technical</SelectItem>
              <SelectItem value="Billing">Billing</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Priority</label>
          <Select
            value={formData.priority}
            onValueChange={(value) => {
              setFormData({ ...formData, priority: value as typeof formData.priority })
              setErrors({ ...errors, priority: undefined })
            }}
          >
            <SelectTrigger aria-invalid={!!errors.priority}>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
          {errors.priority && <p className="text-xs text-destructive">{errors.priority}</p>}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : isEditing ? "Update Ticket" : "Create Ticket"}
      </Button>
    </form>
  )
}
