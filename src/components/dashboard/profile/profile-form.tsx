"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import type { TProfile } from "@/types/profile"

export function ProfileForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<TProfile>>({
    resume: "",
    thumbnail: "",
  })

 const { response: skillData,refetch } = useFetch(getAllSkills);
  const skills = skillData?.data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (profile) {
      updateProfile(profile.id, formData)
    }

    router.push("/dashboard")
  }

  if (!profile) {
    return <div>Loading profile...</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Enter image URL"
                required
              />
              {formData.image && (
                <div className="mt-2">
                  <div className="h-24 w-24 overflow-hidden rounded-full">
                    <img
                      src={formData.image || "/placeholder.svg?height=96&width=96"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="resume">Resume URL</Label>
              <Input
                id="resume"
                value={formData.resume}
                onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                placeholder="Enter resume URL"
                required
              />
              <p className="text-sm text-muted-foreground">Link to your resume PDF or document</p>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
              <Button type="submit">Update Profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
