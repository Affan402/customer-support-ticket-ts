"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Ticket } from "@/lib/ticket-context"
import { TicketForm } from "@/components/ticket-form"

interface EditTicketDialogProps {
  ticket: Ticket
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTicketDialog({ ticket, open, onOpenChange }: EditTicketDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Ticket</DialogTitle>
          <DialogDescription>Update the ticket details below.</DialogDescription>
        </DialogHeader>
        <TicketForm initialData={ticket} isEditing={true} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
