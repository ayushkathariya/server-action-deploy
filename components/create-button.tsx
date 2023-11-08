"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { Spinner } from "@nextui-org/react";

export default function CreateButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="success">
      {pending ? (
        <>
          <p>Sumbit</p>
          <Spinner color="primary" size="sm" labelColor="primary" />
        </>
      ) : (
        "Submit"
      )}
    </Button>
  );
}
