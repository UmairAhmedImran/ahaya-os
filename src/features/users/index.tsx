import { useState } from "react";
import { CreateUserDialog } from "./components/user-form";
import { Button } from "@/components/ui/button";

export function UserPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <CreateUserDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>Create a User</Button>
    </div>

  )
}
