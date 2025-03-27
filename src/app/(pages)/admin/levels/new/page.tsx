import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateLevelForm } from "@/features/categories";

export default function CreateLevel() {
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>Create Level</CardTitle>
        <CardDescription>
          Fill in the form below to create a new level.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CreateLevelForm />
      </CardContent>
    </Card>
  );
}
