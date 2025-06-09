import { MessagesTable } from "@/components/dashboard/messages/messages-table"

export default function SkillsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Your messages</p>
        </div>
      </div>
      <MessagesTable />
    </div>
  )
}
