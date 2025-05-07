import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function Achievements() {
  return (
    <main className="container max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">Achievements</h1>

      <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
        Achievements are a way to reward users for their contributions to the
        community. They can be earned by completing certain tasks or reaching
        specific milestones.
      </p>

      <Separator className="my-8" />

      <section className="mt-8">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li className="rounded-md border px-4 py-8 shadow">
            <h3 className="text-center font-medium">First Question</h3>
            <p className="text-muted-foreground mt-2 text-center text-sm">
              Submit your first question, which will be approved by the
              moderator.
            </p>
            <Progress value={0} className="mt-4" />
            <p className="text-muted-foreground text-right text-sm">0/1</p>
          </li>
        </ul>
      </section>
    </main>
  );
}
