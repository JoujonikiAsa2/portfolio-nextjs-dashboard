
import { BlogForm } from "@/components/dashboard/blogs/blog-form";
import { TBlog } from "@/types/blog";

async function getBlogById(id: string): Promise<TBlog | null> {
  try {
    const res = await fetch(
      `https://portfolio-nextjs-backend-rho.vercel.app/api/v1/blog/${id}`,
      {
        cache: "no-store",
      }
    );
    const json = await res.json();

    if (!res.ok || !json.success) return null;

    return json.data;
  } catch {
    return null;
  }
}

export default async function EditProjectPage({ params }: { params: { id: string } }) {
    if (!params) {
    return {
      notFound: true,
    }
  }
  let blog: TBlog | null= null;
  
  try {
    const awaitedParams = await Promise.resolve(params);
    blog = await getBlogById(awaitedParams.id);
  } catch (error) {
    console.error("Error fetching review:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Blog</h1>
        <p className="text-muted-foreground">Update your blog post</p>
      </div>
      <BlogForm blog={blog} />
    </div>
  )
}
