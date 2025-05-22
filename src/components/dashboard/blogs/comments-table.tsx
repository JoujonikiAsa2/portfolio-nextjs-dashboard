"use client"

import { useState } from "react"
import { useBlogs } from "@/hooks/use-blogs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, MessageSquare, Trash } from "lucide-react"

interface CommentsTableProps {
  blogId: string
}

export function CommentsTable({ blogId }: CommentsTableProps) {
  const { getBlogComments, deleteComment, getBlogReplies, deleteReply } = useBlogs()
  const comments = getBlogComments(blogId)
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null)
  const [deleteReplyId, setDeleteReplyId] = useState<string | null>(null)

  const handleDeleteComment = () => {
    if (deleteCommentId) {
      deleteComment(deleteCommentId)
      setDeleteCommentId(null)
    }
  }

  const handleDeleteReply = () => {
    if (deleteReplyId) {
      deleteReply(deleteReplyId)
      setDeleteReplyId(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Replies</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No comments found for this blog post.
                </TableCell>
              </TableRow>
            ) : (
              comments.map((comment) => {
                const replies = getBlogReplies(blogId, comment.id)
                return (
                  <Collapsible key={comment.id} asChild>
                    <>
                      <TableRow>
                        <TableCell className="font-medium">{comment.name}</TableCell>
                        <TableCell>{comment.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{comment.content}</TableCell>
                        <TableCell>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{replies.length}</span>
                              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </Button>
                          </CollapsibleTrigger>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => setDeleteCommentId(comment.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                      <CollapsibleContent asChild>
                        {replies.length > 0 && (
                          <TableRow className="bg-muted/50">
                            <TableCell colSpan={5} className="p-0">
                              <div className="p-4">
                                <h4 className="mb-2 font-medium">Replies</h4>
                                <div className="rounded-md border">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Content</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {replies.map((reply) => (
                                        <TableRow key={reply.id}>
                                          <TableCell className="font-medium">{reply.name}</TableCell>
                                          <TableCell>{reply.email}</TableCell>
                                          <TableCell className="max-w-xs truncate">{reply.content}</TableCell>
                                          <TableCell className="text-right">
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={() => setDeleteReplyId(reply.id)}
                                            >
                                              <Trash className="h-4 w-4" />
                                              <span className="sr-only">Delete</span>
                                            </Button>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteCommentId} onOpenChange={(open) => !open && setDeleteCommentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the comment and all associated replies.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteComment}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteReplyId} onOpenChange={(open) => !open && setDeleteReplyId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this reply.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReply}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
