import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateCompanyForm } from "@/features/categories";

export default function CreateCompany() {
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>Create Company</CardTitle>
        <CardDescription>
          Fill in the form below to create a new company.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CreateCompanyForm />
      </CardContent>
    </Card>
  );
}
