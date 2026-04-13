import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ResponsiveDialog } from "@/components/responsive-dialog"

const steps = [
  { title: "Account Info", fields: ["email", "username"] },
  { title: "Personal Details", fields: ["firstName", "lastName"] },
  { title: "Review", fields: [] }
]

const formSchema = z.object({
  email: z.email(),
  username: z.string().min(2),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})


interface MeetingFormProps {
  onSucess?: (id?: string) => void
}

export function MultiStepDialog({ onSucess }: MeetingFormProps) {

  const [currentStep, setCurrentStep] = React.useState(0)
  const isLastStep = currentStep === steps.length - 1

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", username: "", firstName: "", lastName: "" },
  })

  const handleNext = async () => {
    const fields = steps[currentStep].fields as Array<keyof z.infer<typeof formSchema>>
    const output = await form.trigger(fields, { shouldFocus: true })
    if (output) setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => setCurrentStep((prev) => prev - 1)

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values)
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {currentStep === 0 && (
          <div className="space-y-4 py-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem><FormLabel>Username</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4 py-4">
            <FormField control={form.control} name="firstName" render={({ field }) => (
              <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="lastName" render={({ field }) => (
              <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="py-4">
            <p className="text-sm">Please review your details before submitting.</p>
            <pre className="mt-2 rounded bg-muted p-2 text-[10px]">
              {JSON.stringify(form.getValues(), null, 2)}
            </pre>
          </div>
        )}

        {currentStep > 0 && (
          <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
        )}
        {isLastStep ? (
          <Button type="submit">Submit</Button>
        ) : (
          <Button type="button" onClick={handleNext}>Next</Button>
        )}

      </form>
    </Form>
  )
}

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void
}
export const CreateUserDialog = ({ open, onOpenChange }: CreateUserDialogProps) => {

  return (
    <ResponsiveDialog title="New Meeting" description="Create a new meeting" open={open} onOpenChange={onOpenChange}>
      <MultiStepDialog
        onSucess={(id) => {
          onOpenChange(false)
        }}
      />
    </ResponsiveDialog>
  )
}
