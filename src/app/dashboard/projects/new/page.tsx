import { ProjectForm } from "@/components/dashboard/projects/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Project</h1>
        <p className="text-muted-foreground">Create a new project for your portfolio</p>
      </div>
      <ProjectForm />
    </div>
  )
}
