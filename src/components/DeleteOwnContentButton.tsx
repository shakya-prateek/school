import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

type ContentKind = "story" | "legend";

const COPY: Record<ContentKind, { title: string; description: string }> = {
  story: {
    title: "Delete your story?",
    description: "This post will be deleted by you. This cannot be undone.",
  },
  legend: {
    title: "Delete your nomination?",
    description: "This legend will be deleted by you. This cannot be undone.",
  },
};

export function DeleteOwnContentButton({
  kind,
  onConfirm,
  isPending,
  className,
}: {
  kind: ContentKind;
  onConfirm: () => void;
  isPending?: boolean;
  className?: string;
}) {
  const copy = COPY[kind];

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          disabled={isPending}
          aria-label="Delete"
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-card text-ink shadow-zine-sm transition-colors hover:bg-marker-pink/15 hover:text-marker-pink disabled:opacity-50",
            className,
          )}
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-2 border-ink bg-paper text-ink shadow-zine max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold text-xl">{copy.title}</AlertDialogTitle>
          <AlertDialogDescription className="font-hand text-base text-ink/80">
            {copy.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel className="border-2 border-ink font-bold">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="bg-marker-pink text-white font-bold border-2 border-ink hover:bg-marker-pink/90"
            onClick={onConfirm}
          >
            {isPending ? "Deleting..." : "OK, delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
