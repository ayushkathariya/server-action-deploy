"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function CreateButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      color={`${pending ? "default" : "primary"}`}
      disabled={pending}
    >
      Submit
    </Button>
  );
}
