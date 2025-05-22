"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { getProjects } from "@/services/project";
import { getAllSkills } from "@/services/skills";

export function DashboardOverview() {
  const { response: ProjectData } = useFetch(getProjects);
  const projects = ProjectData?.data;
  const { response: skillData } = useFetch(getAllSkills);
  const skills = skillData?.data;
  const { response: blogData } = useFetch(getProjects);
  const blogs = blogData?.data;

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
    </div>
  );
}
