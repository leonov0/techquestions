import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateTechnologyForm } from "@/features/categories";

export default function CreateTechnology() {
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>Create Technology</CardTitle>
        <CardDescription>
          Fill in the form below to create a new technology.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CreateTechnologyForm />
      </CardContent>
    </Card>
  );
}
