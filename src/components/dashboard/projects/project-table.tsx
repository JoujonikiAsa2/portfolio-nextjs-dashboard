"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, ExternalLink, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { deleteProject, getProjects } from "@/services/project";
import { TProject } from "@/types/projects";
import Image from "next/image";

export function ProjectTable() {
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const { response: projectData, refetch } = useFetch(getProjects);
  const projects = projectData?.data;

  const handleDelete = async () => {
    if (deleteId) {
      const res = await deleteProject(deleteId);
      setDeleteId(null);
      toast.success(res.message);
      refetch();
    } else {
      return;
    }
  };

  return (
    <div className="rounded-md border h-full max-h-[75vh]">
      <div className="h-full overflow-scroll lg:overflow-x-hidden ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Links</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No projects found. Add your first project.
                </TableCell>
              </TableRow>
            ) : (
              projects?.map((project: TProject) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <div className="h-12 w-20 overflow-hidden rounded">
                      <Image
                        src={
                          project.thumbnail ||
                          "/placeholder.svg?height=48&width=80"
                        }
                        width={80}
                        height={80}
                        alt="Project thumbnail"
                        className="h-full w-full"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {project.frontendLivelink && (
                        <a
                          href={project.frontendLivelink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline flex items-center"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Live
                        </a>
                      )}
                      {project.githubFrontend && (
                        <a
                          href={project.githubFrontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline flex items-center"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/projects/${project._id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(project._id as string)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
