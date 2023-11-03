"use client";

import { Button } from "@nextui-org/react";
import { deleteTask } from "@/actions/action";

type DeleteTaskButtonProps = {
  id: number;
};

export default function DeleteTaskButton({ id }: DeleteTaskButtonProps) {
  return (
    <Button
      onClick={async () => {
        await deleteTask(id);
      }}
      color="danger"
    >
      Delete
    </Button>
  );
}
