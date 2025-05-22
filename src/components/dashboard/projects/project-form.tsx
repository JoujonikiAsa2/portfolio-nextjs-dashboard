"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { TProject } from "@/types/projects";
import { addProject, updateProject } from "@/services/project";
import { Textarea } from "@/components/ui/textarea";

export const ProjectForm = ({ project }: { project?: TProject | null }) => {
  const [imagePreview, setImagePreview] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const router = useRouter();
   const [techInput, setTechInput] = React.useState("")
  const [formData, setFormData] = React.useState<Partial<TProject>>({
    thumbnail: project?.thumbnail || "",
    description: project?.description || "",
    techStack: project?.techStack || [],
    frontendLivelink: project?.frontendLivelink || "",
    backendLivelink: project?.backendLivelink || "",
    githubFrontend: project?.githubFrontend || "",
    githubBackend: project?.githubBackend || "",
    githubFullStack: project?.githubFullStack || "",
    problemFaced: project?.problemFaced || "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log(files);
      setImageFile(files[0]);
    }
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        techStack:  formData?.techStack &&  [...formData?.techStack, techInput.trim()],
      })
      setTechInput("")
    }
  }

  const removeTech = (index: number) => {
    setFormData({
      ...formData,
      techStack: formData?.techStack && formData?.techStack.filter((_, i) => i !== index),
    })
  }

  React.useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreview(objectUrl);

      // Clean up function to revoke object URL
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object for API submission
    const transformedFormData = new FormData();
    if (imageFile) {
      transformedFormData.append("file", imageFile);
    }
    transformedFormData.append("data", JSON.stringify(formData));

    console.log(transformedFormData);

    if (project) {
      const res = await updateProject(
        project._id as string,
        transformedFormData
      );
      console.log({ res });
      toast.success(res.message);
    } else {
      const res = await addProject(transformedFormData);
      console.log({ res });
      toast.success(res.message);
    }

    router.push("/dashboard/projects");
  };

  console.log(formData);

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mt-6">
        <div
          className="h-[300px]"
          style={{
            backgroundImage: imagePreview
              ? `url('${imagePreview}')`
              : formData?.thumbnail
              ? `url('${formData?.thumbnail}')`
              : "none",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "overlay",
          }}
        ></div>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                required
              />
            </div>

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

            <div className="grid gap-3">
              <Label>Tech Stack</Label>
              <div className="flex gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Enter technology"
                />
                <Button type="button" onClick={addTech}>
                  Add
                </Button>
              </div>
              {formData?.techStack && formData.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData?.techStack?.map((tech, index) => (
                    <div key={index} className="flex items-center gap-1 rounded-full border px-3 py-1">
                      <span className="text-sm">{tech}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full"
                        onClick={() => removeTech(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="frontendLivelink">Frontend Live Link</Label>
              <Input
                id="frontendLivelink"
                value={formData.frontendLivelink}
                onChange={(e) => setFormData({ ...formData, frontendLivelink: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="backendLivelink">Backend Live Link</Label>
              <Input
                id="backendLivelink"
                value={formData.backendLivelink}
                onChange={(e) => setFormData({ ...formData, backendLivelink: e.target.value })}
                placeholder="https://api.example.com"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="githubFrontend">GitHub Frontend</Label>
              <Input
                id="githubFrontend"
                value={formData.githubFrontend}
                onChange={(e) => setFormData({ ...formData, githubFrontend: e.target.value })}
                placeholder="https://github.com/username/frontend-repo"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="githubBackend">GitHub Backend</Label>
              <Input
                id="githubBackend"
                value={formData.githubBackend}
                onChange={(e) => setFormData({ ...formData, githubBackend: e.target.value })}
                placeholder="https://github.com/username/backend-repo"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="githubFullStack">GitHub Full Stack</Label>
              <Input
                id="githubFullStack"
                value={formData.githubFullStack}
                onChange={(e) => setFormData({ ...formData, githubFullStack: e.target.value })}
                placeholder="https://github.com/username/fullstack-repo"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="problemFaced">Problems Faced</Label>
              <Textarea
                id="problemFaced"
                value={formData.problemFaced}
                onChange={(e) => setFormData({ ...formData, problemFaced: e.target.value })}
                rows={4}
                placeholder="Describe challenges and how you solved them"
              />
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/projects")}>
                Cancel
              </Button>
              <Button type="submit">{project ? "Update Project" : "Add Project"}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
