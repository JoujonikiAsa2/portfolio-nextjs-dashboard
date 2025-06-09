"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";
import { TMessage } from "@/types/message";
import { getMessageById, getMessages } from "@/services/message";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader, X } from "lucide-react";

export function MessagesTable() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mainMessage, setMainMessage] = useState<any>();
  const [dialogId, setDialogId] = useState<string>("")
  const [dialogLoading, setDialogLoading] = useState<boolean>()
  const { response: allMessage, loading } = useFetch(getMessages);
  const messages = allMessage?.data;
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const handleDialogueOpen = async (id:string) => {
    setDialogLoading(true)
    setDialogId(id)
    setIsOpen(true);
    const res = await getMessageById(id)
    setMainMessage(res?.data)
    setDialogLoading(false)
  };

  const handleDialogueClose = () => {
    setIsOpen(false);
    setMainMessage(null)
  };

  return (
    <div className="relative rounded-md border h-full max-h-[70vh]">
      <div className="h-full relative overflow-auto lg:overflow-x-hidden ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No messages found.
                </TableCell>
              </TableRow>
            ) : (
              messages?.map((message: TMessage) => (
                <TableRow key={message._id}>
                  <TableCell className="text-blue-400">
                    {message?.email !== "" ? (
                      <Link href="mailto:joujonikiasaroy.official@gmail.com">
                        {message.email}
                      </Link>
                    ) : (
                      <span className="text-red-500">Null</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {message?.name !== "" ? (
                      message.name
                    ) : (
                      <span className="text-red-500">Null</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {message.phone !== "" ? (
                      message.phone
                    ) : (
                      <span className="text-red-500">Null</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={()=>handleDialogueOpen(message?._id)} ref={btnRef} id={message?._id}>
                        {dialogLoading && dialogId === message?._id ?  <Loader className="animation-spin"/>:<span>Open</span>}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {isOpen && !dialogLoading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 w-full h-full z-[9999]">
          <Card className="w-96 h-fit bg-white">
            <CardHeader className="flex justify-end">
              <Button
                size="sm"
                className="w-10"
                onClick={handleDialogueClose}
              >
                <X />
              </Button>
            </CardHeader>
            <CardContent>
              <p>
                <span className="text-sm font-bold">Subject:</span> <span className="text-sm font-normal">{mainMessage?.subject}</span>
              </p>
              <p>
                <span className="text-sm font-bold">Message:</span> <span className="text-sm font-normal">{mainMessage?.message}</span>
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
