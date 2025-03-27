import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { getCompanies } from "../../actions/companies/get-companies";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export async function CompanyList() {
  const response = await getCompanies();

  if (!response.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>An error occurred while fetching companies.</AlertTitle>
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  return <DataTable data={response.data} columns={columns} />;
}
