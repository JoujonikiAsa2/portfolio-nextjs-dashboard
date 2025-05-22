"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { TSkill } from "@/types/skill";
import { addSkill, updateSkill } from "@/services/skills";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export const SkillForm = ({ skill }: { skill?: TSkill | null }) => {
  const [imagePreview, setImagePreview] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const router = useRouter();
  const [formData, setFormData] = React.useState<Partial<TSkill>>({
    name: skill?.name || "",
    thumbnail: skill?.thumbnail || "",
    skillType: skill?.skillType || "TECHNICAL",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log(files)
      setImageFile(files[0]);
    }
  };

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

    console.log(transformedFormData)

    if (skill) {
      const res= await updateSkill(skill._id, transformedFormData);
      console.log({res})
      toast.success(res.message)
    } else {
      const res = await addSkill(transformedFormData);
      console.log({res})
      toast.success(res.message)
    }

    router.push("/dashboard/skills");
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
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="icon">Icon</Label>
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
              <Label htmlFor="skillType">Skill Type</Label>
              <Select
                value={formData.skillType}
                onValueChange={(value) =>
                  setFormData({ ...formData, skillType: value })
                }
                required
              >
                <SelectTrigger id="skillType">
                  <SelectValue placeholder="Select skill type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TECHNICAL">Technical Skill</SelectItem>
                  <SelectItem value="SOFT">Soft Skill</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/skills")}
              >
                Cancel
              </Button>
              <Button type="submit">
                {skill ? "Update Skill" : "Add Skill"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
