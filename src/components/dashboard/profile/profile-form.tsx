"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TProfile } from "@/types/profile";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { addProfile, getProfile, updateProfile } from "@/services/profile";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";

export const ProfileForm = () => {
  const { response: profileData } = useFetch(getProfile);
  const profile = profileData?.data;
  const [type, setType] = React.useState("add");
  const [imagePreview, setImagePreview] = React.useState(profile?.thumbnail);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [formData, setFormData] = React.useState<Partial<TProfile>>({
    thumbnail: profile?.thumbnail,
    resume: profile?.resume,
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
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

    if (type === "update") {
      const res = await updateProfile(profile._id, transformedFormData);
      toast.success(res.message);
    } else {
      const res = await addProfile(transformedFormData);
      toast.success(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="resume">Resume</Label>
              <Input
                id="resume"
                type="text"
                value={profile?.resume || formData.resume}
                onChange={(e) =>
                  setFormData({ ...formData, resume: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="Thumbnail">Profile Thumbnail</Label>
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
                <Image
                  src={imagePreview || profile?.thumbnail}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="mt-2 rounded-md object-cover border"
                />
            </div>

            <div className="flex gap-3">
              <Button type="submit" onClick={() => setType("update")}>
                Update profile
              </Button>
              <Button type="submit" onClick={() => setType("add")}>
                Add New profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
