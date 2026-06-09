import { HelpCircle, School, Trophy, BookOpen, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export function HowItWorksModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 bg-highlighter/30 border-2 border-ink px-3 py-1.5 rounded-md shadow-zine-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-highlighter/50 transition-all cursor-pointer font-bold text-xs uppercase tracking-wider"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>How to use</span>
        </button>
      </DialogTrigger>
      <DialogContent className="border-2 border-ink bg-paper text-ink shadow-zine max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b-2 border-dashed border-ink pb-4">
          <DialogTitle className="font-bold text-2xl md:text-3xl flex items-center gap-2 rotate-[-1deg]">
            How to use BunkyBloom <Sparkles className="w-6 h-6 text-marker-pink fill-marker-pink/20 animate-pulse" />
          </DialogTitle>
          <DialogDescription className="font-hand text-lg text-ink/80 text-left">
            Your pocket guide to campus legends and anonymous chronicles.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-4 text-left">
          {/* Section 1: Schools */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg flex items-center gap-2 text-marker-blue">
              <School className="w-5 h-5 shrink-0" />
              1. How to Change School
            </h3>
            <p className="text-sm opacity-90 leading-relaxed pl-7">
              Click on the school name badge in the top navbar (or head over to the{" "}
              <span className="font-bold underline">Schools</span> page). From there, you can
              search for your school, join it, and set it as your <strong>Active School</strong> to see its local content. Can't find yours? Start a new one!
            </p>
          </div>

          {/* Section 2: Nominators */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg flex items-center gap-2 text-marker-pink">
              <Trophy className="w-5 h-5 shrink-0" />
              2. What is a Nominator?
            </h3>
            <p className="text-sm opacity-90 leading-relaxed pl-7">
              A **Nominator** is anyone who posts to the <strong>Legend Board</strong>. If there's a student, teacher, or staff member who did something unforgettable (like the kid who sold snacks out of his locker, or the teacher who never gives homework), you can nominate them! Others can then upvote them to crown them the top legend.
            </p>
          </div>

          {/* Section 3: Stories */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg flex items-center gap-2 text-amber-600">
              <BookOpen className="w-5 h-5 shrink-0" />
              3. What is a Story?
            </h3>
            <p className="text-sm opacity-90 leading-relaxed pl-7 mb-3">
              Stories are completely anonymous memories, funny incidents, or confessions from your school. Just select a category (like Confessions, Pranks, or Rumors) and post!
            </p>

            {/* Example Card */}
            <div className="ml-7 bg-highlighter/10 border-2 border-ink border-dashed p-4 rounded-xl relative rotate-[0.5deg]">
              <span className="absolute -top-2.5 right-4 bg-highlighter text-ink text-[10px] font-bold px-2 py-0.5 rounded border border-ink font-mono uppercase">
                Example Story
              </span>
              <h4 className="font-bold text-sm mb-1 text-ink">The 5th Period Phantom 👻</h4>
              <p className="font-hand text-base leading-snug text-ink/90">
                "Someone kept playing the 'Harry Potter theme song' on a recorder from the vents in the math wing. Nobody ever found out who did it, but it went on for 3 months and drove Mr. Henderson crazy!"
              </p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-ink pt-4 flex justify-end">
          <DialogClose asChild>
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-2.5 bg-foreground text-background font-bold text-sm rounded shadow-zine-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer text-center"
            >
              <span className="font-hand text-lg">Got it, let's bloom! 🌸</span>
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
