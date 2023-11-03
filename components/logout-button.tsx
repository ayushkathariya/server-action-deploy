"use client";

import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button color="primary" onClick={() => signOut()}>
      Logout
    </Button>
  );
}
