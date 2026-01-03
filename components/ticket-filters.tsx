"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import type { Ticket } from "@/lib/ticket-context"

interface TicketFiltersProps {
  onSearch: (query: string) => void
  onPriorityFilter: (priority: Ticket["priority"] | "All") => void
  onStatusFilter: (status: Ticket["status"] | "All") => void
  selectedPriority: Ticket["priority"] | "All"
  selectedStatus: Ticket["status"] | "All"
  searchQuery: string
}

export function TicketFilters({
  onSearch,
  onPriorityFilter,
  onStatusFilter,
  selectedPriority,
  selectedStatus,
  searchQuery,
}: TicketFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasActiveFilters = searchQuery || selectedPriority !== "All" || selectedStatus !== "All"

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tickets by subject or description..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className={hasActiveFilters ? "bg-blue-50" : ""}
        >
          Filters{" "}
          {hasActiveFilters &&
            `(${[searchQuery, selectedPriority !== "All", selectedStatus !== "All"].filter(Boolean).length})`}
        </Button>
      </div>

      {isExpanded && (
        <div className="flex gap-4 rounded-lg border p-4 bg-card">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium">Priority</label>
            <Select value={selectedPriority} onValueChange={(value) => onPriorityFilter(value as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Priorities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium">Status</label>
            <Select value={selectedStatus} onValueChange={(value) => onStatusFilter(value as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onSearch("")
                  onPriorityFilter("All")
                  onStatusFilter("All")
                }}
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
