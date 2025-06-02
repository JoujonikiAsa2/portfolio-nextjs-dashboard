"use client";
import { TProject } from "@/types/projects";
import dynamic from "next/dynamic";

const ProjectForm = dynamic(
  () => import("@/components/dashboard/projects/project-form"),
  {
    ssr: false, // disables server-side rendering
  }
);

async function getProjectById(id: string): Promise<TProject | null> {
  try {
    const res = await fetch(
      `https://portfolio-nextjs-backend-rho.vercel.app/api/v1/project/${id}`,
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

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params) {
    return {
      notFound: true,
    };
  }
  let project: TProject | null = null;

  try {
    const awaitedParams = await Promise.resolve(params);
    project = await getProjectById(awaitedParams.id);
  } catch (error) {
    console.error("Error fetching review:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">Update your project information</p>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
