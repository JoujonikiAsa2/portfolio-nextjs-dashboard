"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import type { TBlog } from "@/types/blog";
import { addBlog, updateBlog } from "@/services/blog";
import { toast } from "sonner";

export function BlogForm({ blog }: { blog?: TBlog | null }) {
  const router = useRouter();
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [formData, setFormData] = useState<Partial<TBlog>>({
    authorname: blog?.authorname || "",
    blogtitle: blog?.blogtitle || "",
    publicationdate:
      blog?.publicationdate || new Date().toISOString().split("T")[0],
    category: blog?.category || "technology",
    content: blog?.content || "",
    thumbnail: blog?.thumbnail || "",
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log(files);
      setImageFile(files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object for API submission
    const transformedFormData = new FormData();
    if (imageFile) {
      transformedFormData.append("file", imageFile);
    }
    transformedFormData.append("data", JSON.stringify(formData));

    console.log(transformedFormData);

    if (blog) {
      const res = await updateBlog(blog._id as string, transformedFormData);
      console.log({ res });
      toast.success(res.message);
    } else {
      const res = await addBlog(transformedFormData);
      console.log({ res });
      toast.success(res.message);
    }

    router.push("/dashboard/blogs");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="blogtitle">Blog Title</Label>
              <Input
                id="blogtitle"
                value={formData.blogtitle}
                onChange={(e) =>
                  setFormData({ ...formData, blogtitle: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="authorname">Author Name</Label>
              <Input
                id="authorname"
                value={formData.authorname}
                onChange={(e) =>
                  setFormData({ ...formData, authorname: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="publicationdate">Publication Date</Label>
              <Input
                id="publicationdate"
                type="date"
                value={
                  formData?.publicationdate
                    ? formData?.publicationdate.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, publicationdate: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                  <SelectItem value="PROGRAMMING">Programming</SelectItem>
                  <SelectItem value="DESIGN">Design</SelectItem>
                  <SelectItem value="CAREER">Career</SelectItem>
                  <SelectItem value="TUTORIAL">Tutorial</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={10}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label>Images</Label>
              <div className="grid gap-3">
                <Label htmlFor="icon">Thumbnail</Label>
                <Label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-700 bg-opacity-50 hover:bg-gray-600 transition-all"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-200" />
                    <p className="mb-2 text-sm text-gray-200">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-300">
                      PNG, JPG or GIF (MAX. 2MB)
                    </p>
                  </div>
                  <Input
                    id="image-upload"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/blogs")}
              >
                Cancel
              </Button>
              <Button type="submit">{blog ? "Update Blog" : "Add Blog"}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
