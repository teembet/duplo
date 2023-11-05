import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AuthenticatedLayout,
  UnAuthenticatedLayout,
} from "@/components/layouts";
import { useRouteType } from "@/hooks";

import APP_PATHS from "@/paths.constants";
import useAuthentication from "@/store/authentication";
import { Button } from "@mui/material";

const { SIGN_IN, DASHBOARD } = APP_PATHS;

// Boundary component
const PageNotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [store] = useAuthentication();
  const { isAuthenticated } = store;

  const { isAuthenticatedRoute } = useRouteType();

  // Want to redirect users to sign in if accessing an authenticated route
  useEffect(() => {
    if (isAuthenticatedRoute && !isAuthenticated) {
      navigate(SIGN_IN, { state: { from: pathname } });
    }
  }, []);

  const homeUrl = useMemo(() => {
    if (isAuthenticated && isAuthenticatedRoute) {
      return DASHBOARD;
    }
    return SIGN_IN;
  }, [isAuthenticated, isAuthenticatedRoute]);

  const content = (
    <div className="mx-auto space-y-4 my-auto flex flex-col items-center justify-center min-h-[450px] max-w-md">
      <h1 className="text-center h2 !font-heroNew">Page Not Found</h1>
      <p className="text-center">
        The page you are trying to access either does not exist or you do not
        have the required privileges to access it.
      </p>
      <Button onClick={() => navigate(homeUrl)}>Go Home</Button>
    </div>
  );

  if (isAuthenticated && isAuthenticatedRoute) {
    return <AuthenticatedLayout>{content}</AuthenticatedLayout>;
  }

  return <UnAuthenticatedLayout>{content}</UnAuthenticatedLayout>;
};

export default PageNotFound;
