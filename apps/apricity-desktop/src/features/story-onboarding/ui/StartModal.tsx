import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/shadcn/dialog";
import { Button } from "@/shared/components/shadcn/button";
import { useState } from "react";
import {
  BookOpen,
  Users,
  MapPin,
  CalendarClock,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

type Step = {
  eyebrow: string
  title: string
  description: string
  body: React.ReactNode
}

const FEATURES: Feature[] = [
  {
    icon: BookOpen,
    title: "Library & Structure",
    description: "Organize stories into chapters and scenes, then draft in a focused editor.",
  },
  {
    icon: Users,
    title: "Characters",
    description: "Build casts with relationships, arcs, and connections that stay in sync.",
  },
  {
    icon: MapPin,
    title: "Locations & Events",
    description: "Map out your world and the moments that shape it, all linked together.",
  },
  {
    icon: CalendarClock,
    title: "Timeline",
    description: "See a chronological view of events, derived automatically from your story.",
  },
]

const STEPS: Step[] = [
  {
    eyebrow: "Welcome to Apricity",
    title: "A home for your fiction",
    description:
      "Apricity is a story development tool for writers. Plan characters and worlds, then write your manuscript — all in one place.",
    body: (
      <div className="flex items-center justify-center rounded-lg border border-border bg-muted/40 px-6 py-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="size-7" aria-hidden="true" />
          </span>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
            {
              "From a single spark of an idea to a finished draft, Apricity keeps every part of your story connected."
            }
          </p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "The big idea",
    title: "Everything is connected",
    description:
      "Characters, locations, and events are nodes. Apricity links them into a graph so timelines, arcs, and relationships stay accurate as you write.",
    body: (
      <div className="rounded-lg border border-border bg-muted/40 p-6">
        <div className="flex items-center justify-center gap-3">
          <GraphNode label="Hero" active />
          <Connector />
          <GraphNode label="Rival" />
          <Connector />
          <GraphNode label="Battle" active />
        </div>
        <p className="mt-5 text-pretty text-center text-sm leading-relaxed text-muted-foreground">
          {
            "Link an entity once and it shows up everywhere it matters — no more copy-pasting details across notes."
          }
        </p>
      </div>
    ),
  },
  {
    eyebrow: "What you can do",
    title: "Tools for every part of the craft",
    description: "Each feature works on its own and gets richer as you connect things together.",
    body: (
      <div className="grid gap-3 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
              <feature.icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="text-sm font-medium text-card-foreground">{feature.title}</h3>
            <p className="text-pretty text-xs leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "You're all set",
    title: "Start your first story",
    description:
      "Create a story in your Library to begin. You can share and publish finished work later, right from Apricity.",
    body: (
      <div className="rounded-lg border border-border bg-muted/40 p-6">
        <ul className="flex flex-col gap-3">
          {[
            "Create a story and add its title, cover, and description",
            "Sketch characters, locations, and events as you go",
            "Connect entities to build arcs and timelines automatically",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" aria-hidden="true" />
              </span>
              <span className="text-pretty text-sm leading-relaxed text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    eyebrow: "Hello",
    title: "Beow",
    description: "Anns",
    body: <div>
      {/*Craete New Story*/}
    </div>
  }
]

function GraphNode({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={cn(
        "flex min-w-16 items-center justify-center rounded-full border px-3 py-2 text-xs font-medium",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-card-foreground",
      )}
    >
      {label}
    </span>
  )
}

function Connector() {
  return <span aria-hidden="true" className="h-px w-6 shrink-0 bg-border sm:w-8" />
}

export function StartModal({
  open,
  onOpenChange,
  onComplete,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete?: () => void
}) {
  const [step, setStep] = useState(0)
  const isFirst = step === 0
  const isLast = step === STEPS.length - 1
  const beforeLast = step === STEPS.length - 2
  const current = STEPS[step]

  function handleNext() {
    if (isLast) {
      onComplete?.()
      onOpenChange(false)
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
        className="transition-[height] duration-300 ease-in-out"
      >
        <DialogHeader>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {current.eyebrow}
          </p>
          <DialogTitle className="text-xl text-balance">{current.title}</DialogTitle>
          <DialogDescription className="text-pretty leading-relaxed">
            {current.description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">{current.body}</div>

        <DialogFooter className="sm:items-center sm:justify-between">
          <div className="flex items-center gap-2" role="tablist" aria-label="Onboarding progress">
            {STEPS.map((s, i) => (
              <span
                key={s.title}
                role="tab"
                aria-selected={i === step}
                aria-label={`Step ${i + 1}: ${s.title}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === step ? "w-6 bg-primary" : "w-1.5 bg-border",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <Button type="button" variant="ghost" onClick={handleBack}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back
              </Button>
            )}
            {!isLast && (
              <Button type="button" onClick={handleNext}>
                {beforeLast ? (
                  <>
                    Create New Story
                    <Sparkles className="size-4" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
