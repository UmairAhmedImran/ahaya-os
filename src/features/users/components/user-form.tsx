import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResponsiveDialog } from "@/components/responsive-dialog"

// TODO: step tracking on mobile screen. 

const steps = [
  { title: "Info" },
  { title: "Preferences" },
  { title: "Review" },
]

const tagOptions = ["Tech", "Design", "AI", "Business"]
const toggleOptions = ["Beginner", "Intermediate", "Advanced"]

export function MultiStepDialog({ onSucess }: { onSucess?: () => void }) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [submitted, setSubmitted] = React.useState(false)

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    tags: [] as string[],
    range: 50,
    toggle: "",
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 0) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required"
      }

      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Invalid email"
      }

      if (!/^\d{10,15}$/.test(formData.phone)) {
        newErrors.phone = "Phone must be 10–15 digits"
      }
    }

    if (currentStep === 1) {
      if (formData.tags.length === 0) {
        newErrors.tags = "Select at least one tag"
      }

      if (!formData.toggle) {
        newErrors.toggle = "Please select a level"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => setCurrentStep((prev) => prev - 1)

  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Submitted:", formData)
      setSubmitted(true)
      onSucess?.()
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">✅ Success!</h2>
        <p className="text-muted-foreground">
          Your onboarding is complete.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep

          return (
            <div key={step.title} className="flex-1 flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                ${isCompleted
                    ? "bg-primary text-white"
                    : isActive
                      ? "border-2 border-primary text-primary"
                      : "border text-muted-foreground"
                  }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              <span
                className={`ml-2 text-sm hidden sm:block ${isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
                  }`}
              >
                {step.title}
              </span>

              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-border mx-2" />
              )}
            </div>
          )
        })}
      </div>

      {currentStep === 0 && (
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Select Tags</p>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const exists = formData.tags.includes(tag)
                    setFormData({
                      ...formData,
                      tags: exists
                        ? formData.tags.filter((t) => t !== tag)
                        : [...formData.tags, tag],
                    })
                  }}
                  className={`px-3 py-1 border rounded ${formData.tags.includes(tag)
                    ? "bg-primary text-white"
                    : ""
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags}</p>
            )}
          </div>

          <div>
            <p className="text-sm font-medium">Select Range</p>
            <input
              type="range"
              min={0}
              max={100}
              value={formData.range}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  range: Number(e.target.value),
                })
              }
              className="w-full"
            />
            <p className="text-sm">Value: {formData.range}</p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Select Level</p>
            <div className="flex gap-2">
              {toggleOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, toggle: opt })
                  }
                  className={`px-3 py-1 border rounded ${formData.toggle === opt
                    ? "bg-primary text-white"
                    : ""
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.toggle && (
              <p className="text-red-500 text-sm">{errors.toggle}</p>
            )}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-2 text-sm bg-muted p-4 rounded">
          <p><b>Name:</b> {formData.name}</p>
          <p><b>Email:</b> {formData.email}</p>
          <p><b>Phone:</b> {formData.phone}</p>
          <p><b>Tags:</b> {formData.tags.join(", ")}</p>
          <p><b>Range:</b> {formData.range}</p>
          <p><b>Level:</b> {formData.toggle}</p>
        </div>
      )}

      <div className="flex justify-between pt-6">
        {currentStep > 0 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div />
        )}

        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  )
}

export const CreateUserDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <ResponsiveDialog
      title="User Onboarding"
      description="Complete your profile"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MultiStepDialog onSucess={() => onOpenChange(false)} />
    </ResponsiveDialog>
  )
}
