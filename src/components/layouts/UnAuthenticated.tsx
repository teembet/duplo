import { Card } from "@mui/material";
import { ReactNode } from "react";
import AppErrorBoundary from "../reuseables/Misc/ErrorBoundary";

const UnauthenticatedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Card
      className="min-h-screen flex gap-4 flex-col 
			 bg-gray-background 
			bg-blue-dark relative items-center rounded-none"
    >
      <AppErrorBoundary>{children}</AppErrorBoundary>
    </Card>
  );
};

export default UnauthenticatedLayout;
