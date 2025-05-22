import { BlogsTable } from "@/components/dashboard/blogs/blogs-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function BlogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground">Manage your blog posts and content</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blogs/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Blog
          </Link>
        </Button>
      </div>
      <BlogsTable />
    </div>
  )
}
