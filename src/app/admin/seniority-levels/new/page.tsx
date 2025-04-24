import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateLevelForm } from "@/features/categories";

export default function CreateSeniorityLevel() {
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>Create Seniority Level</CardTitle>
        <CardDescription>
          Fill in the form below to create a new seniority level.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CreateLevelForm />
      </CardContent>
    </Card>
  );
}
