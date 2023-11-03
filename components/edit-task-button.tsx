"use client";

import { Button } from "@nextui-org/react";

type EditTaskButtonProps = {
  id: number;
};

export default function EditTaskButton({ id }: EditTaskButtonProps) {
  return <Button color="warning">Edit</Button>;
}
