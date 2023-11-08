"use client";

import { Input } from "@nextui-org/react";
import { createTask } from "@/actions/tasks.action";
import { useRef } from "react";
import CreateButton from "./create-button";

export default function CreateTask() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData: FormData) => {
        await createTask(formData);
        formRef.current?.reset();
      }}
      className="flex gap-3 justify-between"
    >
      <Input type="text" placeholder="Enter task" name="task" required />
      <CreateButton />
    </form>
  );
}
