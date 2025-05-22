import { SkillForm } from "@/components/dashboard/skills/skill-form";

export default function NewSkillPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Skill</h1>
        <p className="text-muted-foreground">Create a new skill to showcase your expertise</p>
      </div>
      <SkillForm />
    </div>
  )
}
