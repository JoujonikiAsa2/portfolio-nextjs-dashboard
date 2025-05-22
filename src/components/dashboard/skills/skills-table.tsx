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
import { Edit, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteSkill, getAllSkills } from "@/services/skills";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TSkill } from "@/types/skill";
import { toast } from "sonner";

export function SkillsTable() {
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const { response: skillData,refetch } = useFetch(getAllSkills);
  const skills = skillData?.data;

  const handleDelete = async () => {
    if (deleteId) {
      const res = await deleteSkill(deleteId);
      setDeleteId(null);
      console.log(res);
      toast.success(res.message);
      refetch()
    } else {
      return;
    }
  };

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No skills found. Add your first skill.
                </TableCell>
              </TableRow>
            ) : (
              skills?.map((skill: TSkill) => (
                <TableRow key={skill._id}>
                  <TableCell className="font-medium">{skill?.name}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={skill?.thumbnail} alt="@skill" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{skill.skillType}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/skills/${skill._id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(skill._id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>{" "}
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
              skill.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
