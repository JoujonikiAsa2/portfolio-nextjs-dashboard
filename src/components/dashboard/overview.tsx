"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { getMessages } from "@/services/message";
import { getProfile } from "@/services/profile";
import { getProjects } from "@/services/project";
import { getAllSkills } from "@/services/skills";

export function DashboardOverview() {
  const { response: ProjectData } = useFetch(getProjects);
  const projects = ProjectData?.data;
  const { response: skillData } = useFetch(getAllSkills);
  const skills = skillData?.data;
  const { response: blogData } = useFetch(getProjects);
  const blogs = blogData?.data;
  const { response: messageData } = useFetch(getMessages);
  const messages = messageData?.data;
  const { response: profileData } = useFetch(getProfile);
  const profiles = profileData?.data;


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{skills?.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projects?.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{blogs?.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{messages?.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resume Downloaded</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{profiles?.clickedCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}
