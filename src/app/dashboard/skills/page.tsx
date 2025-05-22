import { SkillsTable } from "@/components/dashboard/skills/skills-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function SkillsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground">Manage your skills and expertise</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/skills/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Skill
          </Link>
        </Button>
      </div>
      <SkillsTable />
    </div>
  )
}
