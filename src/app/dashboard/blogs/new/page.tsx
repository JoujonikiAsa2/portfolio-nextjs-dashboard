"use client"
import dynamic from "next/dynamic";

const BlogForm = dynamic(
  () => import("@/components/dashboard/blogs/blog-form"),
  {
    ssr: false, // disables server-side rendering
  }
);

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Blog</h1>
        <p className="text-muted-foreground">Create a new blog post</p>
      </div>
      <BlogForm />
    </div>
  )
}
